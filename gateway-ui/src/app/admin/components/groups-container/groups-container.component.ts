import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { KeycloakGroup } from '@app/admin/admin.model';
import { SimpleTreeNode } from '@app/libs';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';

import * as fromAdmin from '../../reducers';
import * as fromGroup from '../../actions/group.actions';
import * as fromGroupSelectors from '../../reducers/group.selectors';

@Component({
  selector: 'tgapp-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.scss']
})
export class GroupsContainerComponent implements OnInit {
  pageIndex = 0;
  pageSize = 25;
  crumbs: Crumb[] = [
    {
      name: 'admin',
      link: '/admin'
    },
    {
      name: 'groups',
      link: '/admin/groups'
    }
  ];
  data$ = this.store.pipe(
    select(fromGroupSelectors.selectAllInTree),
    map(groups => this.convertData(groups))
  );

  constructor(private router: Router, private store: Store<fromAdmin.State>) {}

  ngOnInit() {
    this.store.dispatch(
      new fromGroup.LoadPageAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    );
  }
  convertData = (inData: KeycloakGroup[]) =>
    inData
      .filter(item => item != null && item.id != null)
      .map<SimpleTreeNode>(item => ({
        id: item.id,
        label: item.name,
        value: item,
        children: this.convertData(item.subGroups)
      }));
  handleSelected(group: KeycloakGroup) {
    this.router.navigate([`/admin/groups/${group.id}`]);
  }
}
