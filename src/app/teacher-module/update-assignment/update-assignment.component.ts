import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloError } from 'apollo-client';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { Subject_Assignment, Subject_Topic } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements
OnInit,
OnDestroy {
  updateAssignmentForm: FormGroup;
  userId: string;
  subjectList$: Observable<any>;
  topics$: Observable<Subject_Topic[]>;
  minDate: Date;//Specifies the minimum date for the date picker to allow date picking
  assignmentId: string;
  subscriptionList: Subscription[] = [];

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService,
    private readonly authSrv: AuthServiceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const getAssignmentIdSubscription: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (response: string) => {
            //Initialize the Form
            this.initForm();
            this.assignmentId = response;

            this.minDate = new Date();
            this.userId = this.authSrv.getUserId();

            if(this.userId) {
              this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
            }

            //Get the Assignment Details
            const getAssignmentDetails: Subscription =
            this.sharedUtilitySrv
                .getAssignmentById(this.assignmentId)
                .subscribe(
                  (response: Subject_Assignment) => {
                    const {
                      SubjectId,
                      SubjectTopicId,
                      TotalExpectedScore,
                      DueDate
                    } = response;

                    this.updateAssignmentForm.patchValue({
                      subject: SubjectId,
                      subjectTopic: SubjectTopicId,
                      totalExpectedScore: TotalExpectedScore,
                      dueDate: DueDate
                    });

                    //Populate the dropdown for viewing topics
                    this.topics$ = this.teacherSrv.getTopicsForASubject(SubjectId);
                  },
                  (error: ApolloError) => {
                    this.router.navigate(["/teacher", "manage-assignment", "view-assignments"]);
                  }
                );
              this.subscriptionList.push(getAssignmentDetails);
          }
        );
    this.subscriptionList.push(getAssignmentIdSubscription);
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
            this.updateAssignmentForm.get("subjectTopic").enable();
          }
          else {
            this.updateAssignmentForm.get("subjectTopic").disable();
          }
        }
      );
      this.subscriptionList.push(topicListSubscription);
    }
  }

  handleInput(event: Event): void {
    this.updateAssignmentForm.patchValue({
      assignmentInText: event
    });

    //Update the validity of the form
    this.updateAssignmentForm.get("assignmentInText").updateValueAndValidity();
  }

  initForm(): void {
    this.updateAssignmentForm = new FormGroup({
      "subject": new FormControl(null, Validators.required),
      "subjectTopic": new FormControl(null, Validators.required),
      "totalExpectedScore": new FormControl(null, Validators.compose([
                  Validators.required,
                  Validators.min(1),
                  Validators.pattern('[0-9]*')//must be number
      ])),
      "assignmentInText": new FormControl(null),
      "dueDate": new FormControl(null, Validators.required)
    });
  }

  myFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  submitForm(): void {
    if(this.updateAssignmentForm.invalid) {
      return;
    }

    const {
      subject,
      subjectTopic,
      totalExpectedScore,
      assignmentInText,
      dueDate
    } = this.updateAssignmentForm.value;

    this.teacherSrv.updateAssignment(
      this.assignmentId,
      dueDate,
      subject,
      parseInt(totalExpectedScore),
      assignmentInText,
      subjectTopic
    );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
