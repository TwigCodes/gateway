import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { JsonDiffTreeComponent } from './json-diff-tree.component';
import { JsonDiffComponent } from './json-diff.component';

@NgModule({
  declarations: [JsonDiffTreeComponent, JsonDiffComponent],
  imports: [CommonModule, NgxJsonViewerModule],
  exports: [JsonDiffTreeComponent, JsonDiffComponent]
})
export class JsonDiffModule {}
