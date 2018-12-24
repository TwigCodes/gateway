import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  ElementRef
} from '@angular/core';
import {
  MatCheckbox,
  MatFormFieldControl,
  MatCheckboxChange
} from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Option } from '../utils/selection.model';

@Component({
  selector: 'ngx-check-box-list',
  templateUrl: './check-box-list.component.html',
  styleUrls: ['./check-box-list.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CheckBoxListComponent }
  ]
})
export class CheckBoxListComponent
  implements
    AfterContentInit,
    OnDestroy,
    MatFormFieldControl<Option[]>,
    ControlValueAccessor {
  // from MatFormFieldControll
  @Input()
  get value(): Option[] {
    return this.selectedOptions;
  }
  set value(tel: Option[] | null) {
    this.selectedOptions = this.selectedOptions || [];
    this.stateChanges.next();
  }
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  get empty() {
    return this.selectedOptions.length === 0;
  }
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
    // Replace the provider from above with this.
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
      fm.monitor(elRef.nativeElement, true).subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    }
  }
  static nextId = 0;
  @ContentChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;
  @Input() options: Option[] = [];
  selectedOptions: Option[] = [];
  subscriptions: Subscription[] = [];
  stateChanges = new Subject<void>();

  @HostBinding() id = `ngx-check-box-list-${CheckBoxListComponent.nextId++}`;
  private _placeholder: string;
  focused = false;
  private _required = false;
  private _disabled = false;
  errorState = false;
  controlType = 'ngx-check-box-list';
  @HostBinding('attr.aria-describedby') describedBy = '';
  // from ControlValueAccessor
  private propagateChange = (_: any) => {};
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.checkboxes.forEach(checkbox => checkbox.setDisabledState(isDisabled));
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent) {
    // TODO: add some logic to handle container clicking event
  }

  ngAfterContentInit() {
    this.checkboxes.forEach((checkbox, index) => {
      const sub = checkbox.change.subscribe((ev: MatCheckboxChange) => {
        this.saveSelectedStateFromChildren(ev, index);
        this.propagateChange(this.selectedOptions);
        console.log(this.selectedOptions);
      });
      this.subscriptions.push(sub);
    });
  }

  private saveSelectedStateFromChildren(ev: MatCheckboxChange, index: number) {
    if (ev.checked) {
      this.selectedOptions = [...this.selectedOptions, this.options[index]];
    } else {
      const idx = this.selectedOptions.indexOf(this.options[index]);
      this.selectedOptions = [
        ...this.selectedOptions.slice(0, idx),
        ...this.selectedOptions.slice(idx + 1)
      ];
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
    this.subscriptions = [];
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
