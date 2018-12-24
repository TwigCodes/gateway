import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { environment } from '@env/environment';

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
   * addRole
   */
  public addRole(role: Partial<KeycloakRole>): Observable<KeycloakRole> {
    const url = `${this.adminBaseUrl}/roles`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(url, JSON.stringify(role), { headers })
      .pipe(switchMap(_ => this.http.get<KeycloakRole>(`${url}/${role.name}`)));
  }

  /**
   * updateRole
   */
  public updateRole(id: string, role: KeycloakRole) {
    const url = `${this.adminBaseUrl}/roles/${id}`;
    const toUpdate = { ...role, id: id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, JSON.stringify(toUpdate), { headers });
  }

  /**
   * deleteRole
   */
  public deleteRole(id: string) {
    const url = `${this.adminBaseUrl}/roles/${id}`;
    return this.http.delete(url);
  }
  /**
   * getUsers
   */
  public getUsers(
    pageIndex: number,
    pageSize: number
  ): Observable<KeycloakUser[]> {
    const url = `${this.adminBaseUrl}/users`;
    const params = new HttpParams()
      .append('first', String(pageIndex))
      .append('max', String(pageSize));
    return this.http.get<KeycloakUser[]>(url, { params: params });
  }

  /**
   * getUserCount
   */
  public getUserCount(): Observable<Number> {
    const url = `${this.adminBaseUrl}/users/count`;
    return this.http.get<Number>(url);
  }

  /**
   * addUser
   */
  public addUser(user: Partial<KeycloakUser>): Observable<KeycloakUser> {
    const url = `${this.adminBaseUrl}/users`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, JSON.stringify(user), { headers }).pipe(
      switchMap(_ => {
        const params = new HttpParams().set('username', user.username);
        return this.http.get<KeycloakUser[]>(url, { params: params }).pipe(
          filter(users => users !== null && users.length > 0),
          map(users => users[0])
        );
      })
    );
  }

  /**
   * updateUser
   */
  public updateUser(id: string, user: KeycloakUser) {
    const url = `${this.adminBaseUrl}/users/${id}`;
    const toUpdate = { ...user, id: id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, JSON.stringify(toUpdate), { headers });
  }

  /**
   * deleteUser
   */
  public deleteUser(id: string) {
    const url = `${this.adminBaseUrl}/users/${id}`;
    return this.http.delete(url);
  }
}
