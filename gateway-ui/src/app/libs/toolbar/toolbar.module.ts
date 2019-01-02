import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBadgeModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { UserMenuComponent } from './user-menu/user-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SidenavToggleComponent } from './sidenav-toggle/sidenav-toggle.component';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { FullscreenToggleComponent } from './fullscreen-toggle/fullscreen-toggle.component';
import { QuickpanelToggleComponent } from './quickpanel-toggle/quickpanel-toggle.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    UserMenuComponent,
    SidenavToggleComponent,
    ClickOutsideDirective,
    FullscreenToggleComponent,
    QuickpanelToggleComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatBadgeModule,
    FlexLayoutModule
  ],
  exports: [ClickOutsideDirective]
})
export class ToolbarModule {}
