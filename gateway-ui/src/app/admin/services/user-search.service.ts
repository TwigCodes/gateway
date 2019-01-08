import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AutocompleteService } from '@app/libs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService implements AutocompleteService {
  constructor(private service: UserService) {}
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
