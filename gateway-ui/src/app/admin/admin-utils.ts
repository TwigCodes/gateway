import { KeycloakGroup } from './admin.model';
import { normalize, schema } from 'normalizr';

export const flatGroupTree = (groups: KeycloakGroup | KeycloakGroup[]) => {
  const group = new schema.Entity('group');
  group.define({ subGroups: [group] });
  const normalizedData = normalize(
    groups,
    groups instanceof Array ? [group] : group
  );
  return normalizedData;
};
