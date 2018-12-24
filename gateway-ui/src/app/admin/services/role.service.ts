import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeycloakRole } from '../admin.model';
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
   * addRole
   */
  public add(role: Partial<KeycloakRole>): Observable<KeycloakRole> {
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.http
      .post(url, role)
      .pipe(switchMap(_ => this.http.get<KeycloakRole>(`${url}/${role.name}`)));
  }
}
