import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AdminService } from '../admin.service';
import { Subject } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-assign-teacher-to-subject',
  templateUrl: './assign-teacher-to-subject.component.html',
  styleUrls: ['./assign-teacher-to-subject.component.css']
})
export class AssignTeacherToSubjectComponent implements OnInit {
  selectedOptions: string[];
  subjectList$: Observable<Subject[]>;
  teacherId: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly adminSrv: AdminService
  ) { }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.selectedOptions = options.map(o => o.value);
  }

  ngOnInit(): void {
    this.subjectList$ = this.adminSrv.getAllActiveSubjects();

    //retrieve the teacherId
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (response: string) => {
            this.teacherId = response;
          },
          (error) => {
            console.error(error);
            this.router.navigate(["/admin", "manage-teachers"]);
          }
        );
  }

  submitForm(): void {
    if(this.selectedOptions?.length < 1) {
      return;
    }

    this.adminSrv.assignSubjectListToTeacher(this.teacherId, this.selectedOptions);
    this.selectedOptions = [];
  }

}
