import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { ConfirmService } from './confirm/confirm.service';
import { TwigLibsModule } from '@app/libs/twig-ng-lib.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule,

    TranslateModule,

    TwigLibsModule,
    FlexLayoutModule
  ],
  providers: [ConfirmService],
  declarations: [FilterMenuComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    TwigLibsModule,
    NgxPermissionsModule
  ]
})
export class SharedModule {}
