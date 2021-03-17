import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/services/origamiGraphql.service';
import { StudentListReMap } from '../../types/internal-types.type';
import { Student_Subject } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-all-students',
  templateUrl: './view-all-students.component.html',
  styleUrls: ['./view-all-students.component.css']
})
export class ViewAllStudentsComponent implements OnInit {
  dataSource: StudentListReMap[] = [];
  displayedColumns: string[] = ['Name', 'Username', 'Class'];
  subjectList$: Observable<Subject[]>;
  subjectSelectionForm: FormGroup;

  constructor(private readonly adminSrv: AdminService) { }

  ngOnInit(): void {
    this.subjectList$ = this.adminSrv.getAllActiveSubjects();
    this.initForm();
  }

  initForm(): void {
    this.subjectSelectionForm = new FormGroup({
        "subject": new FormControl(null, Validators.compose([
                                          Validators.required
                            ]))
    });
  }

  submitForm(): void {
    const { subject } = this.subjectSelectionForm.value;

    if(subject) {
      this.adminSrv
          .getStudentsBySubjectsOffered(subject)
          .subscribe(
            (response: Student_Subject[]) => {
              this.dataSource = response.map((studentSubj: Student_Subject) => {
                const { FirstName, LastName, Username, Id } = studentSubj.Student.Person;
                const { Name } = studentSubj.Student.SchoolClass;
                return {
                  Id,
                  Name: `${FirstName} ${LastName}`,
                  SchoolClass: Name,
                  Username
                };
              });
            },
            (error) => {
              throw error;
            }
          )
    }
  }
}
