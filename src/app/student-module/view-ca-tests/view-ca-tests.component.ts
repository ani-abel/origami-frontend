import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { ViewScoreDialogComponent } from '../view-score-dialog/view-score-dialog.component';
import { Purpose, StudentAssignmentListReMap } from '../../types/internal-types.type';
import { Student_Subject } from '../../services/origamiGraphql.service';
import { StudentService } from '../student.service';
import { Subject_Ca } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-ca-tests',
  templateUrl: './view-ca-tests.component.html',
  styleUrls: ['./view-ca-tests.component.css']
})
export class ViewCaTestsComponent implements
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
  viewCATestForm: FormGroup;
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
    this.viewCATestForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      filter: new FormControl(this.filterList[0], Validators.required)
    });
  }

  openDialog(caTestId: string, score: number): void {
    const currentFilter: string = this.viewCATestForm.get("filter").value;
    if(currentFilter === this.filterList[1]) {
      this.dialog.open(ViewScoreDialogComponent, {
        data: {
          assignmentId: caTestId,
          totalExpectedScore: 30,
          score,
          purpose: Purpose.CA_TEST
        }
      });
    }
  }

  submitForm(): void {
    if(this.viewCATestForm.invalid) {
      return;
    }

    const { subject, filter } = this.viewCATestForm.value;

    switch(filter) {
      case this.filterList[1]:
        //Done
        const getDoneCATests: Subscription =
        this.studentSrv
            .getDoneCATestsBySubject(subject)
            .subscribe(
              (response: Subject_Ca[]) => this.mapDownCATest(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
          this.subscriptionList.push(getDoneCATests);
        break;
      case this.filterList[2]:
        //Undone
        const getUnDoneCATests: Subscription =
        this.studentSrv
            .getUndoneCATestsBySubject(subject)
            .subscribe(
              (response: Subject_Ca[]) => this.mapDownCATest(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
            this.subscriptionList.push(getUnDoneCATests);
        break;
        case this.filterList[0]:
        default:
          //All
          const getAllCATests: Subscription =
          this.studentSrv
            .getCATestsBySubject(subject)
            .subscribe(
              (response: Subject_Ca[]) => this.mapDownCATest(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
            this.subscriptionList.push(getAllCATests);
          break;
    }
  }

  mapDownCATest(payload: Subject_Ca[]): void {
    if(payload) {
      this.dataSource = payload.map((exam: Subject_Ca, index: number) => {
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
