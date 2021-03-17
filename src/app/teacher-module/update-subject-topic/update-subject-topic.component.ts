import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Subject } from '../../services/origamiGraphql.service';
import { TeacherService } from '../teacher.service';
import { Subject_Topic } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-update-subject-topic',
  templateUrl: './update-subject-topic.component.html',
  styleUrls: ['./update-subject-topic.component.css']
})
export class UpdateSubjectTopicComponent implements
OnInit,
OnDestroy {
  updateTopicForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  subscriptionList: Subscription[] = [];
  userId: string;
  topicId: string;

  constructor(
    private readonly teacherSrv: TeacherService,
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
    this.initForm();

    //get the topic
    const getTopicId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (topicId: string) => {
            this.topicId = topicId;
            //get the details for selected topic
            const getTopic: Subscription =
            this.teacherSrv
                .getTopicById(topicId)
                .subscribe(
                  (response: Subject_Topic) => {
                    const { SubjectId, Title } = response;
                    this.updateTopicForm.patchValue({
                      subject: SubjectId,
                      title: Title
                    });
                  }
                );
            this.subscriptionList.push(getTopic);
          }
        );
    this.subscriptionList.push(getTopicId);
  }

  initForm(): void {
    this.updateTopicForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if(this.updateTopicForm.invalid) {
      return;
    }

    const { subject, title} = this.updateTopicForm.value;
    const updateTopic: Subscription =
    this.teacherSrv
        .updateTopic(this.topicId, title, subject)
        .subscribe();

    this.subscriptionList.push(updateTopic);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
