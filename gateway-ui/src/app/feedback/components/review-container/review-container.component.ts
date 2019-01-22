import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter, take } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Employee, Feedback } from '@app/feedback/feedback.model';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { Question } from '@app/data-mgmt/data-mgmt.model';

import * as _ from 'lodash';

@Component({
  selector: 'tgapp-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  currentEmployeeIndex = 0;
  currentFilter = 'all';

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
      employeeNo: 'A00003'
    },
    {
      id: 3,
      email: 'zhaoliu@tg.com',
      name: 'Zhao Liu',
      title: 'Project Manager',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg',
      employeeNo: 'A00004'
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
  feedbackToOthers: Partial<Feedback>[] = [
    {
      targetUser: {
        id: 7,
        email: 'wayne@tg.com',
        name: 'Wayne Kang',
        title: 'Deigner',
        gender: true,
        avatar:
          'https://tinyfac.es/data/avatars/AEF44435-B547-4B84-A2AE-887DFAEE6DDF-200w.jpeg',
        employeeNo: 'A00001',
        reportTo: 'zhaoliu@tg.com'
      },
      questionnaireId: 1
    },
    {
      targetUser: {
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
      questionnaireId: 1
    }
  ];
  completedFeedbacks: Partial<Feedback>[] = [
    {
      targetUser: {
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
      questionnaireId: 1
    },
    {
      targetUser: {
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
      questionnaireId: 1
    }
  ];
  declinedFeedbacks = [
    {
      targetUser: {
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
      questionnaireId: 1
    },
    {
      targetUser: {
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
      questionnaireId: 1
    }
  ];
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  public relationToUser(rater: Partial<Employee>): string {
    const relation =
      rater.email === this.items[this.currentEmployeeIndex].reportTo
        ? 'tgapp.feedback.raters.supervisor'
        : rater.reportTo === this.items[this.currentEmployeeIndex].email
        ? 'tgapp.feedback.raters.subordinate'
        : 'tgapp.feedback.raters.colleague';
    return relation;
  }

  changeFilter(filterStr: string) {
    this.currentFilter =
      filterStr === 'supervisor'
        ? 'supervisor'
        : filterStr === 'subordinates'
        ? 'subordinates'
        : filterStr === 'colleagues'
        ? 'colleagues'
        : 'all';
  }

  public get filterTodo() {
    switch (this.currentFilter) {
      case 'supervisor':
        return this.feedbackToOthers.filter(
          f =>
            f.targetUser.email ===
            this.items[this.currentEmployeeIndex].reportTo
        );
      case 'subordinates':
        return this.feedbackToOthers.filter(
          f =>
            f.targetUser.reportTo ===
            this.items[this.currentEmployeeIndex].email
        );
      case 'colleagues':
        return this.feedbackToOthers.filter(
          f =>
            f.targetUser.reportTo !==
              this.items[this.currentEmployeeIndex].email &&
            f.targetUser.email !==
              this.items[this.currentEmployeeIndex].reportTo
        );
      default:
        return this.feedbackToOthers;
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

  undoDecline(feedback) {
    this.declinedFeedbacks = this.declinedFeedbacks.filter(
      f => f.targetUser.email !== feedback.targetUser.email
    );
    this.feedbackToOthers = [...this.feedbackToOthers, feedback];
  }

  declineFeedback(feedback) {
    this.declinedFeedbacks = [...this.declinedFeedbacks, feedback];
    this.feedbackToOthers = this.feedbackToOthers.filter(
      f => f.targetUser.email !== feedback.targetUser.email
    );
  }

  showReviewDialog(feedback: Feedback) {
    this.dialog
      .open(ReviewDialogComponent, { data: { feedback: feedback } })
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1)
      )
      .subscribe((feedbackResult: { question: Question; answer: any }) => {
        console.log('feedbackResult', feedbackResult);
        this.feedbackToOthers = this.feedbackToOthers.filter(
          f => f.targetUser.email !== feedback.targetUser.email
        );
        this.completedFeedbacks = [...this.completedFeedbacks, feedback];
      });
  }
}
