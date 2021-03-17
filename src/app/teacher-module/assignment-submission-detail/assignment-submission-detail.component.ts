import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { Purpose } from '../../types/internal-types.type';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Subject_Assignment_Submission } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-assignment-submission-detail',
  templateUrl: './assignment-submission-detail.component.html',
  styleUrls: ['./assignment-submission-detail.component.css']
})
export class AssignmentSubmissionDetailComponent implements
OnInit,
OnDestroy {
  subscriptionList: Subscription[] = [];
  assignmentSubmissionId: string;
  totalExpectedScore: number;
  attachedFileUrl: string;
  isSubmitted: boolean;


  constructor(
    public dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) {}

  ngOnInit(): void {
    const getSubmissionId: Subscription =
                    this.activatedRoute.params
                    .pipe(
                      map(res => res.id)
                    )
                    .subscribe((res: string) => {
                      this.assignmentSubmissionId = res;

                      const getSubmissionDetails: Subscription =
                      this.sharedUtilitySrv
                          .getAttachedFileFromAssignmentSubmission(this.assignmentSubmissionId)
                          .subscribe(
                            (response: Subject_Assignment_Submission) => {
                              const {
                                AttachedFile,
                                SubjectAssignment,
                                SubjectAssignmentScoreList
                              } = response;
                              this.totalExpectedScore = SubjectAssignment.TotalExpectedScore;
                              this.attachedFileUrl = AttachedFile;
                              this.isSubmitted = SubjectAssignmentScoreList?.length > 0 ? true : false;
                            },
                            (error) => {
                              this.router.navigate(["/teacher", "manage-assignment", "view-assignments"]);
                            }
                          );
                      this.subscriptionList.push(getSubmissionDetails);
                    });

    this.subscriptionList.push(getSubmissionId);
  }

  openDialog(): void {
    if(this.assignmentSubmissionId && this.totalExpectedScore) {
      this.dialog.open(GradeSubmissionComponent, {
        data: {
          submissionId: this.assignmentSubmissionId,
          totalExpectedScore: this.totalExpectedScore,
          purpose: Purpose.ASSIGNMENT
        }
      });
    }
    else {
      return;
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
