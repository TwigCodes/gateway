import {
  Component,
  Input,
  HostBinding,
  Optional,
  Self,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  NgControl,
  ControlValueAccessor
} from '@angular/forms';
import { MatFormFieldControl, MatChipList } from '@angular/material';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Option } from '../selection.model';

@Component({
  selector: 'ngx-multi-select-chips',
  templateUrl: './multi-select-chips.component.html',
  styleUrls: ['./multi-select-chips.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MultiSelectChipsComponent }
  ]
})
export class MultiSelectChipsComponent
  implements MatFormFieldControl<Option[]>, ControlValueAccessor {
  @Input() options: Option[] = [];
  selectedOptions: Option[] = [];
  form: FormGroup;
  @ViewChild('chipList') chipList: MatChipList;
  // required properties from ControlValueAccessor
  private propagateChange = (_: any) => {};
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  // required properties from MatFormFieldControl
  @Input()
  get value(): Option[] {
    return this.selectedOptions;
  }

  set value(options: Option[] | null) {
    this.selectedOptions = options || [];
    this.stateChanges.next();
  }
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding()
  id = `ngx-multi-select-chips-${MultiSelectChipsComponent.nextId++}`;
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;
  focused = false;
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
  private _disabled = false;
  private _required = false;
  errorState = false;
  controlType = 'ngx-multi-select-chips';
  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'mat-chip') {
      this.chipList.focus();
    }
  }
  constructor(
    private fb: FormBuilder,
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

  ngOnInit() {
    this.form = this.fb.group({ tagList: [null] });
  }
  ngOnDestroy() {
    this.stateChanges.complete();
  }
  toggleSelection(option: Option) {
    const idx = this.selectedOptions.indexOf(option);
    if (idx === -1) {
      this.selectedOptions = [...this.selectedOptions, option];
    } else {
      this.selectedOptions = this.selectedOptions.filter(o => o !== option);
    }
    this.propagateChange(this.selectedOptions);
  }
  isSelected(option: Option) {
    return this.selectedOptions.indexOf(option) > -1;
  }
}
