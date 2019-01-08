import { Crumb } from '@app/libs';

export const ADMIN_HOME: Crumb = {
  name: 'tgapp.breadcrumb.admin.home',
  link: '../'
};

export const ADMIN_USERS: Crumb = {
  name: 'tgapp.breadcrumb.admin.users',
  link: '../users'
};

export const ADMIN_ROLES: Crumb = {
  name: 'tgapp.breadcrumb.admin.roles',
  link: '../roles'
};

export const ADMIN_GROUPS: Crumb = {
  name: 'tgapp.breadcrumb.admin.groups',
  link: '../groups'
};

export const ADMIN_MENUS: Crumb = {
  name: 'tgapp.breadcrumb.admin.menus',
  link: '.'
};

export const BREADCRUMBS_USERS = [ADMIN_HOME, ADMIN_USERS];

export const BREADCRUMBS_ROLES = [ADMIN_HOME, ADMIN_ROLES];

export const BREADCRUMBS_GROUPS = [ADMIN_HOME, ADMIN_GROUPS];

export const BREADCRUMBS_MENUS = [ADMIN_HOME, ADMIN_MENUS];
