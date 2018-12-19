import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatPaginatorIntl } from '@angular/material';
import { SharedModule } from '@app/shared';
import { CustomMatPaginatorIntl } from '@app/core/mat-helpers/mat-paginator-intl-cn';

import { RatersContainerComponent } from './components/raters-container/raters-container.component';
import { RaterDialogComponent } from './components/rater-dialog/rater-dialog.component';
import { ReviewContainerComponent } from './components/review-container/review-container.component';
import { ReviewItemComponent } from './components/review-item/review-item.component';
import { AuditContainerComponent } from './components/audit-container/audit-container.component';

import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackEffects } from './feedback.effects';
import * as fromFeedback from './feedback.reducer';

@NgModule({
  declarations: [
    RatersContainerComponent,
    RaterDialogComponent,
    ReviewContainerComponent,
    ReviewItemComponent,
    AuditContainerComponent,
    ReviewDialogComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  imports: [
    SharedModule,
    FeedbackRoutingModule,
    StoreModule.forFeature('feedback', fromFeedback.reducer),
    EffectsModule.forFeature([FeedbackEffects])
  ],
  entryComponents: [RaterDialogComponent, ReviewDialogComponent]
})
export class FeedbackModule {}
