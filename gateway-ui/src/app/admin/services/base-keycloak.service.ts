import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { Entity } from '@app/libs/entity/entity.model';
import { environment } from '@env/environment';
import { Filter } from '@app/libs/entity/filter.service';
import { CrudService } from '@app/libs/entity/crud.service';

@Injectable()
export abstract class BaseKeycloakService<T extends Entity> extends CrudService<
  T
> {
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
      .set('first', String(pageIndex * pageSize))
      .set('max', String(pageSize));

    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient.get<T[]>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  filter(filter: Filter, pageIndex: number, pageSize: number): Observable<T[]> {
    this.loadingSubject.next(true);
    const params = {
      ...filter,
      first: String(pageIndex * pageSize),
      max: String(pageSize)
    };
    if (!filter) {
      return this.paged(pageIndex, pageSize);
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
      .set('first', String(pageIndex * pageSize))
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
