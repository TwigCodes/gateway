import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@app/shared';

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

  imports: [
    SharedModule,
    FeedbackRoutingModule,
    StoreModule.forFeature('feedback', fromFeedback.reducer),
    EffectsModule.forFeature([FeedbackEffects])
  ],
  entryComponents: [RaterDialogComponent, ReviewDialogComponent]
})
export class FeedbackModule {}
