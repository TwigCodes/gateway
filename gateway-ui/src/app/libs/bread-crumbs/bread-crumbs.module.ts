import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadCrumbsComponent } from './bread-crumbs.component';

@NgModule({
  imports: [
    MatIconModule,
    FlexLayoutModule,
    RouterModule,
    CommonModule,
    TranslateModule
  ],
  exports: [BreadCrumbsComponent],
  declarations: [BreadCrumbsComponent]
})
export class BreadCrumbsModule {}
