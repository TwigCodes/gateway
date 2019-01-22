import { AppState } from '@app/core';

export interface AuditVM {
  id: number;
  auditedBy?: Partial<Employee>;
  auditedAt?: Date;
  reviewInvitation: ReviewInvitationVM;
}

export interface ReviewInvitationVM {
  id: number;
  reviewee: Partial<Employee>;
  reviewers: Partial<Employee>[];
}

export interface Audit {
  id: number;
  reviewInvitationId: number;
  auditedBy: string;
  auditedAt: Date;
}

export interface ReviewInvitation {
  id: number;
  reviewee: string;
  reviewerIds: string[];
}

export interface Result {
  questionnaireId: number;
  questionId: number;
  projectId: number;
  result: string;
  reviewerId: number;
  revieweeId: number;
}

export interface Feedback {
  targetUser: Employee;
  questionnaireId: number;
}

export interface Questionnaire {
  id: number;
  projectId: number;
  questionIds: number[];
}

export interface Employee {
  id?: number;
  name: string;
  email: string;
  employeeNo?: string;
  gender: boolean;
  avatar: string;
  title: string;
  reportTo?: string;
}

export interface FeedbackState {}

export interface State extends AppState {
  feedback: FeedbackState;
}
