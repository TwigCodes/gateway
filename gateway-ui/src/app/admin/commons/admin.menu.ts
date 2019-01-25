import { AdminMenuItem } from '@app/libs';

export const BASIC_ADMIN_MENU: AdminMenuItem[] = [
  new AdminMenuItem({
    objectId: '1',
    title: 'tgapp.admin.menu.role.title',
    subtitle: 'tgapp.admin.menu.role.subtitle',
    desc: 'tgapp.admin.menu.role.desc',
    link: 'roles'
  }),
  new AdminMenuItem({
    objectId: '2',
    title: 'tgapp.admin.menu.user.title',
    subtitle: 'tgapp.admin.menu.user.subtitle',
    desc: 'tgapp.admin.menu.user.desc',
    link: 'users'
  }),
  new AdminMenuItem({
    objectId: '3',
    title: 'tgapp.admin.menu.group.title',
    subtitle: 'tgapp.admin.menu.group.subtitle',
    desc: 'tgapp.admin.menu.group.desc',
    link: 'groups'
  }),
  new AdminMenuItem({
    objectId: '4',
    title: 'tgapp.admin.menu.menu.title',
    subtitle: 'tgapp.admin.menu.menu.subtitle',
    desc: 'tgapp.admin.menu.menu.desc',
    link: 'menus'
  }),
  new AdminMenuItem({
    objectId: '5',
    title: 'tgapp.admin.menu.role-permissions.title',
    subtitle: 'tgapp.admin.menu.role-permissions.subtitle',
    desc: 'tgapp.admin.menu.role-permissions.desc',
    link: 'permissions'
  })
];
