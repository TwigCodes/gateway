import { Component, OnInit, Inject } from '@angular/core';
import { Question, Employee, Feedback } from '@app/feedback/feedback.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'tgapp-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  ratee: Partial<Employee>;
  questions: Question[] = [
    {
      id: 1,
      questionnaireId: 1,
      title:
        '您觉得被评价的员工是否认同并捍卫公司核心价值观，并主动影响他人，能把组织利益置于个人利益之上，请举例说明',
      type: 'text',
      displayOrder: 1
    },
    {
      id: 2,
      questionnaireId: 1,
      title: '您对被评价员工的印象关键词有哪些，请选择',
      options: [
        { label: '有效决断', value: '1' },
        { label: '及时督导', value: '1' },
        { label: '客户导向', value: '1' },
        { label: '求同存异', value: '1' },
        { label: '优柔寡断', value: '-1' },
        { label: '不负责任', value: '-1' },
        { label: '自我导向', value: '-1' },
        { label: '独断专行', value: '-1' }
      ],
      type: 'tags',
      displayOrder: 3
    },
    {
      id: 3,
      questionnaireId: 1,
      title:
        '在职业操守与自省意识方面，您认为被评价员工是否能主动进行自我批判，深入分析原因，不断改进，请举例说明',
      type: 'text',
      displayOrder: 2
    },
    {
      id: 4,
      questionnaireId: 1,
      title: '您对被评价员工的印象关键词有哪些，请选择',
      options: [
        { label: '有效决断', value: '1' },
        { label: '及时督导', value: '1' },
        { label: '客户导向', value: '1' },
        { label: '求同存异', value: '1' },
        { label: '优柔寡断', value: '-1' },
        { label: '不负责任', value: '-1' },
        { label: '自我导向', value: '-1' },
        { label: '独断专行', value: '-1' }
      ],
      type: 'checkbox',
      displayOrder: 5
    }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      feedback: Feedback;
    },
    private dialogRef: MatDialogRef<ReviewDialogComponent>
  ) {
    this.ratee = this.data.feedback.targetUser;
  }

  ngOnInit() {}

  handleAnswer(ev) {
    console.log(ev);
  }
}
