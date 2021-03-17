import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewAllClassesComponent } from './view-all-classes/view-all-classes.component';
import { AddSchoolClassComponent } from './add-school-class/add-school-class.component';
import { AddSchoolClassBulkComponent } from './add-school-class-bulk/add-school-class-bulk.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ViewAllSubjectsComponent } from './view-all-subjects/view-all-subjects.component';
import { AddSubjectBulkComponent } from './add-subject-bulk/add-subject-bulk.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ViewAllTeachersComponent } from './view-all-teachers/view-all-teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ViewAllStudentsComponent } from './view-all-students/view-all-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddTeacherBulkComponent } from './add-teacher-bulk/add-teacher-bulk.component';
import { AssignTeacherToSubjectComponent } from './assign-teacher-to-subject/assign-teacher-to-subject.component';
import { AssignTeacherToClassComponent } from './assign-teacher-to-class/assign-teacher-to-class.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { UpdateSchoolClassComponent } from './update-school-class/update-school-class.component';
import { AssignClassToTeacherComponent } from './assign-class-to-teacher/assign-class-to-teacher.component';
import { AssignSubjectToTeacherComponent } from './assign-subject-to-teacher/assign-subject-to-teacher.component';
import { AdminService } from './admin.service';
import { AddStudentBulkComponent } from './add-student-bulk/add-student-bulk.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ViewAllClassesComponent,
    AddSchoolClassComponent,
    AddSchoolClassBulkComponent,
    ViewAllSubjectsComponent,
    AddSubjectBulkComponent,
    AddSubjectComponent,
    ViewAllTeachersComponent,
    AddTeacherComponent,
    ViewAllStudentsComponent,
    AddStudentComponent,
    AddTeacherBulkComponent,
    AssignTeacherToSubjectComponent,
    AssignTeacherToClassComponent,
    UpdateTeacherComponent,
    UpdateSubjectComponent,
    UpdateSchoolClassComponent,
    AssignClassToTeacherComponent,
    AssignSubjectToTeacherComponent,
    AddStudentBulkComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    AdminRoutingModule
  ],
  providers: [AdminService]
})
export class AdminModuleModule { }
