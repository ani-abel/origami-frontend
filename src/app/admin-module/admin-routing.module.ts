import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from '../default-module/default-component/default-component.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewAllClassesComponent } from './view-all-classes/view-all-classes.component';
import { AddSchoolClassComponent } from './add-school-class/add-school-class.component';
import { AddSchoolClassBulkComponent } from './add-school-class-bulk/add-school-class-bulk.component';
import { ViewAllSubjectsComponent } from './view-all-subjects/view-all-subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddSubjectBulkComponent } from './add-subject-bulk/add-subject-bulk.component';
import { ViewAllTeachersComponent } from './view-all-teachers/view-all-teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AddTeacherBulkComponent } from './add-teacher-bulk/add-teacher-bulk.component';
import { AssignTeacherToSubjectComponent } from './assign-teacher-to-subject/assign-teacher-to-subject.component';
import { AssignTeacherToClassComponent } from './assign-teacher-to-class/assign-teacher-to-class.component';
import { ViewAllStudentsComponent } from './view-all-students/view-all-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { UpdateSchoolClassComponent } from './update-school-class/update-school-class.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { AssignSubjectToTeacherComponent } from './assign-subject-to-teacher/assign-subject-to-teacher.component';
import { AssignClassToTeacherComponent } from './assign-class-to-teacher/assign-class-to-teacher.component';
import { AddStudentBulkComponent } from './add-student-bulk/add-student-bulk.component';

const routes: Routes = [
  { path: "", component: DefaultComponent, children: [
    { path: "", pathMatch: "full", component: AdminDashboardComponent },
    { path: "school-class", children: [
      { path: "", pathMatch: "full", component: ViewAllClassesComponent },
      { path: "add-class", component: AddSchoolClassComponent },
      { path: "add-class-bulk", component: AddSchoolClassBulkComponent },
      { path: "update-class/:id", component: UpdateSchoolClassComponent },
      { path: "assign-teacher-to-class/:id", component: AssignClassToTeacherComponent }
    ]},
    { path: "subject", children: [
      { path: "", pathMatch: "full", component: ViewAllSubjectsComponent },
      { path: "add-subject", component: AddSubjectComponent },
      { path: "add-subject-bulk", component: AddSubjectBulkComponent },
      { path: "update-subject/:id", component: UpdateSubjectComponent },
      // { path: "assign-teacher-to-subject/:id", component: AssignSubjectToTeacherComponent }
    ]},
    { path: "manage-teachers", children: [
      { path: "", pathMatch: "full", component: ViewAllTeachersComponent },
      { path: "add-teacher", component: AddTeacherComponent },
      { path: "add-teacher-bulk", component: AddTeacherBulkComponent },
      { path: "update-teacher/:id", component: UpdateTeacherComponent },
      { path: "assign-teacher-to-subject/:id", component: AssignTeacherToSubjectComponent },
      { path: "assign-teacher-to-class/:id", component: AssignTeacherToClassComponent }
    ]},
    { path: "manage-students", children: [
      { path: "", redirectTo: "view-all-students", pathMatch: "full" },
      { path: "view-all-students", component: ViewAllStudentsComponent },
      { path: "add-student", component: AddStudentComponent },
      { path: "add-student-bulk", component: AddStudentBulkComponent }
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
