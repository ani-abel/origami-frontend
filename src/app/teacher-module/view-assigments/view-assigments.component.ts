import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Subject } from '../../services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { Subject_Assignment } from '../../services/origamiGraphql.service';
import { SubjectAssignmentListReMap } from 'src/app/types/internal-types.type';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-view-assigments',
  templateUrl: './view-assigments.component.html',
  styleUrls: ['./view-assigments.component.css']
})
export class ViewAssigmentsComponent implements
OnInit,
OnDestroy {
  subjectSelectionForm: FormGroup;
  subjectList$: Observable<Subject[]>;
  userId: string;
  dataSource: SubjectAssignmentListReMap[] = [];
  asyncDataStore: BehaviorSubject<SubjectAssignmentListReMap[]> = new BehaviorSubject<SubjectAssignmentListReMap[]>([]);
  displayedColumns: string[] = [
    'S/N',
    'Subject',
    'DateCreated',
    'DueDate',
    'TotalExpectedScore',
    "Actions"
  ];
  subscriptionList: Subscription[] = [];

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly teacherSrv: TeacherService,
    private readonly  authSrv: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.userId = this.authSrv.getUserId();
    if(this.userId) {
      this.subjectList$ = this.sharedUtilitySrv.getSubjectListAssignedToTeacher(this.userId);
    }
    this.initForm();
  }

  initForm(): void {
    this.subjectSelectionForm = new FormGroup({
        "subject": new FormControl(null, Validators.compose([
                                          Validators.required
                            ]))
    });
  }

  deleteAssignment(Id: string): void {
    const deleteAssignmentSubscription: Subscription =
    this.teacherSrv
        .deleteAssignment(Id)
        .subscribe(
          (response: boolean) => {
            if(response) {
              const newDataStoreValue: SubjectAssignmentListReMap[] = this.dataSource
                                                                          .filter((assignment: SubjectAssignmentListReMap) => assignment.Id !== Id)
                                                                          .map((assignment: SubjectAssignmentListReMap, index: number) => {
                                                                            const { DateCreated, DueDate, TotalExpectedScore, Id, Subject } = assignment;
                                                                            return {
                                                                              Id,
                                                                              DateCreated,
                                                                              DueDate,
                                                                              TotalExpectedScore,
                                                                              SerialNumber: index + 1,
                                                                              Subject
                                                                            }
                                                                          });

              if(newDataStoreValue?.length > 0) {
                this.asyncDataStore.next(newDataStoreValue);
              }
              else {
                this.asyncDataStore.next([]);
              }
            }
          },
          (error) => {
            throw error;
          }
        );

    this.subscriptionList.push(deleteAssignmentSubscription);
  }

  submitForm(): void {
    if(this.subjectSelectionForm.invalid) {
      return;
    }

    const { subject } = this.subjectSelectionForm.value;

    const getAssignmentSubscription: Subscription =
    this.sharedUtilitySrv
        .getAssignmentsBySubject(subject)
        .subscribe(
          (response: Subject_Assignment[]) => {
            const reMappedArray: SubjectAssignmentListReMap[] = response.map((assignment: Subject_Assignment, index: number) => {
              const { DateCreated, DueDate, TotalExpectedScore, Id, Subject } = assignment;
              return {
                Id,
                DateCreated,
                DueDate,
                TotalExpectedScore,
                SerialNumber: index + 1,
                Subject: Subject.Name
              }
            });

            this.asyncDataStore.next(reMappedArray);

            const asyncDataStoreSubscription: Subscription =
            this.asyncDataStore
                .asObservable()
                .subscribe(
                  (response: SubjectAssignmentListReMap[]) => {
                    this.dataSource = response
                  },
                  (error) => {
                    throw error;
                  }
                );

            this.subscriptionList.push(asyncDataStoreSubscription);
          }
        );

    this.subscriptionList.push(getAssignmentSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
