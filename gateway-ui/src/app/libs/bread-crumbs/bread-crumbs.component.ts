import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

export interface Crumb {
  name: string;
  link?: string;
}
@Component({
  selector: 'ngx-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbsComponent implements OnInit {
  @Input()
  readonly title: string;
  @Input()
  crumbs: ReadonlyArray<Crumb>;

  constructor() {}

  ngOnInit() {}
}
