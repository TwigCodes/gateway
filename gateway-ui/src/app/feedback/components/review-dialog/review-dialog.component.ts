import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Question, Employee, Feedback } from '@app/feedback/feedback.model';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipSelectionChange,
  MatChipListChange
} from '@angular/material';

@Component({
  selector: 'tgapp-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  form: FormGroup;
  ratee: Partial<Employee>;
  questions: Question[] = [
    {
      id: 1,
      questionnaireId: 1,
      question:
        '您觉得被评价的员工是否认同并捍卫公司核心价值观，并主动影响他人，能把组织利益置于个人利益之上，请举例说明',
      type: 'text',
      displayOrder: 1
    },
    {
      id: 2,
      questionnaireId: 1,
      question: '您对被评价员工的印象关键词有哪些，请选择',
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
      type: 'tag',
      displayOrder: 3
    },
    {
      id: 3,
      questionnaireId: 1,
      question:
        '在职业操守与自省意识方面，您认为被评价员工是否能主动进行自我批判，深入分析原因，不断改进，请举例说明',
      type: 'text',
      displayOrder: 2
    },
    {
      id: 4,
      questionnaireId: 1,
      question: '您对被评价员工的印象关键词有哪些，请选择',
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
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      feedback: Feedback;
    },
    private dialogRef: MatDialogRef<ReviewDialogComponent>
  ) {
    this.ratee = this.data.feedback.targetUser;
  }

  ngOnInit() {
    this.form = this.fb.group({ items: this.fb.array([]) });
    this.initItems();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const answers = this.form.value.items;

    const feedbackResult = this.questions.map((question, index) => ({
      question: question,
      answer: answers[index]
    }));
    this.dialogRef.close(feedbackResult);
  }

  get formItems(): FormArray {
    return <FormArray>this.form.get('items');
  }

  remove(index: number) {
    (<FormArray>this.form.controls['items']).removeAt(index);
  }

  addItem(): void {
    (<FormArray>this.form.controls['items']).push(this.createItem());
  }

  private createItem() {
    return this.fb.group({
      answer: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(1000)
        ]
      ]
    });
  }

  initItems() {
    return this.questions.forEach(_ => this.addItem());
  }
}
