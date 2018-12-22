import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

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
  username: string;
  email: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  adminBaseUrl = `${environment.keycloak.url}/admin/realms/${
    environment.keycloak.realm
  }`;
  constructor(private http: HttpClient) {}

  /**
   * getRoles
   */
  public getRoles(): Observable<KeycloakRole[]> {
    const url = `${this.adminBaseUrl}/roles`;
    return this.http.get<KeycloakRole[]>(url);
  }

  /**
   * getUsers
   */
  public getUsers(pageIndex: number, pageSize: number) {
    const url = `${this.adminBaseUrl}/roles`;
    const params = new HttpParams()
      .append('first', String(pageIndex))
      .append('max', String(pageSize));
    return this.http.get<KeycloakUser[]>(url, { params: params });
  }
}
