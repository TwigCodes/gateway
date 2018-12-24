import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { Entity } from './entity.model';
import { FilterService, Filter } from './filter.service';

export abstract class EntityDataSource<
  TEntity extends Entity,
  TService extends FilterService<TEntity>
> implements DataSource<TEntity> {
  private entitiesSubject: BehaviorSubject<
    Array<TEntity>
  > = new BehaviorSubject([]);

  constructor(protected entityService: TService) {}

  load(
    filter: Filter,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.entityService
      .findAll(filter, sortDirection, pageIndex, pageSize)
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
