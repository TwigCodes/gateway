import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { KeycloakUser } from '../admin.model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { switchMap, filter, map } from 'rxjs/operators';

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
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.http.post(url, JSON.stringify(user)).pipe(
      switchMap(_ => {
        const params = new HttpParams().set('username', user.username);
        return this.http.get<KeycloakUser[]>(url, { params: params }).pipe(
          filter(users => users !== null && users.length > 0),
          map(users => users[0])
        );
      })
    );
  }
}
