import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { KeycloakGroup, KeycloakUser } from '../admin.model';
import { BaseService } from './base.service';
import { map, catchError, finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<KeycloakGroup> {
  entityPath = 'groups';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * override the method of base class
   */
  public add(group: Partial<KeycloakGroup>): Observable<KeycloakGroup> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient.post(url, group, { observe: 'response' }).pipe(
      map(res => res.headers.get('Location')),
      switchMap(idUrl => this.httpClient.get<KeycloakGroup>(idUrl)),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  public updateSubGroups(
    id: string,
    changes: Partial<KeycloakGroup>
  ): Observable<KeycloakGroup> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/children`;
    return this.httpClient.post<KeycloakGroup>(url, changes).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * getGroupMembers
   */
  public getGroupMembers(id: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/members`;
    const params = new HttpParams()
      .set('first', String(pageIndex * pageSize))
      .set('max', String(pageSize));
    return this.httpClient.get<KeycloakUser[]>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * getGroupRealmRoles
   */
  public getGroupRealmRoles(id: string) {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}/${id}/role-mappings/realm`;
    return this.httpClient.get<KeycloakUser>(url).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
