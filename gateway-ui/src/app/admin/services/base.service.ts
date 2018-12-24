import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { catchError, retry, finalize } from 'rxjs/operators';
import { format } from 'date-fns';
import { Entity } from '@app/libs/entity/entity.model';
import { environment } from '@env/environment';
import { Filter } from '@app/libs/entity/filter.service';

@Injectable()
export abstract class BaseService<T extends Entity> {
  protected readonly baseUrl = `${environment.keycloak.url}/admin/realms/${
    environment.keycloak.realm
  }`;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  protected abstract entityPath: string;

  constructor(protected httpClient: HttpClient) {}

  search(search: string, pageIndex: number, pageSize: number): Observable<T[]> {
    this.loadingSubject.next(true);
    const params = new HttpParams()
      .set('search', search)
      .set('first', String(pageIndex))
      .set('max', String(pageSize));

    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient.get<T[]>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  filter(filter: Filter, pageIndex: number, pageSize: number): Observable<T[]> {
    this.loadingSubject.next(true);
    const params = new HttpParams()
      .set('first', String(pageIndex))
      .set('max', String(pageSize));
    if (!filter) {
      return this.paged(pageIndex, pageSize);
    }
    for (const key of Object.keys(filter)) {
      const value = filter[key];
      if (value instanceof String) {
        params.set(key, value as string);
      } else {
        params.set(key, (value as string[]).join(','));
      }
    }
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient
      .get<T[]>(url, {
        params
      })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  paged(pageIndex: number, pageSize: number): Observable<T[]> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    const params = new HttpParams()
      .set('first', String(pageIndex))
      .set('max', String(pageSize));
    return this.httpClient.get<T[]>(url, { params: params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  count(): Observable<Number> {
    const url = `${this.baseUrl}/${this.entityPath}/count`;
    return this.httpClient.get<Number>(url).pipe(catchError(this.handleError));
  }

  getById(id: number | string) {
    // this.loadingSubject.next(true);
    return this.httpClient
      .get<T>(`${this.baseUrl}/${this.entityPath}/${id}`)
      .pipe(
        catchError(this.handleError)
        // finalize(() => this.loadingSubject.next(false))
      );
  }

  getAll(): Observable<T[]> {
    this.loadingSubject.next(true);
    return this.httpClient.get<T[]>(`${this.baseUrl}/${this.entityPath}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  delete(id: number | string) {
    this.loadingSubject.next(true);
    return this.httpClient
      .delete(`${this.baseUrl}/${this.entityPath}/${id}`)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  add(entity: T) {
    this.loadingSubject.next(true);
    return this.httpClient
      .post(`${this.baseUrl}/${this.entityPath}`, entity)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  update(id: number | string, entity: T) {
    console.log(entity);
    this.loadingSubject.next(true);
    return this.httpClient
      .put(`${this.baseUrl}/${this.entityPath}/${id}`, entity)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  protected convertToJson(body: any) {
    const temporalFunctionToJson = Date.prototype.toJSON;
    Date.prototype.toJSON = function() {
      return format(this, 'YYYY-MM-DD');
    };

    const jsonBody = JSON.stringify(body);

    Date.prototype.toJSON = temporalFunctionToJson;
    return jsonBody;
  }
}
