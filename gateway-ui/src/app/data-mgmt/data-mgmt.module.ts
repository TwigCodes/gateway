import { NgModule } from '@angular/core';

import { DataMgmtRoutingModule } from './data-mgmt-routing.module';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [QuestionsContainerComponent],
  imports: [SharedModule, DataMgmtRoutingModule]
})
export class DataMgmtModule {}
