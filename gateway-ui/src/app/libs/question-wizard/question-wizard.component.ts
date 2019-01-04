import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Question } from './question.model';

@Component({
  selector: 'ngx-question-wizard',
  templateUrl: './question-wizard.component.html',
  styleUrls: ['./question-wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionWizardComponent implements OnInit {
  @Input() questions: Question[];
  @Output() answer = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({ items: this.fb.array([]) });
    this.initItems();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const answers = this.form.value.items;

    const result = this.questions.map((question, index) => ({
      question: question,
      answer: answers[index]
    }));
    this.answer.emit(result);
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
