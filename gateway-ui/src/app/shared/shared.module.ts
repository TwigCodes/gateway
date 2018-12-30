import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
);
import { FormlyMaterialModule } from '@ngx-formly/material';

import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { FormlyModule } from '@ngx-formly/core';
import { ConfirmService } from './confirm/confirm.service';
import { TwigLibsModule } from '@app/libs/twig-ng-lib.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule,

    TranslateModule,

    TwigLibsModule,
    FlexLayoutModule,

    FontAwesomeModule,

    FormlyModule.forRoot()
  ],
  providers: [ConfirmService],
  declarations: [FilterMenuComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FormlyModule,
    FormlyMaterialModule,

    TranslateModule,

    TwigLibsModule,

    FontAwesomeModule
  ]
})
export class SharedModule {}
