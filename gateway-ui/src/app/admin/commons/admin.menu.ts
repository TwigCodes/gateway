import { AdminMenuItem } from '../admin.model';

export const BASIC_ADMIN_MENU: AdminMenuItem[] = [
  Object.create({
    objectId: '1',
    title: 'tgapp.admin.menu.role.title',
    subtitle: 'tgapp.admin.menu.role.subtitle',
    desc: 'tgapp.admin.menu.role.desc',
    link: 'roles'
  }),
  Object.create({
    objectId: '2',
    title: 'tgapp.admin.menu.user.title',
    subtitle: 'tgapp.admin.menu.user.subtitle',
    desc: 'tgapp.admin.menu.user.desc',
    link: 'users'
  }),
  Object.create({
    objectId: '3',
    title: 'tgapp.admin.menu.group.title',
    subtitle: 'tgapp.admin.menu.group.subtitle',
    desc: 'tgapp.admin.menu.group.desc',
    link: 'groups'
  }),
  Object.create({
    objectId: '4',
    title: 'tgapp.admin.menu.menu.title',
    subtitle: 'tgapp.admin.menu.menu.subtitle',
    desc: 'tgapp.admin.menu.menu.desc',
    link: 'menus'
  })
];
