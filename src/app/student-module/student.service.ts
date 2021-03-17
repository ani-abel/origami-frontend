import { Injectable } from "@angular/core";
import { QueryBaseService } from '../query-base.service';
import { MutationBaseService } from '../mutation-base.service';
import { SharedUtilityService } from '../shared-module/services/shared-utility.service';
import { Observable, Observer } from "rxjs";
import { Subject_Assignment_Submission, CustomApiType, OperationType, Subject_Exam_Submission, Subject_Ca, Subject_Ca_Submission } from '../services/origamiGraphql.service';
import { ApolloError } from 'apollo-client';

@Injectable()
export class StudentService {
  constructor(
    private readonly querySrv: QueryBaseService,
    private readonly mutationSrv: MutationBaseService,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  getAllStudentAssignmentsPerSubject(subjectId: string)
  : Observable<any> {
    return this.querySrv.getStudentAssignmentListPerSubject(subjectId);
  }

  getAllStudentAssignmentsPerSubjectOrderedByLatest(subjectId: string)
  : Observable<any> {
    return this.querySrv.getLatestSubjectAssignmentPerSubject(subjectId);
  }

  getStudentSubjectsForSL(): Observable<any> {
    return this.querySrv.getStudentSubjectsForSL();
  }

  getAssignmentUndoneByStudent(subjectId: string)
  : Observable<any> {
    return this.querySrv.getStudentUndoneAssignmentPerSubject(subjectId);
  }

  getAssignmentDoneByStudent(subjectId: string)
  : Observable<any> {
    return this.querySrv.getStudentDoneAssignmentPerSubject(subjectId);
  }

  getAssignment(assignmentId: string)
  : Observable<any> {
    return this.querySrv.getStudentSubjectAssignment(assignmentId);
  }

  getStudentAssignmentSubmission(assignmentId: string)
  : Observable<any> {
    return this.querySrv.getStudentSubjectAssignmentSubmission(assignmentId);
  }

  submitAssignment(attachedFile: string, assignmentId: string)
  : Observable<boolean> {
    return  Observable.create((observer: Observer<boolean>) => {
      try {
        const encryptedAttachment: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(attachedFile);
        if(encryptedAttachment) {
          this.mutationSrv
              .submitAssignment(encryptedAttachment, assignmentId)
              .subscribe(
                (response: Subject_Assignment_Submission) => {
                  if(response.Id) {
                    const message: string = "Assignment submitted";
                    this.sharedUtilitySrv.returnInfoMessage(message);
                    observer.next(true);
                  }
                  else {
                    const message: string = "Assignment submission failed";
                    this.sharedUtilitySrv.returnErrorMessage(message);
                    observer.next(false);
                  }
                  observer.complete();
                },
                (error: ApolloError) => {
                  this.sharedUtilitySrv.extractAndDisplayApolloError(error);
                  observer.next(false);
                  observer.complete();
                }
              );
        }
      }
      catch(ex) {
        throw ex;
      }
    });
  }

  getAssignmentScore(assignmentId: string): Observable<any> {
    return this.querySrv.getAssignmentScore(assignmentId);
  }

  getNotesForStudent(subjectId: string): Observable<any> {
    return this.querySrv.getNotesForStudent(subjectId);
  }

  getNoteForStudent(noteId): Observable<any> {
    return this.querySrv.getNoteForStudent(noteId);
  }

  getSubjectsAssignedToStudent(): Observable<any> {
    return this.querySrv.getSubjectsAssignedToAStudent();
  }

  getSubjectListStudentShouldEnrollFor(): Observable<any> {
    return this.querySrv.getSubjectListStudentShouldEnrollFor();
  }

  enrollStudentForSubjects(subjectList: string[]): void {
    this.mutationSrv
        .enrollStudentForSubjectList(subjectList)
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
            this.sharedUtilitySrv.extractAndDisplayApolloError(error);
          }
        );
  }

  getStudentExamsBySubjectId(subjectId): Observable<any> {
    return this.querySrv.getStudentExamsBySubjectId(subjectId);
  }

  getStudentUndoneExamsBySubjectId(subjectId: string): Observable<any> {
    return this.querySrv.getStudentUndoneExamsBySubjectId(subjectId);
  }

  getStudentDoneExamsBySubjectId(subjectId: string): Observable<any> {
    return this.querySrv.getStudentDoneExamsBySubjectId(subjectId);
  }

  getMyExam(examId: string): Observable<any> {
    return this.querySrv.getMyExam(examId);
  }

  getMyExamSubmission(examId: string): Observable<any> {
    return this.querySrv.getMyExamSubmission(examId);
  }

  registerExamParticipation(examId: string): Observable<any> {
    return this.mutationSrv.registerExamParticipation(examId);
  }

  submitExam(examText: string, examId: string)
  : Observable<boolean> {
    return  Observable.create((observer: Observer<boolean>) => {
      const encryptedExamContent: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(examText);
      this.mutationSrv
          .submitExam(encryptedExamContent, examId)
          .subscribe(
          (response: Subject_Exam_Submission) =>  {
            if(response.Id) {
              const message: string = "Exam was submitted successfully";
              this.sharedUtilitySrv.returnInfoMessage(message);
              observer.next(true);
            }
            else{
              const message: string = "Exam was not submitted Succesfully";
              this.sharedUtilitySrv.returnErrorMessage(message);
              observer.next(false);
            }
            observer.complete();
          },
          (error: ApolloError) => {
            this.sharedUtilitySrv.extractAndDisplayApolloError(error);
            observer.next(false);
            observer.complete();
          }
        );
    });
  }

  saveScreenshotFromExam(dataUrl: string, examParticipationId: string)
  : Observable<any> {
    return this.mutationSrv.saveScreenshotFromExam(dataUrl, examParticipationId);
  }

  getMyExamParticipation(examId: string): Observable<any> {
    return this.querySrv.getMyExamParticipation(examId);
  }

  getCATestsBySubject(subjectId: string): Observable<any> {
    return this.querySrv.getCATestsBySubject(subjectId);
  }

  getUndoneCATestsBySubject(subjectId: string): Observable<any> {
    return this.querySrv.getUndoneCATestsBySubject(subjectId);
  }

  getDoneCATestsBySubject(subjectId: string): Observable<any> {
    return this.querySrv.getDoneCATestsBySubject(subjectId);
  }

  getMyCATest(caTestId: string): Observable<any> {
    return this.querySrv.getMyCATest(caTestId);
  }

  getMyCATestSubmission(caTestId: string)
  : Observable<any> {
    return this.querySrv.getMyCATestSubmission(caTestId);
  }

  submitCaTest(caTestText: string, caTestId: string): Observable<any> {
    return Observable.create((observer: Observer<boolean>) => {
      const encryptedTextContent: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(caTestText);
      this.mutationSrv
          .submitCaTest(encryptedTextContent, caTestId)
          .subscribe(
            (response: Subject_Ca_Submission) => {
              if(response.Id) {
                const message: string = "Test submitted sucessfully";
                this.sharedUtilitySrv.returnInfoMessage(message);
                observer.next(true);
              }
              else {
                const message: string = "Test submitted failed";
                this.sharedUtilitySrv.returnErrorMessage(message);
                observer.next(false);
              }
              observer.complete();
            },
            (error: ApolloError) => {
              this.sharedUtilitySrv.extractAndDisplayApolloError(error);
              observer.next(false);
              observer.complete();
            }
          )
    });
  }

  saveScreenshotFromCATest(dataUrl: string, caTestParticipationId: string): Observable<any> {
    return this.mutationSrv.saveScreenshotFromCATest(dataUrl, caTestParticipationId);
  }

  registerCATestParticipation(caTestId: string): Observable<any> {
    return this.mutationSrv.registerCATestParticipation(caTestId);
  }

  getMyCATestParticipation(caTestId: string): Observable<any> {
    return this.querySrv.getMyCATestParticipation(caTestId);
  }
}
