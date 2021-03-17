import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { ViewScoreDialogComponent } from '../view-score-dialog/view-score-dialog.component';
import {
  Purpose,
  StudentAssignmentListReMap
} from 'src/app/types/internal-types.type';
import { StudentService } from '../student.service';
import {
  Student_Subject,
  Subject_Assignment
} from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements
OnInit,
OnDestroy {
  subscriptionList: Subscription[] = [];
  displayedColumns: string[] = [
    "S/N",
    "Subject",
    "CreatedBy",
    "DateCreated",
    "Actions"
  ];
  dataSource: StudentAssignmentListReMap[] = [];
  filterList: string[] = [
    "All",
    "Done",
    "Undone",
    "Latest"
  ];
  viewAssignmentForm: FormGroup;
  subjectList$: Observable<Student_Subject[]>;

  constructor(
    public dialog: MatDialog,
    private readonly studentSrv: StudentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subjectList$ = this.studentSrv.getStudentSubjectsForSL();
  }

  openDialog(assignmentId: string, totalExpectedScore: number): void {
    const currentFilter: string = this.viewAssignmentForm.get("filter").value;
    if(currentFilter === this.filterList[1]) {
      this.dialog.open(ViewScoreDialogComponent, {
        data: {
          assignmentId: assignmentId,
          totalExpectedScore,
          purpose: Purpose.ASSIGNMENT
        }
      });
    }
  }

  initForm(): void {
    this.viewAssignmentForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      filter: new FormControl(this.filterList[0], Validators.required)
    });
  }

  mapDownAssignment(payload: Subject_Assignment[]): void {
    if(payload) {
      this.dataSource = payload.map((assignment: Subject_Assignment, index: number) => {
        const {
          Id,
          DateCreated,
          Subject,
          Person,
          TotalExpectedScore
        } = assignment;

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

  submitForm(): void {
    if(this.viewAssignmentForm.invalid) {
      return;
    }
    const { subject, filter } = this.viewAssignmentForm.value;

    switch(filter) {
      case this.filterList[1]:
        //Done
        const getDoneAssignments: Subscription =
        this.studentSrv
            .getAssignmentDoneByStudent(subject)
            .subscribe(
              (response: Subject_Assignment[]) => this.mapDownAssignment(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
          this.subscriptionList.push(getDoneAssignments);
        break;
      case this.filterList[2]:
        //Undone
        const getUndoneAssignments: Subscription =
        this.studentSrv
            .getAssignmentUndoneByStudent(subject)
            .subscribe(
              (response: Subject_Assignment[]) => this.mapDownAssignment(response),
              (error) => {
                this.dataSource = [];
                throw error;
              }
            );
            this.subscriptionList.push(getUndoneAssignments);
        break;
      case this.filterList[3]:
        const getLatestAssignments: Subscription =
        //Latest
        this.studentSrv
        .getAllStudentAssignmentsPerSubjectOrderedByLatest(subject)
        .subscribe(
          (response: Subject_Assignment[]) => this.mapDownAssignment(response),
          (error) => {
            this.dataSource = [];
            throw error;
          }
        );
        this.subscriptionList.push(getLatestAssignments);
        break;
      case this.filterList[0]:
      default:
        //All
        const getAllAssignments: Subscription =
        this.studentSrv
        .getAllStudentAssignmentsPerSubject(subject)
        .subscribe(
          (response: Subject_Assignment[]) => this.mapDownAssignment(response),
          (error) => {
            this.dataSource = [];
            throw error;
          }
        );
        this.subscriptionList.push(getAllAssignments);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
