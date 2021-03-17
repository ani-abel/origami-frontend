import { Component, OnInit, OnDestroy } from '@angular/core';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TeacherService } from '../teacher.service';
import { Purpose } from 'src/app/types/internal-types.type';
import { SubjectCaReMap } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.css']
})
export class ViewTestsComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = [
    "S/N",
    "Subject",
    "CAType",
    "DateOfCA",
    "TotalMarksExpected",
    "DateCreated",
    "Actions"
  ];
  dataSource: SubjectCaReMap[] = [];
  subscriptionList: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    const getCAsCreated: Subscription =
    this.teacherSrv
        .getAllCATestsCreatedByTeacher()
        .subscribe(
          (response: SubjectCaReMap[]) => {
            this.dataSource = response;
          }
        );

    this.subscriptionList.push(getCAsCreated);
  }

  openDialog(assignSubmissionId: string, totalExpectedScore: number) {
    this.dialog.open(GradeSubmissionComponent, {
      data: {
        submissionId: assignSubmissionId,
        totalExpectedScore,
        purpose: Purpose.CA_TEST
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
