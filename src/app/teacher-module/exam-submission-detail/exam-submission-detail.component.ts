import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Purpose } from '../../types/internal-types.type';
import { Subject_Exam_Submission } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-exam-submission-detail',
  templateUrl: './exam-submission-detail.component.html',
  styleUrls: ['./exam-submission-detail.component.css']
})
export class ExamSubmissionDetailComponent implements
OnInit,
OnDestroy {
  subscriptionList: Subscription[] = [];
  examSubmissionId: string;
  totalScoreExpected: number;
  attachedFileUrl: string;

  constructor(
    public dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) {}

  ngOnInit(): void {
    const getExamSubmission: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.examSubmissionId = res;

            const examSubmission: Subscription =
            this.sharedUtilitySrv
                .getExamSubmission(this.examSubmissionId)
                .subscribe(
                  (response: Subject_Exam_Submission) => {
                    const { AttachedFile, SubjectExam } = response;
                    this.totalScoreExpected = SubjectExam.TotalExpectedScore;
                    this.attachedFileUrl = AttachedFile;
                  }
                );

            this.subscriptionList.push(examSubmission);
          }
        );
    this.subscriptionList.push(getExamSubmission);
  }

  openDialog(): void {
    if(this.totalScoreExpected && this.examSubmissionId) {
      this.dialog.open(GradeSubmissionComponent, {
        data: {
          submissionId: this.examSubmissionId,
          totalExpectedScore: this.totalScoreExpected,
          purpose: Purpose.EXAM
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
