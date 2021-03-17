import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from '../default-module/default-component/default-component.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AddVirtualClassComponent } from './add-virtual-class/add-virtual-class.component';
import { ViewVirtualClassesComponent } from './view-virtual-classes/view-virtual-classes.component';
import { UpdateVirtualClassAttendanceComponent } from './update-virtual-class-attendance/update-virtual-class-attendance.component';
import { UpdateVirtualClassComponent } from './update-virtual-class/update-virtual-class.component';
import { ViewVirtualClassAttendanceComponent } from './view-virtual-class-attendance/view-virtual-class-attendance.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { ViewAssigmentsComponent } from './view-assigments/view-assigments.component';
import { ViewAssigmentSubmissionsComponent } from './view-assigment-submissions/view-assigment-submissions.component';
import { UpdateAssignmentComponent } from './update-assignment/update-assignment.component';
import { AssignmentSubmissionDetailComponent } from './assignment-submission-detail/assignment-submission-detail.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ViewOngoingExamsComponent } from './view-ongoing-exams/view-ongoing-exams.component';
import { ViewExamSubmissionsComponent } from './view-exam-submissions/view-exam-submissions.component';
import { ExamSubmissionDetailComponent } from './exam-submission-detail/exam-submission-detail.component';
import { TrackExamParticipantComponent } from './track-exam-participant/track-exam-participant.component';
import { ExamParticipantDetailComponent } from './exam-participant-detail/exam-participant-detail.component';
import { AddCaTestComponent } from './add-ca-test/add-ca-test.component';
import { ViewOngoingTestsComponent } from './view-ongoing-tests/view-ongoing-tests.component';
import { ViewTestsComponent } from './view-tests/view-tests.component';
import { ViewTestSubmissionsComponent } from './view-test-submissions/view-test-submissions.component';
import { TestSubmissionDetailComponent } from './test-submission-detail/test-submission-detail.component';
import { TrackTestParticipantComponent } from './track-test-participant/track-test-participant.component';
import { TestParticipantDetailComponent } from './test-participant-detail/test-participant-detail.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ViewNoteDetailComponent } from './view-note-detail/view-note-detail.component';
import { AddSubjectTopicComponent } from './add-subject-topic/add-subject-topic.component';
import { ViewSubjectTopicsComponent } from './view-subject-topics/view-subject-topics.component';
import { UpdateSubjectTopicComponent } from './update-subject-topic/update-subject-topic.component';

const routes: Routes = [
  { path: "", component: DefaultComponent, children: [
    { path: "", pathMatch: "full", component: TeacherDashboardComponent },
    { path: "virtual-meeting", children: [
      { path: "", pathMatch: "full", component: AddVirtualClassComponent },
      { path: "view-virtual-meetings", component: ViewVirtualClassesComponent },
      { path: "update-virtual-class/:id", component: UpdateVirtualClassComponent },
      { path: "update-virtual-class-attendance/:id", component: UpdateVirtualClassAttendanceComponent },
      { path: "view-virtual-class-attendance/:id", component: ViewVirtualClassAttendanceComponent }
    ]},
    { path: "manage-assignment", children: [
      { path: "", pathMatch: "full", component: AddAssignmentComponent },
      { path: "view-assignments", component: ViewAssigmentsComponent },
      { path: "update-assignment/:id", component: UpdateAssignmentComponent },
      { path: "view-assignment-submissions/:id", component: ViewAssigmentSubmissionsComponent },
      { path: "assigment-submission-detail/:id", component: AssignmentSubmissionDetailComponent }
    ]},
    { path: "manage-exam", children: [
      { path: "", pathMatch: "full", component: AddExamComponent },
      { path: "view-ongoing-exams", component: ViewOngoingExamsComponent },
      { path: "view-exams", component: ViewExamsComponent },
      { path: "view-exam-submissions/:id", component: ViewExamSubmissionsComponent },
      { path: "exam-submission-detail/:id", component: ExamSubmissionDetailComponent },
      /**
       * /track-exam-particpant?examId=4059585&personId=0938484995
       * Use Query paramters to get the needed details from the user
       */
      { path: "track-exam-participant/:id", component: TrackExamParticipantComponent },
      { path: "exam-participant-detail/:id", component: ExamParticipantDetailComponent }
    ]},
    { path: "manage-test", children: [
      { path: "", pathMatch: "full", component: AddCaTestComponent },
      { path: "view-ongoing-tests", component: ViewOngoingTestsComponent },
      { path: "view-tests", component: ViewTestsComponent },
      { path: "view-test-submissions/:id", component: ViewTestSubmissionsComponent },
      { path: "test-submission-detail/:id", component: TestSubmissionDetailComponent },
      { path: "track-test-participant/:id", component: TrackTestParticipantComponent },
      { path: "test-participant-detail/:id", component: TestParticipantDetailComponent }
    ]},
    { path: "manage-note", children: [
      { path: "", pathMatch: "full", component: AddNoteComponent },
      { path: "view-notes", component: ViewNotesComponent },
      { path: "view-note/:id", component: ViewNoteDetailComponent },
      {  path: "update-note/:id", component: UpdateNoteComponent }
    ]},
    {path: "manage-topic", children: [
      { path: "", pathMatch: "full", component: AddSubjectTopicComponent },
      { path: "view-topics", component: ViewSubjectTopicsComponent },
      { path: "update-topic/:id", component: UpdateSubjectTopicComponent }
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
