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
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  Subscription
} from 'rxjs';
import { ViewScoreDialogComponent } from '../view-score-dialog/view-score-dialog.component';
import {
  Purpose,
  StudentAssignmentListReMap
} from '../../types/internal-types.type';
import { StudentService } from '../student.service';
import { Student_Subject, Subject_Exam } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = [
    "S/N",
    "Subject",
    "CreatedBy",
    "DateCreated",
    "Actions"
  ];
  dataSource: StudentAssignmentListReMap[] = [];;
  subjectList$: Observable<Student_Subject[]>;
  viewExamForm: FormGroup;
  filterList: string[] = [
    "All",
    "Done",
    "Undone"
  ];
  subscriptionList: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly studentSrv: StudentService
  ) {}

  ngOnInit(): void {
    this.subjectList$ = this.studentSrv.getStudentSubjectsForSL();
    this.initForm();
  }

  initForm(): void {
    this.viewExamForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      filter: new FormControl(this.filterList[0], Validators.required)
    });
  }

  openDialog(examId: string, score: number): void {
    const currentFilter: string = this.viewExamForm.get("filter").value;
    if(currentFilter === this.filterList[1]) {
      this.dialog.open(ViewScoreDialogComponent, {
        data: {
          assignmentId: examId,
          totalExpectedScore: 30,
          score,
          purpose: Purpose.EXAM
        }
      });
    }
  }

  submitForm(): void {
    if(this.viewExamForm.invalid) {
      return;
    }

    const { subject, filter } = this.viewExamForm.value;

    switch(filter) {
      case this.filterList[1]:
        //Done
        const getDoneExams: Subscription =
        this.studentSrv
            .getStudentDoneExamsBySubjectId(subject)
            .subscribe(
              (response: Subject_Exam[]) => this.mapDownExam(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
          this.subscriptionList.push(getDoneExams);
        break;
      case this.filterList[2]:
        //Undone
        const getUnDoneExams: Subscription =
        this.studentSrv
            .getStudentUndoneExamsBySubjectId(subject)
            .subscribe(
              (response: Subject_Exam[]) => this.mapDownExam(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
            this.subscriptionList.push(getUnDoneExams);
        break;
        case this.filterList[0]:
        default:
          //All
          const getAllExams: Subscription =
          this.studentSrv
            .getStudentExamsBySubjectId(subject)
            .subscribe(
              (response: Subject_Exam[]) => this.mapDownExam(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
            this.subscriptionList.push(getAllExams);
          break;
    }

  }

  mapDownExam(payload: Subject_Exam[]): void {
    if(payload) {
      this.dataSource = payload.map((exam: Subject_Exam, index: number) => {
        const {
          Id,
          DateCreated,
          Subject,
          Person,
          TotalExpectedScore
        } = exam;

        return {
          Id,
          CreatedBy: `${Person.FirstName} ${Person.LastName}`,
          SerialNumber: index + 1,
          Subject: Subject.Name,
          TotalExpectedScore,
          DateCreated
        };
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
