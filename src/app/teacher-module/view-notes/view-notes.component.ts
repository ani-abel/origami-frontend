import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MySubjectNoteReMap } from 'src/app/types/internal-types.type';
import { Subject } from 'src/app/services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Subject_Note } from '../../services/origamiGraphql.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements
OnInit,
OnDestroy {
  subjectSelectionForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  subscriptionList: Subscription[] = [];

  displayedColumns: string[] = [
    'S/N',
    'Subject',
    'DateCreated',
    'CreatedBy',
    'Actions'
  ];
  dataSource: MySubjectNoteReMap[] = [];
  asyncDataSource: BehaviorSubject<MySubjectNoteReMap[]> = new BehaviorSubject<MySubjectNoteReMap[]>([]);
  userId: string;

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

  submitForm(): void {
    if(this.subjectSelectionForm.invalid) {
      return;
    }

    const { subject } = this.subjectSelectionForm.value;
    this.sharedUtilitySrv
        .getNotesBySubject(subject)
        .subscribe(
          (response: Subject_Note[]) => {
            const remapDataSource: MySubjectNoteReMap[]
            = response.map((note: Subject_Note, index: number): MySubjectNoteReMap => {
              const { Subject, Person, DateCreated, Id } = note;
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

  deleteNote(noteId: string): void {
    if(noteId) {
      const deleteNoteSub: Subscription =
      this.teacherSrv
          .deleteNote(noteId)
          .subscribe(
            (response: boolean) => {
              if(response) {
                //filter out the deleted Note from the total list if Notes
                const remappedNotes: MySubjectNoteReMap[] =
                this.dataSource
                    .filter((note: MySubjectNoteReMap) => note.Id !== noteId)
                    .map((note: MySubjectNoteReMap, index: number) => {
                      return {
                        Id: note.Id,
                        SerialNumber: index + 1,
                        CreatedBy: note.CreatedBy,
                        Subject: note.Subject,
                        DateCreated: note.DateCreated
                      }
                    });

                this.asyncDataSource.next(remappedNotes);
              }
            }
          );

        this.subscriptionList.push(deleteNoteSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
