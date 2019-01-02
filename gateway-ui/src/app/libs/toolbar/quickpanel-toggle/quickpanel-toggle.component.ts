import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'ngx-quickpanel-toggle',
  templateUrl: './quickpanel-toggle.component.html',
  styleUrls: ['./quickpanel-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickpanelToggleComponent implements OnInit {
  @Input()
  quickpanel: MatSidenav;

  constructor() {}

  ngOnInit() {}

  openQuickpanel() {
    this.quickpanel.open();
  }
}
