import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './feedback.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class FeedbackService {
  constructor(private http: HttpClient) {}
  /**
   * getSupervisor
   */
  public getSupervisor(reportTo: string): Observable<Employee[]> {
    const url = `${environment.apiBaseUrl}/employee`;
    const params = new HttpParams().append('email', reportTo);
    return this.http.get<Employee[]>(url, { params: params });
  }

  /**
   * getSubordinates
   */
  public getSubordinates(email: string): Observable<Employee[]> {
    const url = `${environment.apiBaseUrl}/employee`;
    const params = new HttpParams().append('reportTo', email);
    return this.http.get<Employee[]>(url, { params: params });
  }

  /**
   * searchByEmail
   */
  public searchByEmail(query: string): Observable<Employee[]> {
    const url = `${environment.apiBaseUrl}/employee`;
    const params = new HttpParams().append('email_like', query);
    return this.http.get<Employee[]>(url, { params: params });
  }
}
