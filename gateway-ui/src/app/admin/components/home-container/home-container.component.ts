import { Component, OnInit, ViewChild } from '@angular/core';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonToggleGroup } from '@angular/material';

export interface Menu {
  title: string;
  subtitle: string;
  desc: string;
}

@Component({
  selector: 'tgapp-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  menus: Menu[] = [
    {
      title: '角色管理',
      subtitle: '管理用户角色',
      desc:
        '系统管理员可以查看、新建、修改、删除系统的角色，但默认情况下系统的内建角色 User 和 Admin 是无法删除的'
    },
    {
      title: '用户管理',
      subtitle: '管理系统用户',
      desc:
        '系统管理员可以查看、新建、修改、删除系统的用户，但默认情况下系统的内建超级用户是无法删除的'
    }
  ];
  filteredMenus = [...this.menus];
  selection = new SelectionModel<Partial<Menu>>(false, []);
  @ViewChild('gridView')
  public gridView: MatButtonToggleGroup;
  constructor() {}

  ngOnInit() {}

  applyFilter(filterValue: string) {
    console.log('filter value is ', filterValue);
    if (!filterValue) {
      this.filteredMenus = [...this.menus];
    }
    this.filteredMenus = this.menus.filter(
      menu =>
        menu.title.includes(filterValue) || menu.subtitle.includes(filterValue)
    );
  }
}
