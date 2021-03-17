import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddVirtualClassComponent } from './add-virtual-class/add-virtual-class.component';
import { ViewVirtualClassesComponent } from './view-virtual-classes/view-virtual-classes.component';
import { ViewVirtualClassAttendanceComponent } from './view-virtual-class-attendance/view-virtual-class-attendance.component';
import { UpdateVirtualClassAttendanceComponent } from './update-virtual-class-attendance/update-virtual-class-attendance.component';
import { UpdateVirtualClassComponent } from './update-virtual-class/update-virtual-class.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { ViewAssigmentsComponent } from './view-assigments/view-assigments.component';
import { ViewAssigmentSubmissionsComponent } from './view-assigment-submissions/view-assigment-submissions.component';
import { UpdateAssignmentComponent } from './update-assignment/update-assignment.component';
import { GradeSubmissionComponent } from './grade-submission/grade-submission.component';
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
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherService } from './teacher.service';
import { AddNoteComponent } from './add-note/add-note.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ViewNoteDetailComponent } from './view-note-detail/view-note-detail.component';
import { UpdateGradeSubmissionComponent } from './update-grade-submission/update-grade-submission.component';
import { AddSubjectTopicComponent } from './add-subject-topic/add-subject-topic.component';
import { ViewSubjectTopicsComponent } from './view-subject-topics/view-subject-topics.component';
import { UpdateSubjectTopicComponent } from './update-subject-topic/update-subject-topic.component';

@NgModule({
  declarations: [
    AddVirtualClassComponent,
    ViewVirtualClassesComponent,
    ViewVirtualClassAttendanceComponent,
    UpdateVirtualClassAttendanceComponent,
    UpdateVirtualClassComponent,
    AddAssignmentComponent,
    ViewAssigmentsComponent,
    ViewAssigmentSubmissionsComponent,
    UpdateAssignmentComponent,
    GradeSubmissionComponent,
    AssignmentSubmissionDetailComponent,
    AddExamComponent,
    ViewExamsComponent,
    ViewOngoingExamsComponent,
    ViewExamSubmissionsComponent,
    ExamSubmissionDetailComponent,
    TrackExamParticipantComponent,
    ExamParticipantDetailComponent,
    AddCaTestComponent,
    ViewOngoingTestsComponent,
    ViewTestsComponent,
    ViewTestSubmissionsComponent,
    TestSubmissionDetailComponent,
    TrackTestParticipantComponent,
    TestParticipantDetailComponent,
    TeacherDashboardComponent,
    AddNoteComponent,
    ViewNotesComponent,
    UpdateNoteComponent,
    ViewNoteDetailComponent,
    UpdateGradeSubmissionComponent,
    AddSubjectTopicComponent,
    ViewSubjectTopicsComponent,
    UpdateSubjectTopicComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModuleModule
  ],
  providers: [TeacherService]
})
export class TeacherModuleModule { }
