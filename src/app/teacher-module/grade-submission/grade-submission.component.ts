import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Purpose } from '../../types/internal-types.type';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';


export interface DialogData {
  submissionId: string,
  totalExpectedScore: number;
  purpose: Purpose
}

@Component({
  selector: 'app-grade-submission',
  templateUrl: './grade-submission.component.html',
  styleUrls: ['./grade-submission.component.css']
})
export class GradeSubmissionComponent implements OnInit {
  gradeScoreForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.gradeScoreForm = new FormGroup({
      score: new FormControl(null, Validators.required),
      remark: new FormControl(null)
    });
  }

  submitForm(): void {
    if(this.gradeScoreForm.invalid) {
      return;
    }

    const { score, remark } = this.gradeScoreForm.value;
    const parsedScore = parseInt(score);

    if(parsedScore > this.data.totalExpectedScore) {
      const message: string = `Score cannot be greater than ${this.data.totalExpectedScore}`;
      this.sharedUtilitySrv.returnErrorMessage(message);
    }
    if(parsedScore < 0) {
      const message: string = `Score cannot be less than Zero`;
      this.sharedUtilitySrv.returnErrorMessage(message);
    }

    const { submissionId } = this.data;

    switch(this.data.purpose) {
      case Purpose.ASSIGNMENT:
        this.teacherSrv
            .gradeAssignment(submissionId, parsedScore, remark)
            .subscribe(
              (response: boolean) => {
                if(response) {
                  //Clear out the form
                  this.gradeScoreForm.reset();
                  this.gradeScoreForm.markAsPristine();
                }
              }
            );
        break;
      case Purpose.CA_TEST:
        this.teacherSrv
            .gradeCATest(submissionId, parsedScore, remark)
            .subscribe(
              (response: boolean) => {
                if(response) {
                  //Clear out the form
                  this.gradeScoreForm.reset();
                  this.gradeScoreForm.markAsPristine();
                }
              }
            );
        break;
      case Purpose.EXAM:
        this.teacherSrv
            .gradeExam(submissionId, parsedScore, remark)
            .subscribe(
              (response: boolean) => {
                if(response) {
                  //Clear out the form
                  this.gradeScoreForm.reset();
                  this.gradeScoreForm.markAsPristine();
                }
              }
            );
        break;
      default:
        break;
    }
  }

}
