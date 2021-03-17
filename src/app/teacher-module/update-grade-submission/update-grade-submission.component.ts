import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../grade-submission/grade-submission.component';
import { SharedUtilityService } from 'src/app/shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';
import { Purpose } from 'src/app/types/internal-types.type';
import { Subject_Assignment_Score } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-update-grade-submission',
  templateUrl: './update-grade-submission.component.html',
  styleUrls: ['./update-grade-submission.component.css']
})
export class UpdateGradeSubmissionComponent implements OnInit {
  gradeScoreForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.sharedUtilitySrv
        .getAssignmentScoreById(this.data.submissionId)
        .subscribe(
          (response: Subject_Assignment_Score) => {
            const { Score, Remark } = response;
            this.gradeScoreForm.patchValue({
              score: Score,
              remark: Remark
            });
          }
        )
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

    switch(this.data.purpose) {
      case Purpose.ASSIGNMENT:
        //Assignment
        this.teacherSrv.updateAssignmentScore(this.data.submissionId, remark, parsedScore);
        break;
      case Purpose.CA_TEST:
        //Ca Test
        this.teacherSrv.updateCaTestScore(this.data.submissionId, remark, parsedScore);
        break;
      case Purpose.EXAM:
        //Exam
        this.teacherSrv.updateExamScore(this.data.submissionId, remark, parsedScore);
        break;
    }
  }

}
