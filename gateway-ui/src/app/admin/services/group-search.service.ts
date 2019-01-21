import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AutocompleteService } from '@app/libs';
import { GroupService } from './group.service';
import { map } from 'rxjs/operators';
import { flatGroupTree } from '../admin-utils';
import * as _ from 'lodash';
import { tag } from 'rxjs-spy/operators';
import { KeycloakGroupDTO } from '../admin.model';

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
      .pipe(
        tag('before converted'),
        map(data => _.values(flatGroupTree(data).entities.group)),
        map(groups =>
          groups.filter((group: KeycloakGroupDTO) =>
            group.name.toLowerCase().includes(params.get('query').toLowerCase())
          )
        ),
        tag('converted')
      )
      .toPromise();
  }
}
