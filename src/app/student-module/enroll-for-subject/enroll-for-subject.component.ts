import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Observable } from "rxjs";
import { StudentService } from '../student.service';
import { Subject } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-enroll-for-subject',
  templateUrl: './enroll-for-subject.component.html',
  styleUrls: ['./enroll-for-subject.component.css']
})
export class EnrollForSubjectComponent implements OnInit {
  selectedOptions: string[];
  subjectList$: Observable<Subject[]>;

  constructor(private readonly studentSrv: StudentService) { }

  ngOnInit(): void {
    this.subjectList$ = this.studentSrv.getSubjectListStudentShouldEnrollFor();
  }

  onGroupsChange(options: MatListOption[]): void {
    // map these MatListOptions to their values
    this.selectedOptions = options.map(o => o.value);
  }

  submitForm(): void {
    if(this.selectedOptions?.length < 1) {
      return;
    }

    this.studentSrv.enrollStudentForSubjects(this.selectedOptions);
  }

}
