import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxCellHost]'
})
export class CellDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
