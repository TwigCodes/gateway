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
import { DynaTableModule, MaterialModule, CdkModule } from '@app/libs';

import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DetailRowDirective } from './detail-row.directive';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { MultiSelectChipsComponent } from './multi-select-chips/multi-select-chips.component';
import { CheckBoxListComponent } from './check-box-list/check-box-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule,

    TranslateModule,

    MaterialModule,
    FlexLayoutModule,

    FontAwesomeModule
  ],
  declarations: [
    BigInputComponent,
    BigInputActionComponent,
    AutocompleteComponent,
    DetailRowDirective,
    FilterMenuComponent,
    MultiSelectChipsComponent,
    CheckBoxListComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MaterialModule,
    CdkModule,
    FlexLayoutModule,
    DynaTableModule,

    FontAwesomeModule,

    BigInputComponent,
    BigInputActionComponent,
    AutocompleteComponent,
    DetailRowDirective,
    MultiSelectChipsComponent,
    CheckBoxListComponent
  ]
})
export class SharedModule {}
