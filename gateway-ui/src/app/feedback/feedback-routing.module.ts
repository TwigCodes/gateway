import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatersContainerComponent } from './components/raters-container/raters-container.component';
import { ReviewContainerComponent } from './components/review-container/review-container.component';
import { AuditContainerComponent } from './components/audit-container/audit-container.component';

const routes: Routes = [
  {
    path: 'raters',
    component: RatersContainerComponent,
    data: { title: 'tgapp.menu.feedback.raters' }
  },
  {
    path: 'review',
    component: ReviewContainerComponent,
    data: { title: 'tgapp.menu.feedback.review' }
  },
  {
    path: 'audit',
    component: AuditContainerComponent,
    data: { title: 'tgapp.menu.feedback.audit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}
