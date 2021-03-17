import { AdminService } from '../admin.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { School_Class } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-assign-teacher-to-class',
  templateUrl: './assign-teacher-to-class.component.html',
  styleUrls: ['./assign-teacher-to-class.component.css']
})
export class AssignTeacherToClassComponent implements OnInit {
  @ViewChild("classes", { read: ElementRef }) classList: ElementRef;
  classList$: Observable<School_Class[]>;
  teacherId: string;

  constructor(
    private adminSrv: AdminService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.classList$ = this.adminSrv.getActiveClassesForSL();
    //Extract the class Id from URL
    this.activatedRoute.params
        .pipe(
          map(res => res.id)
        )
        .subscribe((res: string) => {
          this.teacherId = res;
        });
  }

  assignClassToTeacher(classId: string): void {
    if(classId && this.teacherId) {
      this.adminSrv.assignTeacherToClass(classId, this.teacherId);
    }
  }

}
