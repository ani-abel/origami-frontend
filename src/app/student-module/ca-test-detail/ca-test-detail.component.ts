import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { BottomSheetData } from '../../types/internal-types.type';
import { MatBottomSheetComponent } from '../mat-bottom-sheet/mat-bottom-sheet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Subject_Ca, Subject_Ca_Submission } from '../../services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';

@Component({
  selector: 'app-ca-test-detail',
  templateUrl: './ca-test-detail.component.html',
  styleUrls: ['./ca-test-detail.component.css']
})
export class CaTestDetailComponent implements
OnInit,
OnDestroy {
  takeTest: boolean = false;
  caTestId: string;
  attachedCATestFileURL: string;
  attachedCATestSubmissionFileURL: string;
  subscriptionList: Subscription[] = [];
  bottomSheetData: BottomSheetData;
  caTestNotDue: boolean;
  caTestStartDate: Date;
  caTestEndDate: Date;
  allocatedTimeForTest: string;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly studentSrv: StudentService,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  ngOnInit(): void {
    //get the caTestId
    const getCATestId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.caTestId = res;
            //get the caTest
            const getCATest: Subscription =
            this.studentSrv
                .getMyCATest(this.caTestId)
                .subscribe(
                  (response: Subject_Ca) => {
                    const {
                      Person,
                      SelectedDateTime,
                      AttachedFile,
                      AllocatedTime,
                      DateCreated
                    } = response;

                    this.allocatedTimeForTest = AllocatedTime;
                    this.caTestStartDate = new Date(SelectedDateTime);
                    this.caTestEndDate = this.sharedUtilitySrv.convertToRealTime(new Date(SelectedDateTime), AllocatedTime);
                    this.attachedCATestFileURL = AttachedFile;

                    //Make Sure the time for the exam has been reached, otherwise bounce the user
                    if(this.caTestStartDate.getTime() >= Date.now()) {
                      this.caTestNotDue = true;
                      return;
                    }

                    this.bottomSheetData = {
                      GivenDate: DateCreated,
                      TeacherName: `${Person.FirstName} ${Person.LastName}`
                    };

                    //Get a copy what the student's exam submission
                   this.getCaTestSubmission();
                  },
                  (error) => {
                    this.router.navigate(["/student", "ca-test"]);
                  }
                );
            this.subscriptionList.push(getCATest);
          }
        );
      this.subscriptionList.push(getCATestId);
  }

  toggleTakeTest(): void {
    this.takeTest = !this.takeTest
  }

  caTestSubmitted(event: Event): void {
    //If Exam is completed or submitted, hide the Section that get's displayed
    this.takeTest = false;
    //Get a copy what the student's exam submission
    this.getCaTestSubmission();
  }

  getCaTestSubmission(): void {
    const getCaTestSubmission: Subscription =
    this.studentSrv
        .getMyCATestSubmission(this.caTestId)
        .subscribe(
          (response: Subject_Ca_Submission) => {
            this.attachedCATestSubmissionFileURL = response.AttachedFile;
          },
          (error) => {
            this.attachedCATestSubmissionFileURL = null;
            throw error;
          }
        );

      this.subscriptionList.push(getCaTestSubmission);
  }


  openBottomSheet(): void {
    this._bottomSheet.open(MatBottomSheetComponent, {
      data: this.bottomSheetData
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
