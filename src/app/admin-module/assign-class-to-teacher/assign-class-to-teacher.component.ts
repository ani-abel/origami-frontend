import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AdminService } from '../admin.service';
import { OrigamiRole } from 'src/app/services/origamiGraphql.service';
import { Person } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-assign-class-to-teacher',
  templateUrl: './assign-class-to-teacher.component.html',
  styleUrls: ['./assign-class-to-teacher.component.css']
})
export class AssignClassToTeacherComponent implements OnInit {
  @ViewChild("teachers", { read: ElementRef }) teacherList: ElementRef;
  teacherList$: Observable<Person[]>;
  classId: string;

  constructor(
    private adminSrv: AdminService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.teacherList$ = this.adminSrv.getUserListByRole(OrigamiRole.Teacher);

    //Extract the class Id from URL
    this.activatedRoute.params
        .pipe(
          map(res => res.id)
        )
        .subscribe((res: string) => {
          this.classId = res;
        });
  }

  assignTeacherToClass(teacherId: string): void {
    if(this.classId && teacherId) {
      this.adminSrv.assignTeacherToClass(this.classId, teacherId);
    }
  }

}
