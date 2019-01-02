import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AutocompleteService } from '@app/libs';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupSearchService implements AutocompleteService {
  constructor(private service: GroupService) {}
  fetch(params?: HttpParams): Promise<any> {
    return this.service
      .search(
        params.get('query'),
        Number(params.get('pageIndex')),
        Number(params.get('pageSize'))
      )
      .toPromise();
  }
}
