import { Injectable } from '@angular/core';
import { catchError, finalize, map, retry, share } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CrudService } from '@app/libs/entity/crud.service';
import { Entity } from '@app/libs/entity/entity.model';
import { environment as env } from '@env/environment';
import { LeanCloudSearch, LeanCloudResult } from './lean-cloud.model';
import { tag } from 'rxjs-spy/operators';
import { DEFAULT_PAGE_SIZE } from '../dyna-table';

@Injectable()
export abstract class BaseLeanCloudService<
  T extends Entity
> extends CrudService<T> {
  protected readonly baseUrl = `${env.leanCloud.baseUrl}/classes`;
  protected readonly DEFAULT_PAGE_SKIP = 0;
  protected readonly DEFAULT_PAGE_LIMIT = 20;
  add(entity: T) {
    this.loadingSubject.next(true);
    return this.httpClient
      .post<T>(`${this.baseUrl}/${this.entityPath}`, entity, {
        params: { fetchWhenSave: 'true' }
      })
      .pipe(
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
          return Object.assign(entity, { updatedAt: res.updatedAt });
        }),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  search(search: LeanCloudSearch): Observable<T[]> {
    return this.paged(0, DEFAULT_PAGE_SIZE, null, search.expression).pipe(
      map(res => res.results),
      catchError(__ => of([]))
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
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError),
        share(),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getAll(): Observable<T[]> {
    return this.paged(
      this.DEFAULT_PAGE_SKIP,
      this.DEFAULT_PAGE_LIMIT,
      null,
      null
    ).pipe(map(result => result.results));
  }
}
