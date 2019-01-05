import { Injectable } from '@angular/core';
import { catchError, finalize, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CrudService } from '@app/libs/entity/crud.service';
import { Entity } from '@app/libs/entity/entity.model';
import { environment as env } from '@env/environment';
import { LeanCloudSearch, LeanCloudResult } from './lean-cloud.model';

@Injectable()
export abstract class BaseLeanCloudService<
  T extends Entity
> extends CrudService<T> {
  protected readonly baseUrl = `${env.leanCloud.baseUrl}/classes`;

  search(
    search: LeanCloudSearch,
    pageIndex: number,
    pageSize: number
  ): Observable<LeanCloudResult<T>> {
    this.loadingSubject.next(true);
    const params = new HttpParams()
      .set('where', search.expression)
      .set('skip', String(pageIndex * pageSize))
      .set('limit', String(pageSize));

    const url = `${this.baseUrl}/${this.entityPath}`;
    return this.httpClient.get<LeanCloudResult<T>>(url, { params }).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  paged(pageIndex: number, pageSize: number): Observable<LeanCloudResult<T>> {
    this.loadingSubject.next(true);
    const url = `${this.baseUrl}/${this.entityPath}`;
    const params = new HttpParams()
      .set('skip', String(pageIndex * pageSize))
      .set('limit', String(pageSize))
      .set('count', '1');
    return this.httpClient
      .get<LeanCloudResult<T>>(url, { params: params })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getAll(): Observable<T[]> {
    this.loadingSubject.next(true);
    return this.httpClient.get(`${this.baseUrl}/${this.entityPath}`).pipe(
      map((result: { results: T[] }) => result.results),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
