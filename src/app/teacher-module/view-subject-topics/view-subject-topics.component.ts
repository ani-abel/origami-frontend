import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Subject, Subject_Topic } from '../../services/origamiGraphql.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { TeacherService } from '../teacher.service';
import { MySubjectNoteReMap } from '../../types/internal-types.type';

@Component({
  selector: 'app-view-subject-topics',
  templateUrl: './view-subject-topics.component.html',
  styleUrls: ['./view-subject-topics.component.css']
})
export class ViewSubjectTopicsComponent implements
OnInit,
OnDestroy {
  subjectSelectionForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  subscriptionList: Subscription[] = [];
  userId: string;
  displayedColumns: string[] = [
    'S/N',
    'Subject',
    'DateCreated',
    'CreatedBy',
    'Actions'
  ];
  dataSource: MySubjectNoteReMap[] = [];
  asyncDataSource: BehaviorSubject<MySubjectNoteReMap[]> = new BehaviorSubject<MySubjectNoteReMap[]>([]);

  constructor(
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
  }

  initForm(): void {
    this.subjectSelectionForm = new FormGroup({
        "subject": new FormControl(null, Validators.compose([
                                          Validators.required
                            ]))
    });
  }

  deleteTopic(topicId: string): void {
    if(topicId) {
      const deleteTopic: Subscription =
      this.teacherSrv
          .deleteTopic(topicId)
          .subscribe(
            (response: boolean) => {
              if(response) {
                //filter out the deleted Note from the total list if Notes
                const remappedNotes: MySubjectNoteReMap[] =
                this.dataSource
                    .filter((topic: MySubjectNoteReMap) => topic.Id !== topicId)
                    .map((topic: MySubjectNoteReMap, index: number) => {
                      return {
                        Id: topic.Id,
                        SerialNumber: index + 1,
                        CreatedBy: topic.CreatedBy,
                        Subject: topic.Subject,
                        DateCreated: topic.DateCreated
                      }
                    });

                this.asyncDataSource.next(remappedNotes);
              }
            }
          );
      this.subscriptionList.push(deleteTopic);
    }
  }

  submitForm(): void {
    if(this.subjectSelectionForm.invalid) {
      return;
    }

    const { subject } = this.subjectSelectionForm.value;
    this.teacherSrv
        .getTopicsBySubjectId(subject)
        .subscribe(
          (response: Subject_Topic[]) => {
            const remapDataSource: MySubjectNoteReMap[]
            = response.map((topic: Subject_Topic, index: number): MySubjectNoteReMap => {
              const { Subject, Person, DateCreated, Id } = topic;
              return {
                Id,
                SerialNumber: index + 1,
                CreatedBy: this.userId === Person.Id ? "You" : `${Person.FirstName} ${Person.LastName}`,
                Subject: Subject.Name,
                DateCreated
              }
            });

            //Assign the collected data to rxjs subject
            this.asyncDataSource.next(remapDataSource);

            const getNoteSubscription: Subscription =
            this.asyncDataSource
                .asObservable()
                .subscribe(
                  (subjectNoteResponse: MySubjectNoteReMap[]) => {
                    this.dataSource = subjectNoteResponse;
                },
                (error) => {
                  throw error;
                }
              );

            this.subscriptionList.push(getNoteSubscription);
          }
        );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
