import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { TeacherService } from '../teacher.service';
import { SubjectExamReMap } from '../../services/origamiGraphql.service';
import { Purpose } from '../../types/internal-types.type';

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
    "ExamType",
    "DateOfExam",
    "TotalMarksExpected",
    "DateCreated",
    "Actions"
  ];
  dataSource: SubjectExamReMap[] = [];
  subscriptionList: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    const getExamsCreated: Subscription =
    this.teacherSrv
        .getExamsCreatedByTeacher()
        .subscribe(
          (response: SubjectExamReMap[]) => {
            this.dataSource = response;
          }
        );

    this.subscriptionList.push(getExamsCreated);
  }

  openDialog(assignSubmissionId: string, totalExpectedScore: number) {
    this.dialog.open(GradeSubmissionComponent, {
      data: {
        submissionId: assignSubmissionId,
        totalExpectedScore,
        purpose: Purpose.EXAM
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
