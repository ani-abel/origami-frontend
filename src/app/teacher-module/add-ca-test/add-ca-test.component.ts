import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Subject, SelectListData } from '../../services/origamiGraphql.service';
import { Observable, Subscription } from 'rxjs';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-ca-test',
  templateUrl: './add-ca-test.component.html',
  styleUrls: ['./add-ca-test.component.css']
})
export class AddCaTestComponent implements
OnInit,
OnDestroy {
  addCATestForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  caTypeList$: Observable<SelectListData[]>;
  allocatedTimes$: Observable<SelectListData[]>;
  subscriptionList: Subscription[] = [];
  userId: string;
  minDate: Date;

  handleInput(event: Event) {
    this.addCATestForm.patchValue({
      examContent: event
    });

    this.addCATestForm.get("examContent").updateValueAndValidity();
  }

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService,
    private readonly authSrv: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
    //Fill up The select lists
    this.allocatedTimes$ = this.sharedUtilitySrv.getAllocatedTime();
    this.caTypeList$ = this.sharedUtilitySrv.getCATypes();

    this.minDate = new Date();

    this.initForm();
  }

  initForm(): void {
    this.addCATestForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      caType: new FormControl(null, Validators.required),
      allocatedTime: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      startTime: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('\\d+:\\d+(AM|PM|am|pm)')
      ])),
      totalExpectedScore: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('\\d+')
      ])),
      examContent: new FormControl(null, Validators.required)
    });
  }

  myFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  submitForm(): void {
    if(this.addCATestForm.invalid) {
      return;
    }

    const {
      subject,
      caType,
      allocatedTime,
      startDate,
      startTime,
      totalExpectedScore,
      examContent
    } = this.addCATestForm.value;
    const parsedTotalExpectedScore: number = parseInt(totalExpectedScore);

    const giveCATestSubscription =
    this.teacherSrv.giveCATest(
      parsedTotalExpectedScore,
      allocatedTime,
      startDate,
      subject,
      examContent,
      caType,
      startTime
    ).subscribe(
      (response: boolean) => {
        if(response) {
          this.addCATestForm.reset();
          this.addCATestForm.markAsPristine();
        }
      }
    );

    this.subscriptionList.push(giveCATestSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
