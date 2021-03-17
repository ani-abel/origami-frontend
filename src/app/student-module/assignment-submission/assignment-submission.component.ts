import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrls: ['./assignment-submission.component.css']
})
export class AssignmentSubmissionComponent implements OnInit {
  @Input() assignmentId: string;
  @Output() assignmentSubmitted: EventEmitter<any> = new EventEmitter();
  assignmentSubmissionForm: FormGroup;

  handleInput(event: Event): void {
    this.assignmentSubmissionForm.patchValue({
      submission: event
    });
    this.assignmentSubmissionForm.get("submission").updateValueAndValidity();
  }

  constructor(private readonly studentSrv: StudentService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.assignmentSubmissionForm = new FormGroup({
      submission: new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.assignmentSubmissionForm.invalid) {
      return;
    }

    if(this.assignmentId) {
      const { submission } = this.assignmentSubmissionForm.value;
      this.studentSrv.
          submitAssignment(submission, this.assignmentId)
          .subscribe(
            (response: boolean) => {
              if(response) {
                this.assignmentSubmitted.emit(null);
              }
            }
          );
    }
  }

}
