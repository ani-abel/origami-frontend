import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BottomSheetData, AllocatedTimeInterval } from '../../types/internal-types.type';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatBottomSheetComponent } from '../mat-bottom-sheet/mat-bottom-sheet.component';
import { StudentService } from '../student.service';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Subject_Exam, Subject_Exam_Submission } from '../../services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements
OnInit,
OnDestroy {
  takeExam: boolean = false;
  examId: string;
  attachedExamFileURL: string;
  attachedExamSubmissionFileURL: string;
  subscriptionList: Subscription[] = [];
  bottomSheetData: BottomSheetData;
  examNotDue: boolean;
  examStartDate: Date;
  examEndDate: Date;
  allocatedTimeForExam: string;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private readonly studentSrv: StudentService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}


  ngOnInit(): void {
    //get the examId
    const getExamId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.examId = res;
            //Get the Details for the exam
            const getExam: Subscription =
            this.studentSrv
                .getMyExam(this.examId)
                .subscribe(
                  (response: Subject_Exam) => {
                    const {
                      AttachedFile,
                      DateCreated,
                      Person,
                      AllocatedTime,
                      SelectedDateTime
                    } = response;

                    this.allocatedTimeForExam = AllocatedTime;
                    this.examStartDate = new Date(SelectedDateTime);
                    this.examEndDate = this.sharedUtilitySrv.convertToRealTime(new Date(SelectedDateTime), AllocatedTime);
                    this.attachedExamFileURL = AttachedFile;

                    //Make Sure the time for the exam has been reached, otherwise bounce the user
                    if(this.examStartDate.getTime() >= Date.now()) {
                      this.examNotDue = true;
                      return;
                    }
                    // if(!(this.examStartDate.getTime() >= Date.now())) {
                    //   this.examNotDue = true;
                    //   return;
                    // }

                    //Get Exam details and then display
                    this.bottomSheetData = {
                      GivenDate: DateCreated,
                      TeacherName: `${Person.FirstName} ${Person.LastName}`
                    };

                   //Get a copy what the student's exam submission
                   this.getExamSubmission();
                  },
                  (error) => {
                    this.router.navigate(["/student", "exam"]);
                  }
                );
            this.subscriptionList.push(getExam);
          }
        );

      this.subscriptionList.push(getExamId);
  }

  getExamSubmission(): void {
    const getExamSubmission: Subscription =
    this.studentSrv
        .getMyExamSubmission(this.examId)
        .subscribe(
          (response: Subject_Exam_Submission) => {
            this.attachedExamSubmissionFileURL = response.AttachedFile;
          },
          (error) => {
            this.attachedExamSubmissionFileURL = null;
            throw error;
          }
        );

      this.subscriptionList.push(getExamSubmission);
  }

  toggleTakeExam(): void {
    this.takeExam = !this.takeExam;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(MatBottomSheetComponent, {
      data: this.bottomSheetData
    });
  }

  examSubmitted(event: Event): void {
    //If Exam is completed or submitted, hide the Section that get's displayed
    this.takeExam = false;
    //Get a copy what the student's exam submission
    this.getExamSubmission();
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
