import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
