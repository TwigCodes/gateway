import { NgModule } from '@angular/core';

import { DataMgmtRoutingModule } from './data-mgmt-routing.module';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';
import { SharedModule } from '@app/shared';
import { QuestionDialogComponent } from './components/questions-container/question-dialog.component';

@NgModule({
  declarations: [QuestionsContainerComponent, QuestionDialogComponent],
  imports: [SharedModule, DataMgmtRoutingModule],
  entryComponents: [QuestionDialogComponent]
})
export class DataMgmtModule {}
