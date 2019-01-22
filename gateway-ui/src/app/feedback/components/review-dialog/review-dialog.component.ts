import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Employee, Feedback } from '@app/feedback/feedback.model';
import { QuestionService } from '@app/data-mgmt/services';
import { Question } from '@app/data-mgmt/data-mgmt.model';

@Component({
  selector: 'tgapp-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  ratee: Partial<Employee>;
  questions$: Observable<Question[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { feedback: Feedback },
    private service: QuestionService,
    private dialogRef: MatDialogRef<ReviewDialogComponent>
  ) {}

  ngOnInit() {
    this.ratee = this.data.feedback.targetUser;
    this.questions$ = this.service.getAll();
  }

  handleAnswer(ev) {
    console.log(ev);
  }
}
