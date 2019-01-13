import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Entity, BaseLeanCloudService } from '../entity';

export abstract class EntityDataSource<
  TEntity extends Entity,
  TService extends BaseLeanCloudService<TEntity>
> implements DataSource<TEntity> {
  private entitiesSubject: BehaviorSubject<
    Array<TEntity>
  > = new BehaviorSubject([]);

  constructor(protected entityService: TService) {}

  load(filter: string, sort: string, pageIndex: number, pageSize: number) {
    this.entityService
      .paged(pageIndex, pageSize, sort, filter)
      .pipe(
        map(res => res.results),
        catchError(() => of([]))
      )
      .subscribe(entities => this.entitiesSubject.next(entities));
  }

  connect(collectionViewer: CollectionViewer): Observable<TEntity[]> {
    console.log('Connecting data source');
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
  }
}
