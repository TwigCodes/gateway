import { Entity } from '@app/libs';

export interface KeycloakRole {
  id: string;
  name: string;
  description?: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}

export interface KeycloakUser {
  id: string;
  totp: boolean;
  username: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
  attributes?: { [key: string]: string | string[] };
  access?: { [key: string]: boolean };
}

export interface KeycloakGroup {
  id: string;
  name: string;
  path: string;
  subGroups: KeycloakGroup[];
  realmRoles?: string[];
  clientRoles?: { [key: string]: string[] };
  attributes?: { [key: string]: string[] };
  access?: { [key: string]: boolean };
}

export interface KeycloakGroupDTO {
  id: string;
  name: string;
  path: string;
  subGroups: string[];
  realmRoles?: string[];
  clientRoles?: { [key: string]: string[] };
  attributes?: { [key: string]: string[] };
  access?: { [key: string]: boolean };
}

export class AdminMenuItem extends Entity {
  objectId: string;
  title: string;
  subtitle: string;
  desc: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  get id() {
    return this.objectId;
  }
}

export class RolePermission extends Entity {
  objectId: string;
  roleName: string;
  permissions: { route: string; name: string }[];
  createdAt: Date;
  updatedAt: Date;
  get id() {
    return this.objectId;
  }
}
