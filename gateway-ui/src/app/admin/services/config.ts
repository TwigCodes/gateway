import { KeycloakRole } from '../admin.model';
import * as _ from 'lodash';

export const invisibleRoleIds = ['uma_authorization', 'offline_access'];
export const filteredRoles = (roles: KeycloakRole[]) =>
  roles.filter(role => !_.includes(invisibleRoleIds, role.name));
