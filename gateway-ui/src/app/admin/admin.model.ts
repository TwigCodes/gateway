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
