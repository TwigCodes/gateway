import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BigInputComponent } from './big-input.component';
import { BigInputActionComponent } from './big-input-action.component';

@NgModule({
  declarations: [BigInputComponent, BigInputActionComponent],
  imports: [CommonModule, MatIconModule, MatCardModule, FontAwesomeModule],
  exports: [BigInputComponent, BigInputActionComponent]
})
export class BigInputModule {}
