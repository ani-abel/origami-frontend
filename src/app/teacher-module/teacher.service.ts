import { Injectable } from "@angular/core";
import { ApolloError } from "apollo-client";
import { Observable, Observer } from "rxjs";
import { SharedUtilityService } from "../shared-module/services/shared-utility.service";
import { QueryBaseService } from "../query-base.service";
import { MutationBaseService } from "../mutation-base.service";
import {
  Subject_Ca,
  ContinousAssesmentType,
  Subject_Note,
  Subject_Assignment_Score,
  Subject_Ca_Score,
  Subject_Exam_Score,
  ExamType,
  AllocatedTimeInterval,
  Subject_Exam,
  Subject_Assignment,
  CustomApiType,
  OperationType,
  Subject_Topic,
} from "../services/origamiGraphql.service";

@Injectable()
export class TeacherService {
  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly queryGQLSrv: QueryBaseService,
    private readonly mutationGQLSrv: MutationBaseService
  ) {}

  createAssignment(
    subjectId: string,
    content: string,
    totalExpectedScore: number,
    dueDate: Date,
    subjectTopicId: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      try {
        const encodedContent: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(
          content
        );

        this.mutationGQLSrv
          .createNewAssignment(
            subjectId,
            encodedContent,
            totalExpectedScore,
            dueDate,
            subjectTopicId
          )
          .subscribe(
            (response: Subject_Assignment) => {
              if (response.Id) {
                const message: string = "Assignment created";
                this.sharedUtilitySrv.returnInfoMessage(message);
                observer.next(true);
              } else {
                const message: string = "Assignment Created failed";
                this.sharedUtilitySrv.returnErrorMessage(message);
                observer.next(false);
              }

              observer.complete();
            },
            (error: ApolloError) => {
              const { message } = error[0].message;
              this.sharedUtilitySrv.returnErrorMessage(message);
              observer.next(false);
              observer.complete();
            }
          );
      } catch (ex) {
        throw ex;
      }
    });
  }

  updateAssignment(
    assignmentId: string,
    dueDate: Date,
    subjectId: string,
    totalExpectedScore: number,
    attachedFile?: string,
    subjectTopicId?: string
  ): void {
    this.mutationGQLSrv
      .updateAssignment(
        assignmentId,
        dueDate,
        subjectId,
        totalExpectedScore,
        attachedFile,
        subjectTopicId
      )
      .subscribe(
        (response: CustomApiType) => {
          if (response.OperationStatus === OperationType.Sucessfull) {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
          } else {
            this.sharedUtilitySrv.returnErrorMessage(response.Message);
          }
        },
        (error: ApolloError) => {
          const { message } = error[0].message;
          this.sharedUtilitySrv.returnErrorMessage(message);
        }
      );
  }

  deleteAssignment(assignmentId: string): Observable<boolean> {
    const assignmentWasDeleted = Observable.create(
      (observer: Observer<boolean>) => {
        this.mutationGQLSrv.deleteAssignment(assignmentId).subscribe(
          (response: CustomApiType) => {
            if (response.OperationStatus === OperationType.Sucessfull) {
              this.sharedUtilitySrv.returnInfoMessage(response.Message);
              observer.next(true);
            } else {
              this.sharedUtilitySrv.returnErrorMessage(response.Message);
              observer.next(false);
            }
            observer.complete();
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilitySrv.returnErrorMessage(message);
            observer.next(false);

            observer.complete();
          }
        );
      }
    );

    return assignmentWasDeleted;
  }

  getAssignmentSubmissionList(assignmentId: string): Observable<any> {
    return this.queryGQLSrv.getAssignmentSubmissionList(assignmentId);
  }

  gradeAssignment(
    submissionId: string,
    score: number,
    remark?: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.mutationGQLSrv
        .gradeAssignment(submissionId, score, remark)
        .subscribe(
          (response: Subject_Assignment_Score) => {
            if (response.Id) {
              this.sharedUtilitySrv.returnInfoMessage("Score was successfully");
              observer.next(true);
            } else {
              this.sharedUtilitySrv.returnErrorMessage("Scoring failed");
              observer.next(true);
            }
            observer.complete();
          },
          (error: ApolloError) => {
            throw error;
            this.sharedUtilitySrv.extractAndDisplayApolloError(error);
            observer.next(false);
            observer.complete();
          }
        );
    });
  }

  gradeCATest(
    submissionId: string,
    score: number,
    remark?: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.mutationGQLSrv.gradeCATest(submissionId, score, remark).subscribe(
        (response: Subject_Ca_Score) => {
          if (response.Id) {
            this.sharedUtilitySrv.returnInfoMessage("Score was successfully");
            observer.next(true);
          } else {
            this.sharedUtilitySrv.returnErrorMessage("Scoring failed");
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

  gradeExam(
    submissionId: string,
    score: number,
    remark?: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.mutationGQLSrv.gradeExam(submissionId, score, remark).subscribe(
        (response: Subject_Exam_Score) => {
          if (response.Id) {
            this.sharedUtilitySrv.returnInfoMessage("Scoring was successfull");
            observer.next(true);
          } else {
            this.sharedUtilitySrv.returnErrorMessage("Scoring failed");
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

  giveExam(
    examType: ExamType,
    allocatedTime: AllocatedTimeInterval,
    selectedDateTime: Date,
    totalExpectedScore: number,
    subjectId: string,
    attachedFile: string,
    startTime: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      const encryptedFile: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(
        attachedFile
      );

      this.mutationGQLSrv
        .giveExam(
          examType,
          allocatedTime,
          selectedDateTime,
          totalExpectedScore,
          subjectId,
          encryptedFile,
          startTime
        )
        .subscribe(
          (response: Subject_Exam) => {
            if (response.Id) {
              this.sharedUtilitySrv.returnInfoMessage(
                "Exam created sucessfully"
              );
              observer.next(true);
            } else {
              this.sharedUtilitySrv.returnErrorMessage("Exam creation failed");
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

  getExamsCreatedByTeacher(): Observable<any> {
    return this.queryGQLSrv.getExamsCreatedByTeacher();
  }

  getOngoingExamsCreatedByTeacher(): Observable<any> {
    return this.queryGQLSrv.getOngoingExamsCreatedByTeacher();
  }

  getCAParticipation(caId: string): Observable<any> {
    return this.queryGQLSrv.getCAParticipation(caId);
  }

  getExamParticipation(examId: string): Observable<any> {
    return this.queryGQLSrv.getExamParticipation(examId);
  }

  getExamParticipationScreenshots(
    examParticipationId: string
  ): Observable<any> {
    return this.queryGQLSrv.getExamParticipationScreenshots(
      examParticipationId
    );
  }

  getCAParticipationScreenshots(caParticipationId: string): Observable<any> {
    return this.queryGQLSrv.getCAParticipationScreenshots(caParticipationId);
  }

  getExamSubmissions(examId: string): Observable<any> {
    return this.queryGQLSrv.getExamSubmissions(examId);
  }

  getCASubmissions(caId: string): Observable<any> {
    return this.queryGQLSrv.getCASubmissions(caId);
  }

  getAllCATestsCreatedByTeacher(): Observable<any> {
    return this.queryGQLSrv.getAllCATestsCreatedByTeacher();
  }

  giveCATest(
    totalExpectedScore: number,
    allocatedTime: AllocatedTimeInterval,
    selectedDateTime: Date,
    subjectId: string,
    attachedFile: string,
    continousAssesmentType: ContinousAssesmentType,
    timeString: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      const encryptedFile: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(
        attachedFile
      );

      this.mutationGQLSrv
        .giveCATest(
          totalExpectedScore,
          allocatedTime,
          selectedDateTime,
          subjectId,
          encryptedFile,
          continousAssesmentType,
          timeString
        )
        .subscribe(
          (response: Subject_Ca) => {
            if (response?.Id) {
              const message: string = "CA Test added sucessfully";
              this.sharedUtilitySrv.returnInfoMessage(message);
              observer.next(true);
            } else {
              const message: string = "Adding CA Test failed";
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

  getOngoingCATestsCreatedByTeacher(): Observable<any> {
    return this.queryGQLSrv.getOngoingCATestsCreatedByTeacher();
  }

  giveNote(
    subjectId: string,
    attachedFile: string,
    subjectTopicId: string
  ): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      const encryptedAttachment: string = this.sharedUtilitySrv.encodeTextWithBase64Encyption(
        attachedFile
      );
      this.mutationGQLSrv
        .giveNote(subjectId, encryptedAttachment, subjectTopicId)
        .subscribe(
          (response: Subject_Note) => {
            if (response.Id) {
              const message: string = "Note was created sucessfully";
              this.sharedUtilitySrv.returnInfoMessage(message);
              observer.next(true);
            } else {
              const message: string = "Note creation failed";
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

  updateNote(
    noteId: string,
    subjectId: string,
    attachedFile: string,
    subjectTopic: string
  ): void {
    if (attachedFile) {
      attachedFile = this.sharedUtilitySrv.encodeTextWithBase64Encyption(
        attachedFile
      );
    }

    this.mutationGQLSrv
      .updateNote(noteId, subjectId, attachedFile, subjectTopic)
      .subscribe(
        (response: CustomApiType) => {
          if (response.OperationStatus === OperationType.Sucessfull) {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
          } else {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
          }
        },
        (error: ApolloError) => {
          this.sharedUtilitySrv.extractAndDisplayApolloError(error);
        }
      );
  }

  deleteNote(subjectNoteId: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.mutationGQLSrv.deleteNote(subjectNoteId).subscribe(
        (response: CustomApiType) => {
          if (response.OperationStatus === OperationType.Sucessfull) {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
            observer.next(true);
          } else {
            this.sharedUtilitySrv.returnErrorMessage(response.Message);
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

  updateAssignmentScore(
    submissionId: string,
    remark?: string,
    score?: number
  ): void {
    this.mutationGQLSrv
      .updateAssignmentScore(submissionId, remark, score)
      .subscribe(
        (response: CustomApiType) => {
          if (response.OperationStatus === OperationType.Sucessfull) {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
          } else {
            this.sharedUtilitySrv.returnErrorMessage(response.Message);
          }
        },
        (error: ApolloError) => {
          this.sharedUtilitySrv.extractAndDisplayApolloError(error);
        }
      );
  }

  updateCaTestScore(
    submissionId: string,
    remark?: string,
    score?: number
  ): void {
    this.mutationGQLSrv
      .updateCaTestScore(submissionId, remark, score)
      .subscribe(
        (response: CustomApiType) => {
          if (response.OperationStatus === OperationType.Sucessfull) {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
          } else {
            this.sharedUtilitySrv.returnErrorMessage(response.Message);
          }
        },
        (error: ApolloError) => {
          this.sharedUtilitySrv.extractAndDisplayApolloError(error);
        }
      );
  }

  updateExamScore(submissionId: string, remark?: string, score?: number): void {
    this.mutationGQLSrv.updateExamScore(submissionId, remark, score).subscribe(
      (response: CustomApiType) => {
        if (response.OperationStatus === OperationType.Sucessfull) {
          this.sharedUtilitySrv.returnInfoMessage(response.Message);
        } else {
          this.sharedUtilitySrv.returnErrorMessage(response.Message);
        }
      },
      (error: ApolloError) => {
        this.sharedUtilitySrv.extractAndDisplayApolloError(error);
      }
    );
  }

  getExamParticipationList(examId: string): Observable<any> {
    return this.queryGQLSrv.getExamParticipationList(examId);
  }

  getTopicsForASubject(subjectId: string): Observable<any> {
    return this.queryGQLSrv.getTopicsForASubject(subjectId);
  }

  createTopic(subjectId: string, title: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.mutationGQLSrv.createTopic(subjectId, title).subscribe(
        (response: Subject_Topic) => {
          if (response.Id) {
            this.sharedUtilitySrv.returnInfoMessage("Topic created");
            observer.next(true);
          } else {
            this.sharedUtilitySrv.returnErrorMessage("Topic creation failed");
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

  getTopicsBySubjectId(subjectId: string): Observable<any> {
    return this.queryGQLSrv.getTopicsBySubjectId(subjectId);
  }

  getTopicById(subjectTopicId: string): Observable<any> {
    return this.queryGQLSrv.getTopicById(subjectTopicId);
  }

  updateTopic(
    id: string,
    title?: string,
    subjectId?: string
  ): Observable<boolean> {
    try {
      return Observable.create((observer: Observer<boolean>) => {
        this.mutationGQLSrv.updateTopic(id, title, subjectId).subscribe(
          (response: CustomApiType) => {
            if (response.OperationStatus === OperationType.Sucessfull) {
              this.sharedUtilitySrv.returnInfoMessage(response.Message);
              observer.next(true);
            } else {
              this.sharedUtilitySrv.returnErrorMessage(response.Message);
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
    } catch (ex) {
      throw ex;
    }
  }

  deleteTopic(subjectTopicId: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.mutationGQLSrv.deactivateTopic(subjectTopicId).subscribe(
        (response: CustomApiType) => {
          if (response.OperationStatus === OperationType.Sucessfull) {
            this.sharedUtilitySrv.returnInfoMessage(response.Message);
            observer.next(true);
          } else {
            this.sharedUtilitySrv.returnErrorMessage(response.Message);
            observer.next(true);
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
}
