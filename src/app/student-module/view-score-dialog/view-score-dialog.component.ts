import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from "rxjs";
import { AssignmentScoreDialogData, Purpose } from 'src/app/types/internal-types.type';
import { StudentService } from '../student.service';
import { Subject_Assignment_Score } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-score-dialog',
  templateUrl: './view-score-dialog.component.html',
  styleUrls: ['./view-score-dialog.component.css']
})
export class ViewScoreDialogComponent implements
OnInit,
OnDestroy {
  subscriptionList: Subscription[] = [];
  remark: string;
  score: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignmentScoreDialogData,
    private readonly studentSrv: StudentService
  ) {}

  ngOnInit(): void {
    switch(this.data.purpose) {
      case Purpose.ASSIGNMENT:
        const getAssignmentScore: Subscription =
        this.studentSrv
            .getAssignmentScore(this.data.assignmentId)
            .subscribe(
              (response: Subject_Assignment_Score) => {
                const { Score, Remark } = response;
                this.remark = Remark;
                this.score = Score;
              },
              (error) => {
                throw error;
              }
            );

          this.subscriptionList.push(getAssignmentScore);
        break;
      case Purpose.CA_TEST:
        break;
      case Purpose.EXAM:
        break;
      default:
        this.score = null;
        this.remark = null;
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
