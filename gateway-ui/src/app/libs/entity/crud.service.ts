import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Entity } from './entity.model';
import { catchError, finalize, retry } from 'rxjs/operators';
import { format } from 'date-fns';

export abstract class CrudService<T extends Entity> {
  protected readonly baseUrl = environment.apiBaseUrl;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  protected abstract entityPath: string;

  constructor(protected httpClient: HttpClient) {}

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
    this.loadingSubject.next(true);
    return this.httpClient
      .put(`${this.baseUrl}/${this.entityPath}/${id}`, entity)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  protected handleError(error: HttpErrorResponse) {
    let errMsg;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errMsg = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
      errMsg = error.error.errorMessage;
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(
      errMsg || 'Something bad happened; please try again later.'
    );
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
