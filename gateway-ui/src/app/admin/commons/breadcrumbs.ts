import { Crumb } from '@app/libs';

export const ADMIN_HOME: Crumb = {
  name: 'tgapp.breadcrumb.admin.home',
  link: '/admin'
};

export const ADMIN_USERS: Crumb = {
  name: 'tgapp.breadcrumb.admin.users',
  link: '/admin/users'
};

export const ADMIN_ROLES: Crumb = {
  name: 'tgapp.breadcrumb.admin.roles',
  link: '/admin/roles'
};

export const ADMIN_GROUPS: Crumb = {
  name: 'tgapp.breadcrumb.admin.groups',
  link: '/admin/groups'
};

export const BREADCRUMBS_USERS = [ADMIN_HOME, ADMIN_USERS];

export const BREADCRUMBS_ROLES = [ADMIN_HOME, ADMIN_ROLES];

export const BREADCRUMBS_GROUPS = [ADMIN_HOME, ADMIN_GROUPS];
