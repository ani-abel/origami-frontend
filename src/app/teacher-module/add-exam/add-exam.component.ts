import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from 'rxjs';
import { Subject } from '../../services/origamiGraphql.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  minDate: Date;
  userId: string;
  subjectList$: Observable<Subject[]>;
  examTypes$: Observable<any>;
  allocatedTimes$: Observable<any>;
  addExamForm: FormGroup;

  handleInput(event: Event): void {
    this.addExamForm.patchValue({
      examContent: event
    });

    this.addExamForm.get("examContent").updateValueAndValidity();
  }

  constructor(
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
    //Fill up The select lists
    this.examTypes$ = this.sharedUtilitySrv.getExamTypes();
    this.allocatedTimes$ = this.sharedUtilitySrv.getAllocatedTime();

    this.initForm();
  }

  initForm(): void {
    this.addExamForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      examType: new FormControl(null, Validators.required),
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
    if(this.addExamForm.invalid) {
      return;
    }

    const {
      subject,
      examType,
      allocatedTime,
      startDate,
      startTime,
      totalExpectedScore,
      examContent
    } = this.addExamForm.value;

    const parsedTotalExpectedScore: number = parseInt(totalExpectedScore);

    this.teacherSrv.giveExam(
      examType,
      allocatedTime,
      startDate,
      parsedTotalExpectedScore,
      subject,
      examContent,
      startTime
    ).subscribe(
      (response: boolean) => {
        if(response) {
          this.addExamForm.reset();
          this.addExamForm.markAsPristine();
        }
      }
    );
  }

}
