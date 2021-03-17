import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Subject, Subject_Topic } from 'src/app/services/origamiGraphql.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  addAssignmentForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  topics$: Observable<Subject_Topic[]>;
  subscriptionList: Subscription[] = [];
  userId: string;
  minDate: Date;//Specifies the minimum date for the date picker to allow date picking

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService,
    private readonly authSrv: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
    this.initForm();
  }

  handleInput(event: Event) {
    this.addAssignmentForm.patchValue({
      assignmentInText: event
    });

    //Update the validity of the form
    this.addAssignmentForm.get("assignmentInText").updateValueAndValidity();
  }

  handleChange(event: Event | any): void {
    const subject = event.value;
    if(subject) {
      this.topics$ = this.teacherSrv.getTopicsForASubject(subject);
      //Subscribe and then enable the 'subjectTopic' formControl on user's selecting a Subject
      const topicListSubscription: Subscription =
      this.topics$.subscribe(
        (response: Subject_Topic[]) => {
          if(response?.length > 0) {
            this.addAssignmentForm.get("subjectTopic").enable();
          }
          else {
            this.addAssignmentForm.get("subjectTopic").disable();
          }
        }
      );
      this.subscriptionList.push(topicListSubscription);
    }
  }

  initForm(): void {
    this.addAssignmentForm = new FormGroup({
      "subject": new FormControl(null, Validators.required),
      "totalExpectedScore": new FormControl(null, Validators.compose([
                  Validators.required,
                  Validators.min(1),
                  Validators.pattern('[0-9]*')//must be number
      ])),
      "assignmentInText": new FormControl(null, Validators.required),
      "dueDate": new FormControl(null, Validators.required),
      "subjectTopic": new FormControl({ value: null, disabled: true }, Validators.required)
    });
  }

  myFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  submitForm(): void {
    if(this.addAssignmentForm.invalid) {
      return;
    }

    const {
      subject,
      totalExpectedScore,
      assignmentInText,
      dueDate,
      subjectTopic
    } = this.addAssignmentForm.value;
    const totalExpectedScoreInNumber: number = parseInt(totalExpectedScore);

    this.teacherSrv
        .createAssignment(subject, assignmentInText, totalExpectedScoreInNumber, dueDate, subjectTopic)
        .subscribe(
          (response: boolean) => {
            if(response) {
              this.addAssignmentForm.reset();
              this.addAssignmentForm.markAsPristine();
            }
          }
        );
  }

}
