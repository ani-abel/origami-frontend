import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-module/auth-service.service';
import { SharedUtilityService } from 'src/app/shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';
import { Subject, Subject_Topic } from 'src/app/services/origamiGraphql.service';
import { Subject_Note } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements
OnInit,
OnDestroy {
  userId: string;
  subjectList$: Observable<Subject[]>;
  topics$: Observable<Subject_Topic[]>;
  updateNoteForm: FormGroup;
  subscriptionList: Subscription[] = [];
  noteId: string;

  constructor(
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }

    const getNoteId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.noteId = res;

            const getANote: Subscription =
            this.sharedUtilitySrv
                .getNoteById(this.noteId)
                .subscribe(
                  (response: Subject_Note) => {
                    this.updateNoteForm.patchValue({
                      subject: response.SubjectId,
                      subjectTopic: response.SubjectTopicId
                    });

                    //Populate the dropdown for viewing topics
                    this.topics$ = this.teacherSrv.getTopicsForASubject(response.SubjectId);
                  }
                );
            this.subscriptionList.push(getANote);
          }
        );

      this.subscriptionList.push(getNoteId);
  }

  handleInput(event: Event): void {
    this.updateNoteForm.patchValue({
      noteContent: event
    });

    this.updateNoteForm.get("noteContent").updateValueAndValidity();
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
            this.updateNoteForm.get("subjectTopic").enable();
          }
          else {
            this.updateNoteForm.get("subjectTopic").disable();
          }
        }
      );
      this.subscriptionList.push(topicListSubscription);
    }
  }

  initForm(): void {
    this.updateNoteForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      subjectTopic: new FormControl(null, Validators.required),
      noteContent: new FormControl(null)
    });
  }

  submitForm(): void {
    if(this.updateNoteForm.invalid) {
      return;
    }

    const {
      subject,
      noteContent,
      subjectTopic
    } = this.updateNoteForm.value;

    this.teacherSrv.updateNote(this.noteId, subject, noteContent, subjectTopic);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
