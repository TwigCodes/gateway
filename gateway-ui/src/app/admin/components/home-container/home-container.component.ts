import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '@app/libs/list-or-grid-with-filter/list-or-grid-with-filter.component';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminMenuService } from '@app/admin/services';
import { BASIC_ADMIN_MENU } from '@app/admin/commons';

@Component({
  selector: 'tgapp-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {
  items$: Observable<Item[]> = this.adminMenu.getAll().pipe(
    map(menus => [...BASIC_ADMIN_MENU, ...menus]),
    map(menus =>
      menus.map(menu => ({
        ...menu,
        title: menu.title,
        desc: menu.desc,
        subtitle: menu.subtitle,
        value: menu
      }))
    )
  );

  constructor(
    private router: Router,
    private adminMenu: AdminMenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  handleSelect(menu) {
    this.router.navigate([menu.link], { relativeTo: this.route });
  }
}
