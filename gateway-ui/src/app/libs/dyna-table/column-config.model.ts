import { TemplateRef } from '@angular/core';

export class ColumnConfig {
  name: string;
  displayName?: string;
  cell: (c: any) => any;
  type: string;
  options?: any;
  sticky?: string;
  sortable?: boolean;
  filterable?: boolean;
  templateRef?: TemplateRef<any>;
}
