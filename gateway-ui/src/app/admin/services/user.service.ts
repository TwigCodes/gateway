import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { KeycloakUser, KeycloakRole, KeycloakGroup } from '../admin.model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import {
  switchMap,
  filter,
  map,
  catchError,
  finalize,
  mapTo
} from 'rxjs/operators';
import { environment } from '@env/environment';
import { filteredRoles } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<KeycloakUser> {
  entityPath = 'users';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * override add method
   */
  public add(user: Partial<KeycloakUser>): Observable<KeycloakUser> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient.post(url, user).pipe(
      switchMap(_ => {
        const params = new HttpParams().set('username', user.username);
        return this.httpClient
          .get<KeycloakUser[]>(url, { params: params })
          .pipe(
            filter(users => users !== null && users.length > 0),
            map(users => users[0]),
            catchError(this.handleError),
            finalize(() => this.loadingSubject.next(false))
          );
      })
    );
  }

  /**
   * getRolesByUserId
   */
  public getRolesByUserId(id: string): Observable<KeycloakRole[]> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/role-mappings/realm`;
    return this.httpClient.get<KeycloakRole[]>(url).pipe(
      map(roles => filteredRoles(roles)),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * assignRolesToUser
   * @param id the id of the user
   * @param roles an array of roles to be assigned to the user
   */
  public addRolesToUser(
    id: string,
    roles: KeycloakRole[]
  ): Observable<string[]> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/role-mappings/realm`;
    return this.httpClient.post<KeycloakRole[]>(url, roles).pipe(
      mapTo(roles.map(role => role.id)),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * removeRolesFromUser
   */
  public deleteRolesFromUser(
    id: string,
    roles: KeycloakRole[]
  ): Observable<string[]> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/role-mappings/realm`;
    return this.httpClient
      .request<KeycloakRole[]>('delete', url, { body: roles })
      .pipe(
        mapTo(roles.map(role => role.id)),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  /**
   * getUserGroups
   */
  public getUserGroups(id: string) {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/groups`;
    return this.httpClient.get<KeycloakGroup[]>(url).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * addUserToGroup
   */
  public addUserToGroup(userId: string, groupId: string) {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${
      this.entityPath
    }/${userId}/groups/${groupId}`;
    return this.httpClient
      .put<KeycloakGroup[]>(url, {
        groupId: groupId,
        realm: environment.keycloak.realm,
        userId: userId
      })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  public deleteUserFromGroup(userId: string, groupId: string) {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${
      this.entityPath
    }/${userId}/groups/${groupId}`;
    return this.httpClient.delete(url).pipe(
      mapTo({
        groupId: groupId,
        userId: userId
      }),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
