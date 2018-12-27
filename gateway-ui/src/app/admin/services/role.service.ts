import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, finalize, catchError } from 'rxjs/operators';
import { KeycloakRole, KeycloakUser } from '../admin.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<KeycloakRole> {
  entityPath = 'roles';
  constructor(private http: HttpClient) {
    super(http);
  }

  /**
   * override the method of base class
   */
  public add(role: Partial<KeycloakRole>): Observable<KeycloakRole> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.http
      .post(url, role)
      .pipe(switchMap(_ => this.http.get<KeycloakRole>(`${url}/${role.name}`)))
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
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
    return this.http.get<KeycloakUser[]>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
