import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Entity } from '@app/libs/entity/entity.model';
import { environment } from '@env/environment';
import { Filter } from '@app/libs/entity/filter.service';
import { CrudService } from '@app/libs/entity/crud.service';

@Injectable()
export abstract class BaseService<T extends Entity> extends CrudService<T> {
  protected readonly baseUrl = `${environment.keycloak.url}/admin/realms/${
    environment.keycloak.realm
  }`;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

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

  count(): Observable<number> {
    const url = `${this.baseUrl}/${this.entityPath}/count`;
    return this.httpClient.get<number>(url).pipe(catchError(this.handleError));
  }
}
