import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { Subject, Subject_Topic } from 'src/app/services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements
OnInit,
OnDestroy {
  userId: string;
  subjectList$: Observable<Subject[]>;
  topics$: Observable<Subject_Topic[]>;
  subscriptionList: Subscription[] = [];
  addNoteForm: FormGroup;

  constructor(
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
  }

  handleInput(event: Event): void {
    this.addNoteForm.patchValue({
      noteContent: event
    });

    this.addNoteForm.get("noteContent").updateValueAndValidity();
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
            this.addNoteForm.get("subjectTopic").enable();
          }
          else {
            this.addNoteForm.get("subjectTopic").disable();
          }
        }
      );
      this.subscriptionList.push(topicListSubscription);
    }
  }

  initForm(): void {
    this.addNoteForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      subjectTopic: new FormControl({ value: null, disabled: true }, Validators.required),
      noteContent: new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.addNoteForm.invalid) {
      return;
    }

    const {
      subject,
      noteContent,
      subjectTopic
    } = this.addNoteForm.value;

    this.teacherSrv
        .giveNote(subject, noteContent, subjectTopic)
        .subscribe(
          (response: boolean) => {
            if(response) {
              this.addNoteForm.reset();
              this.addNoteForm.markAsPristine();
            }
          }
        );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
