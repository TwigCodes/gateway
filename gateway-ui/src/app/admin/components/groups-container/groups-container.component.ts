import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  take,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakGroup, KeycloakGroupDTO } from '@app/admin/admin.model';
import { SimpleTreeNode, DEFAULT_PAGE_SIZE } from '@app/libs';
import { Crumb } from '@app/libs';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { BREADCRUMBS_GROUPS } from '@app/admin/commons/breadcrumbs';

import * as fromAdmin from '@app/admin/reducers';
import * as fromGroup from '@app/admin/actions/groups/group.actions';

@Component({
  selector: 'tgapp-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsContainerComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  searchChange = new Subject<string>();
  pageIndex = 0;
  pageSize = DEFAULT_PAGE_SIZE;
  crumbs: Crumb[] = BREADCRUMBS_GROUPS;
  data$ = this.store.pipe(
    select(fromAdmin.getGroupsTree),
    map(groups => this.convertData(groups))
  );
  showLoadMore$ = this.store.pipe(select(fromAdmin.getGroupsShowLoadMore));
  constructor(
    private store: Store<fromAdmin.State>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new fromGroup.LoadPageAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    );
    this.sub.add(
      this.searchChange
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(search => {
          this.store.dispatch(new fromGroup.SearchAction(search));
        })
    );
  }
  ngOnDestroy(): void {
    if (!this.sub.closed) {
      this.sub.unsubscribe();
    }
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
    this.router.navigate([`${group.id}`], { relativeTo: this.route });
  }
  handleSearch(search: string) {
    this.searchChange.next(search);
  }
  clearSearch() {
    this.store.dispatch(new fromGroup.ClearSearchAction());
  }
  handleAddSibling(group: KeycloakGroup) {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: {
        title: this.translate.instant('tgapp.admin.group-dialog.add.title'),
        payload: null
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1),
        withLatestFrom(this.store.pipe(select(fromAdmin.getGroups)))
      )
      .subscribe(([val, all]) => {
        if (this.isTopNode(group)) {
          this.store.dispatch(new fromGroup.AddTopAction(val));
        } else {
          this.store.dispatch(
            new fromGroup.AddChildAction({
              id: this.getParentId(group.id, all),
              changes: val
            })
          );
        }
      });
  }
  handleAddChild(group: KeycloakGroup) {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: {
        title: this.translate.instant('tgapp.admin.group-dialog.add.title'),
        payload: null
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1)
      )
      .subscribe(val => {
        this.store.dispatch(
          new fromGroup.AddChildAction({
            id: group.id,
            changes: val
          })
        );
      });
  }
  handleLoadMore() {
    this.store.dispatch(new fromGroup.NextPageAction());
  }
  isTopNode(group: KeycloakGroup): boolean {
    return group.path.split('/').filter(val => val).length === 1;
  }
  getParentId(id: string, all: KeycloakGroupDTO[]): string | null {
    const subs = all.filter(sub => sub.subGroups.includes(id));
    return subs.length > 0 ? subs[0].id : null;
  }
}
