import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { QueryBaseService } from '../query-base.service';
import { MutationBaseService } from '../mutation-base.service';
import {
  ClassCategory,
  School_Class,
  OperationType,
  CustomApiType,
  OrigamiRole,
  Teacher_Class,
  Subject
} from '../services/origamiGraphql.service';
import { SharedUtilityService } from '../shared-module/services/shared-utility.service';
import { ApolloError } from 'apollo-client';
import { Person } from '../services/origamiGraphql.service';

@Injectable()
export class AdminService {

  constructor(
    private readonly queryGQLSrv: QueryBaseService,
    private readonly mutationGQLSrv: MutationBaseService,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  getClassCategories(): Observable<any> {
    return this.queryGQLSrv.getClassCategories();
  }

  getClasses(): Observable<any> {
    return this.queryGQLSrv.getAllClasses();
  }

  createSchoolClass(name: string, category: ClassCategory) {
    try {
      this.mutationGQLSrv
          .createClass(name, category)
          .subscribe(
            (response: School_Class) => {
              if(response?.Name) {
                const message: string = `Class ${response.Name} created`;
                this.sharedUtilitySrv.returnInfoMessage(message);
              }
            },
            (error: ApolloError) => {
              const { message } = error[0].message;
              this.sharedUtilitySrv.returnErrorMessage(message);
            }
          );
    }
    catch(ex) {
      console.error(ex);
    }
  }

  deactivateClass(Id: string) {
    try {
      this.mutationGQLSrv
          .deactivateClass(Id)
          .subscribe(
            (response: CustomApiType) => {
              //Check to see if the Delete operation was successful
              if(response.OperationStatus === OperationType.Sucessfull) {
                this.sharedUtilitySrv.returnInfoMessage(response.Message);
              }
              else {
                this.sharedUtilitySrv.returnErrorMessage(response.Message);
              }
            },
            (error: ApolloError) => {
              const { message } = error[0].message;
              this.sharedUtilitySrv.returnErrorMessage(message);
            }
          );
    }
    catch(ex) {
      console.error(ex);
    }
  }

  getAClassById(Id: string): Observable<any> {
    return this.queryGQLSrv.getSchoolClassById(Id);
  }

  updateSchoolClass(Id: string, Name: string, Category: ClassCategory): void {
    this.mutationGQLSrv
        .updateSchoolClass(Id, Name, Category)
        .subscribe(
          (response: CustomApiType) => {
            if(response.OperationStatus === OperationType.Sucessfull) {
              this.sharedUtilitySrv.returnInfoMessage(response.Message);
            }
            else {
              this.sharedUtilitySrv.returnErrorMessage(response.Message);
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
          }
        );
  }

  getUserListByRole(role: OrigamiRole): Observable<any> {
    return this.queryGQLSrv.getUserListByRole(role);
  }

  assignTeacherToClass(classId: string, personId: string): void {
    this.mutationGQLSrv
        .assignTeacherToClass(classId, personId)
        .subscribe(
          (response: Teacher_Class) => {
            if(response.Id) {
              const message: string = "Class assignment successful";
              this.sharedUtilitySrv.returnInfoMessage(message);
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
          }
        )
  }

  getAllActiveSubjects(): Observable<any> {
    return this.queryGQLSrv.getAllActiveSubjects();
  }

  deactivateSubject(Id: string) {
    try {
      this.mutationGQLSrv
          .deleteSubjectFromList(Id)
          .subscribe(
            (response: CustomApiType) => {
              //Check to see if the Delete operation was successful
              if(response.OperationStatus === OperationType.Sucessfull) {
                this.sharedUtilitySrv.returnInfoMessage(response.Message);
              }
              else {
                this.sharedUtilitySrv.returnErrorMessage(response.Message);
              }
            },
            (error: ApolloError) => {
              const { message } = error[0].message;
              this.sharedUtilitySrv.returnErrorMessage(message);
            }
          );
    }
    catch(ex) {
      console.error(ex);
    }
  }

  createNewSubject(subjectName: string, classCategory: ClassCategory): void {
    try {
      this.mutationGQLSrv
          .createSubject(subjectName, classCategory)
          .subscribe(
            (response: Subject) => {
              const message: string = `Subject '${response.Name}' was created`;
              this.sharedUtilitySrv.returnInfoMessage(message);
            },
            (error: ApolloError) => {
              const { message } = error[0].message;
              this.sharedUtilitySrv.returnErrorMessage(message);
            }
          )

    }
    catch(ex) {
      console.error(ex);
    }
  }

  updateSubject(Id: string, subjectName: string, classCategory: ClassCategory): void {
    try {
      this.mutationGQLSrv
          .updateExistingSubject(Id, subjectName, classCategory)
          .subscribe(
            (response: CustomApiType) => {
              if(response.OperationStatus === OperationType.Sucessfull) {
                this.sharedUtilitySrv.returnInfoMessage(response.Message);
              }
              else {
                this.sharedUtilitySrv.returnErrorMessage(response.Message);
              }
            },
            (error: ApolloError) => {
              const { message } = error[0].message;
              this.sharedUtilitySrv.returnErrorMessage(message);
            }
          )
    }
    catch(ex) {
      console.log(ex);
    }
  }

  getSubjectById(Id: string): Observable<any> {
    return this.queryGQLSrv.getSubjectById(Id);
  }

  getOrigamiRoles(): Observable<any> {
    return this.queryGQLSrv.getOrigamiRoles();
  }

  getActiveClassesForSL(): Observable<any> {
    return this.queryGQLSrv.getActiveClassesForSelectList();
  }

  registerOrigamiUser(
    firstName: string,
    lastName: string,
    email: string,
    userRole: OrigamiRole,
    classId?: string
  ): void {
    this.mutationGQLSrv
        .registerOrigamiUser(firstName, lastName, email, userRole, classId)
        .subscribe(
          (response: Person) => {
            if(response.Id) {
              this.sharedUtilitySrv.returnInfoMessage("User created");
            }
            else {
              this.sharedUtilitySrv.returnErrorMessage("Something went wrong");
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
          }
        );
  }

  updateOrigamiUser(Id: string, email: string, firstName: string, lastName: string): void {
    this.mutationGQLSrv
        .updateOrigamiUser(Id, email, firstName, lastName)
        .subscribe(
          (response: Person) => {
            if(response.Id) {
              this.sharedUtilitySrv.returnInfoMessage("user updated");
            }
            else {
              this.sharedUtilitySrv.returnErrorMessage("Updated failed");
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
          }
        )
  }

  getUserById(Id: string): Observable<any> {
    return this.queryGQLSrv.getPersonById(Id);
  }

  deactivateUser(Id: string): void {
    this.mutationGQLSrv
        .deactivateUser(Id)
        .subscribe(
          (response: CustomApiType) => {
            if(response.OperationStatus === OperationType.Sucessfull) {
              this.sharedUtilitySrv.returnInfoMessage(response.Message);
            }
            else {
              this.sharedUtilitySrv.returnErrorMessage(response.Message);
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
          }
        );
  }

  assignSubjectListToTeacher(teacherId: string, subjects: string[]): void {
    this.mutationGQLSrv
        .assignSubjectListToTeacher(teacherId, subjects)
        .subscribe(
          (response: CustomApiType) => {
            if(response.OperationStatus === OperationType.Sucessfull) {
              this.sharedUtilitySrv.returnInfoMessage(response.Message);
            }
            else {
              this.sharedUtilitySrv.returnErrorMessage(response.Message);
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
          }
        );
  }

  getStudentsBySubjectsOffered(subjectId: string): Observable<any> {
    return this.queryGQLSrv.getStudentBySubject(subjectId);
  }

  getProfileImage(userId: string): Observable<any> {
    return this.queryGQLSrv.getProfileImage(userId);
  }
}
