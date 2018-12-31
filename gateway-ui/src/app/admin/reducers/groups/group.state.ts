import * as fromGroup from './group.reducer';
import * as fromGroupDetail from './group-detail.reducer';
import * as fromGroupDetailAvailableRoles from './group-detail-available-roles.reducer';
import * as fromGroupDetailRealmRoles from './group-detail-realm-roles.reducer';

export interface GroupState {
  groups: fromGroup.State;
  users: fromGroupDetail.State;
  available_roles: fromGroupDetailAvailableRoles.State;
  realm_roles: fromGroupDetailRealmRoles.State;
}
