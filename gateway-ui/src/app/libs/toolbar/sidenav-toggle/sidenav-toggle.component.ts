import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'ngx-sidenav-toggle',
  templateUrl: './sidenav-toggle.component.html',
  styleUrls: ['./sidenav-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavToggleComponent implements OnInit {
  @Input()
  sidenav: MatSidenav;

  constructor() {}

  ngOnInit() {}

  openSidenav() {
    this.sidenav.open();
  }
}
