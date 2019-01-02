import { UserEffects } from './users/user.effects';

import { UserRolesEffects } from './users/user-roles.effects';

import { UserGroupsEffects } from './users/user-groups.effects';

import { RoleEffects } from './roles/role.effects';

import { RoleUsersEffects } from './roles/role-users.effects';

import { GroupEffects } from './groups/group.effects';

import { GroupUsersEffects } from './groups/group-users.effects';

import { GroupDetailRolesEffects } from './groups/group-roles.effects';

import { AdminEffects } from './admin.effects';

export * from './roles/role.effects';
export * from './users/user.effects';
export * from './users/user-roles.effects';
export * from './users/user-groups.effects';
export * from './groups/group.effects';
export * from './roles/role-users.effects';
export * from './groups/group-users.effects';
export * from './groups/group-roles.effects';
export * from './admin.effects';

export const ADMIN_EFFECTS = [
  UserEffects,
  UserRolesEffects,
  UserGroupsEffects,
  RoleEffects,
  RoleUsersEffects,
  GroupEffects,
  GroupUsersEffects,
  GroupDetailRolesEffects,
  AdminEffects
];
