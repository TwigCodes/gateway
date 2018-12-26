import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '@app/libs/list-or-grid-with-filter/list-or-grid-with-filter.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'tgapp-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {
  menus$ = this.translate
    .stream([
      'tgapp.admin.menu.role.title',
      'tgapp.admin.menu.role.subtitle',
      'tgapp.admin.menu.role.desc',
      'tgapp.admin.menu.user.title',
      'tgapp.admin.menu.user.subtitle',
      'tgapp.admin.menu.role.desc'
    ])
    .pipe(
      map(t => {
        return [
          {
            id: '1',
            title: t['tgapp.admin.menu.role.title'],
            subtitle: t['tgapp.admin.menu.role.subtitle'],
            desc: t['tgapp.admin.menu.role.desc'],
            link: 'admin/roles'
          },
          {
            id: '2',
            title: t['tgapp.admin.menu.user.title'],
            subtitle: t['tgapp.admin.menu.user.subtitle'],
            desc: t['tgapp.admin.menu.role.desc'],
            link: 'admin/users'
          }
        ];
      })
    );

  items$: Observable<Item[]> = this.menus$.pipe(
    map(menus =>
      menus.map(menu => ({
        ...menu,
        value: menu
      }))
    )
  );

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {}

  handleSelect(menu) {
    this.router.navigate([menu.link]);
  }
}
