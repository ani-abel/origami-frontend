import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { StudentService } from '../student.service';
import { Student_Subject } from '../../services/origamiGraphql.service';
import { Subject_Note } from '../../services/origamiGraphql.service';
import { SubjectNoteReMap } from '../../types/internal-types.type';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements
OnInit,
OnDestroy {
  viewNoteForm: FormGroup;
  subjectList$: Observable<Student_Subject[]>;
  subscriptionList: Subscription[] = [];
  dataSource: SubjectNoteReMap[] = [];
  displayedColumns: string[] = [
    "S/N",
    "Subject",
    "DateCreated",
    "Actions"
  ];

  constructor(private readonly studentSrv: StudentService) { }

  ngOnInit(): void {
    this.initForm();
    this.subjectList$ = this.studentSrv.getStudentSubjectsForSL();
  }

  initForm(): void {
    this.viewNoteForm = new FormGroup({
      subject: new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.viewNoteForm.invalid) {
      return;
    }

    const { subject } = this.viewNoteForm.value;
    const getNotes: Subscription =
    this.studentSrv
        .getNotesForStudent(subject)
        .subscribe(
          (response: Subject_Note[]) => {
            this.dataSource = response.map((subjectNote: Subject_Note, index: number) => {
              const { DateCreated, Id, Subject } = subjectNote;
              return {
                Id,
                SerialNumber: index + 1,
                DateCreated,
                Subject: Subject.Name
              }
            });
          },
          (error) => {
            throw error;
          }
        );
    this.subscriptionList.push(getNotes);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
