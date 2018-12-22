import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../list-or-grid-with-filter/list-or-grid-with-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'tgapp-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {
  menus = [
    {
      id: '1',
      title: '角色管理',
      subtitle: '管理用户角色',
      desc:
        '系统管理员可以查看、新建、修改、删除系统的角色，但默认情况下系统的内建角色 User 和 Admin 是无法删除的',
      link: 'admin/roles'
    },
    {
      id: '2',
      title: '用户管理',
      subtitle: '管理系统用户',
      desc:
        '系统管理员可以查看、新建、修改、删除系统的用户，但默认情况下系统的内建超级用户是无法删除的',
      link: 'admin/users'
    }
  ];
  items: Item[] = this.menus.map(menu => ({ ...menu, link: undefined }));

  constructor(private router: Router) {}

  ngOnInit() {}

  handleSelect(item: Item) {
    const idx = this.menus.findIndex(menu => menu.id === item.id);
    if (idx === -1) {
      return;
    }
    this.router.navigate([this.menus[idx].link]);
  }
}
