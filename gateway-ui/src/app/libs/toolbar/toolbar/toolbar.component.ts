import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '@ngx-starter-kit/auth';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'ngx-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  @Input() quickpanel: MatSidenav;
  @Input() sidenav: MatSidenav;
  isFullscreen = false;

  constructor() {}

  ngOnInit() {}
}
