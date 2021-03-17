import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { MatBottomSheetComponent } from './mat-bottom-sheet/mat-bottom-sheet.component';
import { AssignmentSubmissionComponent } from './assignment-submission/assignment-submission.component';
import { ViewCaTestsComponent } from './view-ca-tests/view-ca-tests.component';
import { CaTestDetailComponent } from './ca-test-detail/ca-test-detail.component';
import { ViewScoreDialogComponent } from './view-score-dialog/view-score-dialog.component';
import { CaTestSubmissionComponent } from './ca-test-submission/ca-test-submission.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamSubmissionComponent } from './exam-submission/exam-submission.component';
import { ViewMySubjectsComponent } from './view-my-subjects/view-my-subjects.component';
import { EnrollForSubjectComponent } from './enroll-for-subject/enroll-for-subject.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { ViewNoteDetailComponent } from './view-note-detail/view-note-detail.component';
import { ViewAssignmentListComponent } from './view-assignment-list/view-assignment-list.component';
import { ViewCaTestListComponent } from './view-ca-test-list/view-ca-test-list.component';
import { ViewExamListComponent } from './view-exam-list/view-exam-list.component';
import { PerformanceStatsComponent } from './performance-stats/performance-stats.component';
import { StudentService } from './student.service';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    ViewAssignmentsComponent,
    AssignmentDetailComponent,
    MatBottomSheetComponent,
    AssignmentSubmissionComponent,
    ViewCaTestsComponent,
    CaTestDetailComponent,
    ViewScoreDialogComponent,
    CaTestSubmissionComponent,
    ViewExamsComponent,
    ExamDetailComponent,
    ExamSubmissionComponent,
    ViewMySubjectsComponent,
    EnrollForSubjectComponent,
    ViewNotesComponent,
    ViewNoteDetailComponent,
    ViewAssignmentListComponent,
    ViewCaTestListComponent,
    ViewExamListComponent,
    PerformanceStatsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModuleModule
  ],
  exports: [
    StudentRoutingModule
  ],
  providers: [
    StudentService
  ]
})
export class StudentModuleModule { }
