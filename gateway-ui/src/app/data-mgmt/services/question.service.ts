import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseLeanCloudService } from '@app/libs';
import { Question } from '../data-mgmt.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseLeanCloudService<Question> {
  protected entityPath = 'questions';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
