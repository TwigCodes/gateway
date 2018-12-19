import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tgkpi-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  menus = [
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
  constructor() {}

  ngOnInit() {}
}
