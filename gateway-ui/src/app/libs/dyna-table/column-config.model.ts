import { TemplateRef } from '@angular/core';

export class ColumnConfig {
  name: string;
  type: string;
  header?: string;
  cell?: (c: any) => any;
  options?: any;
  sticky?: string;
  sortable?: boolean;
  filterable?: boolean;
  cellTpl?: TemplateRef<any>;
  headerTpl?: TemplateRef<any>;
}
