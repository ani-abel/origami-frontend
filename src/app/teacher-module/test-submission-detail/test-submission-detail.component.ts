import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { SharedUtilityService } from 'src/app/shared-module/services/shared-utility.service';
import { Purpose } from 'src/app/types/internal-types.type';
import { Subject_Ca_Submission } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-test-submission-detail',
  templateUrl: './test-submission-detail.component.html',
  styleUrls: ['./test-submission-detail.component.css']
})
export class TestSubmissionDetailComponent implements
  OnInit,
  OnDestroy {
    subscriptionList: Subscription[] = [];
    caTestSubmissionId: string;
    totalScoreExpected: number;
    attachedFileUrl: string;

    constructor(
      public dialog: MatDialog,
      private readonly activatedRoute: ActivatedRoute,
      private readonly sharedUtilitySrv: SharedUtilityService
    ) {}

  ngOnInit(): void {
    const getCaTestSubmission: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        ).subscribe(
      (res: string) => {
        this.caTestSubmissionId = res;

        const caTestSubmission: Subscription =
          this.sharedUtilitySrv
              .getCASubmission(this.caTestSubmissionId)
              .subscribe(
                (response: Subject_Ca_Submission) => {
                  const { AttachedFile, SubjectCA } = response;
                  this.totalScoreExpected = SubjectCA.TotalExpectedScore;
                  this.attachedFileUrl = AttachedFile;
                }
              );

          this.subscriptionList.push(caTestSubmission);
        }
      );
    this.subscriptionList.push(getCaTestSubmission);
  }

  openDialog(): void {
    if(this.totalScoreExpected && this.caTestSubmissionId) {
      this.dialog.open(GradeSubmissionComponent, {
        data: {
          submissionId: this.caTestSubmissionId,
          totalExpectedScore: this.totalScoreExpected,
          purpose: Purpose.CA_TEST
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
