import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';

const routes: Routes = [
  {
    path: 'data-mgmt',
    children: [
      {
        path: 'questions',
        component: QuestionsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataMgmtRoutingModule {}
