import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-form-autocomplete-type',
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of (filter | async)" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
  `
})
export class AutocompleteTypeComponent extends FieldType implements OnInit {
  // Optional: only if you want to rely on `MatInput` implementation
  @ViewChild(MatInput) formFieldControl: MatInput;

  filter: Observable<any[]>;

  ngOnInit() {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(term => this.to.filter(term))
    );
  }
}
