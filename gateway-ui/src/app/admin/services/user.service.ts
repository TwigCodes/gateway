import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { KeycloakUser, KeycloakRole } from '../admin.model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import {
  switchMap,
  filter,
  map,
  catchError,
  finalize,
  mapTo
} from 'rxjs/operators';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<KeycloakUser> {
  entityPath = 'users';
  constructor(private http: HttpClient) {
    super(http);
  }

  /**
   * override add method
   */
  public add(user: Partial<KeycloakUser>): Observable<KeycloakUser> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.http.post(url, JSON.stringify(user)).pipe(
      switchMap(_ => {
        const params = new HttpParams().set('username', user.username);
        return this.http.get<KeycloakUser[]>(url, { params: params }).pipe(
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
    return this.http.get<KeycloakRole[]>(url).pipe(
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
    return this.http.post<KeycloakRole[]>(url, roles).pipe(
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
    return this.http
      .request<KeycloakRole[]>('delete', url, { body: roles })
      .pipe(
        mapTo(roles.map(role => role.id)),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }
}
