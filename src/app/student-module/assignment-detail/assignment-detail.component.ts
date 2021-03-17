import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { MatBottomSheetComponent } from '../mat-bottom-sheet/mat-bottom-sheet.component';
import { BottomSheetData } from '../../types/internal-types.type';
import { StudentService } from '../student.service';
import {
  Subject_Assignment,
  Subject_Assignment_Submission
} from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements
OnInit,
OnDestroy {
  bottomSheetData: BottomSheetData;
  assignmentId: string;
  attachedFileURL: string;
  submissionAttachmentURL: string;
  subscriptionList: Subscription[] = [];
  assignmentExpired: boolean;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private readonly studentSrv: StudentService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const getAssignmentId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.assignmentId = res;

            //get assignment
            const getAssignment: Subscription =
            this.studentSrv
                .getAssignment(this.assignmentId)
                .subscribe(
                  (response: Subject_Assignment) => {
                    const { Person, DueDate, DateCreated, AttachedFile } = response;
                    this.attachedFileURL = AttachedFile;
                    this.bottomSheetData = {
                      GivenDate: DateCreated,
                      DueDate,
                      TeacherName: `${Person.FirstName} ${Person.LastName}`
                    };

                    //Lock user's from submitting assignments after the Due Date
                    const dueDateInSeconds: number = new Date(DueDate).getTime();
                    if(Date.now() >= dueDateInSeconds) {
                      this.assignmentExpired = true;
                    }

                    this.loadAssignmentSubmission();
                  },
                  (error) => {
                    this.router.navigate(["/student", "assignment"]);
                  }
                );
            this.subscriptionList.push(getAssignment);
          }
        );

      this.subscriptionList.push(getAssignmentId);
  }

  loadAssignmentSubmission(): void {
    //get assignment submission
    const assignmentSubmission: Subscription =
    this.studentSrv
        .getStudentAssignmentSubmission(this.assignmentId)
        .subscribe(
          (submission: Subject_Assignment_Submission) => {
            const { AttachedFile } = submission;
            this.submissionAttachmentURL = AttachedFile;
          },
          (error) => {
            this.submissionAttachmentURL = null;
            //throw error;
          }
        );
    this.subscriptionList.push(assignmentSubmission);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(MatBottomSheetComponent, {
      data: {
        GivenDate: this.bottomSheetData.GivenDate,
        DueDate: this.bottomSheetData.DueDate,
        TeacherName: this.bottomSheetData.TeacherName
      }
    });
  }

  assignmentWasSubmitted(event: Event): void {
    this.loadAssignmentSubmission();
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
