import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, finalize, catchError, map } from 'rxjs/operators';
import { KeycloakRole, KeycloakUser } from '../admin.model';
import { BaseKeycloakService } from './base-keycloak.service';
import { filteredRoles } from './config';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseKeycloakService<KeycloakRole> {
  entityPath = 'roles';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * override the method of base class
   */
  public add(role: Partial<KeycloakRole>): Observable<KeycloakRole> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient
      .post(url, role)
      .pipe(
        switchMap(_ => this.httpClient.get<KeycloakRole>(`${url}/${role.name}`))
      )
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  /**
   * name
   */
  public getAllFiltered() {
    return this.getAll().pipe(map(roles => filteredRoles(roles)));
  }

  /**
   * Get the users who have the role specified
   * @param name the name of the role
   */
  public getUsersByRoleName(name: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${name}/users`;
    const params = new HttpParams()
      .set('first', String(pageIndex))
      .set('max', String(pageSize));
    return this.httpClient.get<KeycloakUser[]>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
