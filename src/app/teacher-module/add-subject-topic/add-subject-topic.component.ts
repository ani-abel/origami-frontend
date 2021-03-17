import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { TeacherService } from '../teacher.service';
import { Subject } from '../../services/origamiGraphql.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';

@Component({
  selector: 'app-add-subject-topic',
  templateUrl: './add-subject-topic.component.html',
  styleUrls: ['./add-subject-topic.component.css']
})
export class AddSubjectTopicComponent implements
OnInit,
OnDestroy {
  subscriptionList: Subscription[] = [];
  addTopicForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  userId: string;

  constructor(
    private readonly teacherSrv: TeacherService,
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  ngOnInit(): void {
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
    this.initForm();
  }

  initForm(): void {
    this.addTopicForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if(this.addTopicForm.invalid) {
      return;
    }

    const { title, subject} = this.addTopicForm.value;
    const createTopic: Subscription =
    this.teacherSrv
        .createTopic(subject, title)
        .subscribe(
          (response: boolean) => {
            if(response) {
              this.addTopicForm.reset();
              this.addTopicForm.markAsPristine();
            }
          }
        );
    this.subscriptionList.push(createTopic);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
