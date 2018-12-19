import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '@app/feedback/feedback.model';
import { namePattern, emailPattern } from '@app/core/util/regex.util';
import { loadAvatars } from '@app/core/util/icon.util';

@Component({
  selector: 'tgkpi-rater-dialog',
  templateUrl: './rater-dialog.component.html',
  styleUrls: ['./rater-dialog.component.scss']
})
export class RaterDialogComponent implements OnInit {
  isAdd = true;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      rater: Partial<Employee>;
    },
    private dialogRef: MatDialogRef<RaterDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isAdd = this.data.rater.id === undefined;
    const rater = this.data.rater;
    this.form = this.fb.group({
      name: [
        rater.name ? rater.name : '',
        [Validators.required, Validators.pattern(namePattern)]
      ],
      email: [
        rater.email ? rater.email : '',
        [Validators.required, Validators.pattern(emailPattern)]
      ],
      gender: [rater.gender ? rater.gender : false]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const avatars: string[] = loadAvatars();
    const randomIdx = Math.floor(Math.random() * avatars.length);
    const rater: Partial<Employee> = {
      ...this.form.value,
      avatar: avatars[randomIdx]
    };
    this.dialogRef.close(rater);
  }
}
