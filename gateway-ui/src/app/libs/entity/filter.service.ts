import { CrudService } from './crud.service';
import { Entity } from './entity.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { retry, catchError, finalize } from 'rxjs/operators';

export interface Filter {
  [name: string]: string | string[];
}

export abstract class FilterService<T extends Entity> extends CrudService<T> {
  findAll(
    filter: Filter,
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 100
  ): Observable<T[]> {
    this.loadingSubject.next(true);
    return this.httpClient
      .get<T[]>(`${this.baseUrl}/${this.entityPath}`, {
        params: new HttpParams()
          .set('filter', 'filter TODO')
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }
}
