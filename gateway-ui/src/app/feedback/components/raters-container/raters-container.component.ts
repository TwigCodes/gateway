import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@app/feedback/feedback.model';
import { NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { take, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { RaterDialogComponent } from '../rater-dialog/rater-dialog.component';
import { getRelation } from '@app/feedback/feedback.util';

@Component({
  selector: 'tgapp-raters-container',
  templateUrl: './raters-container.component.html',
  styleUrls: ['./raters-container.component.scss']
})
export class RatersContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  items: Array<Partial<Employee>> = [
    {
      id: 0,
      email: 'zhangsan@tg.com',
      name: 'Zhang San',
      title: 'Project Manager',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg',
      employeeNo: 'A00001',
      reportTo: 'wangwu@tg.com'
    },
    {
      id: 1,
      email: 'lisi@tg.com',
      name: 'Li Si',
      title: 'Engineer',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/E0B4CAB3-F491-4322-BEF2-208B46748D4A-200w.jpeg',
      employeeNo: 'A00002',
      reportTo: 'zhangsan@tg.com'
    },
    {
      id: 2,
      email: 'wangwu@tg.com',
      name: 'Wang Wu',
      title: 'Project Director',
      gender: false,
      avatar:
        'https://tinyfac.es/data/avatars/B3CF5288-34B0-4A5E-9877-5965522529D6-200w.jpeg',
      employeeNo: 'A00003',
      reportTo: 'zhaoliu@tg.com'
    },
    {
      id: 3,
      email: 'zhaoliu@tg.com',
      name: 'Zhao Liu',
      title: 'Project Manager',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg',
      employeeNo: 'A00004',
      reportTo: 'zhaoliu@tg.com'
    },
    {
      id: 4,
      email: 'david@tg.com',
      name: 'David Tian',
      title: 'Engineer',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
      employeeNo: 'A00005',
      reportTo: 'zhaoliu@tg.com'
    },
    {
      id: 5,
      email: 'michael@tg.com',
      name: 'Michael Sang',
      title: 'Sales',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
      employeeNo: 'A00006',
      reportTo: 'wangwu@tg.com'
    },
    {
      id: 6,
      email: 'liming@tg.com',
      name: 'Li Ming',
      title: 'UI Designer',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/344CFC24-61FB-426C-B3D1-CAD5BCBD3209-200w.jpeg',
      employeeNo: 'A00007',
      reportTo: 'zhangsan@tg.com'
    },
    {
      id: 7,
      email: 'wayne@tg.com',
      name: 'Wayne Kang',
      title: 'Deigner',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/AEF44435-B547-4B84-A2AE-887DFAEE6DDF-200w.jpeg',
      employeeNo: 'A00001',
      reportTo: 'zhaoliu@tg.com'
    }
  ];
  currentEmployeeIndex = 0;
  selectedRaters: Partial<Employee>[] = [];
  constructor(
    private readonly notificationService: NotificationService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedRaters = [...this.supervisor, ...this.subordinates];
  }

  selectRater(rater: Partial<Employee>) {
    if (
      this.selectedRaters.findIndex(item => item.email === rater.email) > -1
    ) {
      this.translateService
        .get('tgapp.feedback.raters.notification.existed')
        .pipe(take(1))
        .subscribe(title => {
          this.notificationService.error(title);
        });
    } else {
      this.selectedRaters = [...this.selectedRaters, rater];
    }
  }

  public get supervisor(): Partial<Employee>[] {
    return this.items.filter(
      item => item.email === this.items[this.currentEmployeeIndex].reportTo
    );
  }

  public get subordinates(): Partial<Employee>[] {
    return this.items.filter(
      item => item.reportTo === this.items[this.currentEmployeeIndex].email
    );
  }

  public relationToUser(rater: Partial<Employee>): string {
    const relation =
      rater.email === this.items[this.currentEmployeeIndex].reportTo
        ? 'tgapp.feedback.raters.supervisor'
        : rater.reportTo === this.items[this.currentEmployeeIndex].email
        ? 'tgapp.feedback.raters.subordinate'
        : 'tgapp.feedback.raters.colleague';
    return relation;
  }

  public isSupervisorOrSubordinates(rater: Partial<Employee>) {
    return (
      rater.email === this.items[this.currentEmployeeIndex].reportTo ||
      rater.reportTo === this.items[this.currentEmployeeIndex].email
    );
  }

  completeRaterSelection() {
    this.router.navigate(['feedback/review']);
  }

  public addExternalRater(email) {
    this.dialog
      .open(RaterDialogComponent, { data: { rater: { email: email } } })
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1)
      )
      .subscribe((rater: Partial<Employee>) => {
        this.selectedRaters = [...this.selectedRaters, rater];
      });
  }
}
