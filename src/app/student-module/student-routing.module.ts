import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from '../default-module/default-component/default-component.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { ViewCaTestsComponent } from './view-ca-tests/view-ca-tests.component';
import { CaTestDetailComponent } from './ca-test-detail/ca-test-detail.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ExamDetailComponent } from "./exam-detail/exam-detail.component";
import { ViewMySubjectsComponent } from './view-my-subjects/view-my-subjects.component';
import { EnrollForSubjectComponent } from './enroll-for-subject/enroll-for-subject.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { ViewNoteDetailComponent } from './view-note-detail/view-note-detail.component';
import { ViewAssignmentListComponent } from './view-assignment-list/view-assignment-list.component';
import { ViewCaTestListComponent } from './view-ca-test-list/view-ca-test-list.component';
import { ViewExamListComponent } from './view-exam-list/view-exam-list.component';
import { PerformanceStatsComponent } from './performance-stats/performance-stats.component';

const routes: Routes = [
 //Routes for Student-section
  { path: "", component: DefaultComponent, children: [
    { path: "", pathMatch: "full", component: StudentDashboardComponent },
    { path: "assignment", children: [
      { path: "", component: ViewAssignmentsComponent },
      { path: "assignment-detail/:id", component: AssignmentDetailComponent }
    ]},
    { path: "ca-test", children: [
      { path: "", component: ViewCaTestsComponent, pathMatch: "full" },
      { path: "test-detail/:id", component: CaTestDetailComponent }
    ]},
    { path: "exam", children: [
      { path: "", component: ViewExamsComponent, pathMatch: "full" },
      { path: "exam-detail/:id", component: ExamDetailComponent }
    ]},
    { path: "subject", children: [
      { path: "", component: ViewMySubjectsComponent, pathMatch: "full" },
      { path: "view-assignments/:id", component: ViewAssignmentListComponent },
      { path: "view-assignment-detail/:id", component: AssignmentDetailComponent },
      { path: "view-ca-test/:id", component: ViewCaTestListComponent },
      { path: "view-ca-test-detail/:id", component: CaTestDetailComponent },
      { path: "view-exam/:id", component: ViewExamListComponent },
      { path: "view-exam-detail/:id", component: ExamDetailComponent },
      { path: "performance/:id", component: PerformanceStatsComponent },
      { path: "enroll-for-subject", component: EnrollForSubjectComponent }
    ]},
    { path: "note", children: [
      { path: "", component: ViewNotesComponent },
      { path: "view-note-detail/:id", component: ViewNoteDetailComponent }
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
