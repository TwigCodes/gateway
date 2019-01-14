import { Injectable } from '@angular/core';
import { catchError, finalize, map, retry, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CrudService } from '@app/libs/entity/crud.service';
import { Entity } from '@app/libs/entity/entity.model';
import { environment as env } from '@env/environment';
import { LeanCloudSearch, LeanCloudResult } from './lean-cloud.model';
import { tag } from 'rxjs-spy/operators';

@Injectable()
export abstract class BaseLeanCloudService<
  T extends Entity
> extends CrudService<T> {
  protected readonly baseUrl = `${env.leanCloud.baseUrl}/classes`;

  add(entity: T) {
    this.loadingSubject.next(true);
    return this.httpClient
      .post(`${this.baseUrl}/${this.entityPath}`, entity)
      .pipe(
        map((res: { id: string; createdAt: Date }) => {
          const created = Object.assign(entity, res);
          return Object.assign(created, { updatedAt: res.createdAt });
        }),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  update(id: number | string, entity: T): Observable<T> {
    this.loadingSubject.next(true);
    return this.httpClient
      .put(`${this.baseUrl}/${this.entityPath}/${id}`, entity)
      .pipe(
        map((res: Partial<T>) => {
          console.log(entity);
          return Object.assign(entity, { updatedAt: res.updatedAt });
        }),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  search(
    search: LeanCloudSearch,
    pageIndex: number,
    pageSize: number,
    sort: string | null
  ): Observable<LeanCloudResult<T>> {
    this.loadingSubject.next(true);
    const params = new HttpParams()
      .set('where', search.expression)
      .set('skip', String(pageIndex * pageSize))
      .set('limit', String(pageSize))
      .set('order', sort);
    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient.get<LeanCloudResult<T>>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  paged(
    skip: number,
    limit: number,
    sort: string | null,
    filter: string | null
  ): Observable<LeanCloudResult<T>> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    const params = new HttpParams()
      .set('skip', String(skip))
      .set('limit', String(limit))
      .set('count', '1')
      .set('order', sort)
      .set('where', filter);
    return this.httpClient
      .get<LeanCloudResult<T>>(url, { params: params })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getAll(): Observable<T[]> {
    this.loadingSubject.next(true);
    return this.httpClient
      .get<LeanCloudResult<T>>(`${this.baseUrl}/${this.entityPath}`)
      .pipe(
        map(result => result.results),
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }
}
