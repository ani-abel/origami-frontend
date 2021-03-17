import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MeesageDialogComponent } from '../meesage-dialog/meesage-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, merge, fromEvent, Observer } from 'rxjs';
import { ApolloError } from 'apollo-client';
import { Base64 } from 'js-base64';
import { environment } from '../../../environments/environment';
import { Subject, CustomApiType, OperationType, School_Class, Person } from '../../services/origamiGraphql.service';
import { QueryBaseService } from 'src/app/query-base.service';
import { MutationBaseService } from 'src/app/mutation-base.service';
import { UpdateProfile, AllocatedTimeInterval } from '../../types/internal-types.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class SharedUtilityService {

  constructor(
    private dialog: MatDialog,
    private readonly httpClientSrv: HttpClient,
    private readonly queryGQLSrv: QueryBaseService,
    private readonly mutationGQLSrv: MutationBaseService,
  ) { }

  returnErrorMessage(message: string): void {
    this.dialog.open(ErrorDialogComponent, { data: { message } });
  }

  returnInfoMessage(message: string): void {
    this.dialog.open(MeesageDialogComponent, { data: { message } });
  }

  extractAndDisplayApolloError(error: ApolloError): void {
    const { message } = error[0]?.message;
    this.returnErrorMessage(message);
  }

  uploadSubjectBulkList(formData: FormData): void {
    try {
      this.httpClientSrv
          .post<Subject[]>(`${environment.httpRoot}/file-upload/add-subject-in-bulk`, formData)
          .subscribe(
            (response) => {
              this.returnInfoMessage("File uploaded");
            },
            (error: HttpErrorResponse) => {
              this.returnErrorMessage(error.error.message);
            }
          );
    }
    catch(ex) {
      throw ex;
    }
  }

  uploadClassBulkList(formData: FormData): void {
    try {
      this.httpClientSrv
          .post<School_Class[]>(`${environment.httpRoot}/file-upload/add-class-in-bulk`, formData)
          .subscribe(
            (response: School_Class[]) => {
              this.returnInfoMessage("File uploaded");
            },
            (error: HttpErrorResponse) => {
              this.returnErrorMessage(error.error.message);
            }
          );
    }
    catch(ex) {
      throw ex;
    }
  }

  uploadStudentBulkList(formData: FormData): void {
    try {
      this.httpClientSrv
          .post<CustomApiType>(`${environment.httpRoot}/file-upload/add-student-in-bulk`, formData)
          .subscribe(
            (response: CustomApiType) => {
              if(response.OperationStatus === OperationType.Sucessfull) {
                this.returnInfoMessage(response.Message);
              }
            },
            (error: HttpErrorResponse) => {
              this.returnErrorMessage(error.error.message);
            }
          );
    }
    catch(ex) {
      throw ex;
    }
  }

  uploadTeacherBulkList(formData: FormData): void {
    try {
      this.httpClientSrv
          .post<Person[]>(`${environment.httpRoot}/file-upload/add-teacher-in-bulk`, formData)
          .subscribe(
            (response: Person[]) => {
              if(response?.length > 0) {
                this.returnInfoMessage("File Uploaded");
              }
            },
            (error: HttpErrorResponse) => {
              this.returnErrorMessage(error.error.message);
            }
          );
    }
    catch(ex) {
      throw ex;
    }
  }

  encodeTextWithBase64Encyption(text: string): string {
    return Base64.encode(text);
  }

  decodeTextWithBase64Encyption(encodedText: string): string {
    return Base64.decode(encodedText);
  }

  getAllActiveSubjects(): Observable<any> {
    return this.queryGQLSrv.getAllActiveSubjects();
  }

  getSubjectListAssignedToTeacher(userId: string): Observable<any> {
    return this.queryGQLSrv.getSubjectListAssignedToTeacher(userId);
  }

  getProfile(): Observable<any> {
    return this.queryGQLSrv.getProfile();
  }

  updateProfileWithImage(updateProfile: UpdateProfile): void {
    this.mutationGQLSrv
        .updateProfileWithImage(updateProfile)
        .subscribe(
          (response: CustomApiType) => {
            //Check to see if the Delete operation was successful
            if(response.OperationStatus === OperationType.Sucessfull) {
              this.returnInfoMessage(response.Message);
            }
            else {
              this.returnErrorMessage(response.Message);
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.returnErrorMessage(message);
          }
        );
  }

  updateProfileWithoutImage(updateProfile: UpdateProfile): void {
    this.mutationGQLSrv
        .updateProfile(updateProfile)
        .subscribe(
          (response: CustomApiType) => {
            //Check to see if the Delete operation was successful
            if(response.OperationStatus === OperationType.Sucessfull) {
              this.returnInfoMessage(response.Message);
            }
            else {
              this.returnErrorMessage(response.Message);
            }
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.returnErrorMessage(message);
          }
        );
  }

  getAssignmentById(assignmentId: string): Observable<any> {
    return this.queryGQLSrv.getAssignmentById(assignmentId);
  }

  getAssignmentsBySubject(subjectId: string): Observable<any> {
    return this.queryGQLSrv.getAssignmentsBySubject(subjectId);
  }

  getAttachedFileFromAssignmentSubmission(assignmentSubmissionId: string)
  : Observable<any> {
    return this.queryGQLSrv.getAttachedFileFromAssignmentSubmission(assignmentSubmissionId);
  }

  getAllocatedTime()
  : Observable<any> {
    return this.queryGQLSrv.getAllocatedTime();
  }

  getExamTypes()
  : Observable<any> {
    return this.queryGQLSrv.getExamType();
  }

  getExamSubmission(examSubmissionId: string): Observable<any> {
    return this.queryGQLSrv.getExamSubmission(examSubmissionId);
  }

  getCASubmission(caSubmissionId: string): Observable<any> {
    return this.queryGQLSrv.getCASubmission(caSubmissionId);
  }

  getCATypes(): Observable<any> {
    return this.queryGQLSrv.getCATypes();
  }

  getNoteById(subjectNoteId: string): Observable<any> {
    return this.queryGQLSrv.getNoteById(subjectNoteId);
  }

  getNotesBySubject(subjectId: string)
  : Observable<any> {
    return this.queryGQLSrv.getNotesBySubject(subjectId);
  }

  getFileNameFromUrl(url: string)
  : string {
    let fileName: string;
    const fileNameUrl: string[] = url.split("/");

    if(fileNameUrl?.length > 0) {
      fileName = fileNameUrl[fileNameUrl.length - 1];
    }

    return fileName;
  }

  getAssignmentScoreById(assignmentSubmissionId: string)
  : Observable<any> {
    return this.queryGQLSrv.getAssignmentScoreById(assignmentSubmissionId);
  }

  getCAScoreById(caSubmissionId: string)
  : Observable<any> {
    return this.queryGQLSrv.getCAScoreById(caSubmissionId);
  }

  getExamScoreById(examSubmissionId: string)
  : Observable<any> {
    return this.queryGQLSrv.getExamScoreById(examSubmissionId);
  }

  convertToRealTime(selectedDateTime: Date, allocatedTime: AllocatedTimeInterval | string)
    : Date {
        switch(allocatedTime) {
            case AllocatedTimeInterval.FIFTEEN_MINUTES:
                selectedDateTime.setMinutes(15);
              break;
            case AllocatedTimeInterval.FOURTY_FIVE_MINUTES:
                selectedDateTime.setMinutes(45);
              break;
            case AllocatedTimeInterval.THIRTY_MINUTES:
                selectedDateTime.setMinutes(30);
              break;
            case AllocatedTimeInterval.ONE_HOUR:
                selectedDateTime.setMinutes(60);
              break;
            case AllocatedTimeInterval.ONE_HOUR_FOUTY_FIVE_MINUTES:
                const totalMinutes: number = 60 + 45;
                const plusTotalMinutes: number = selectedDateTime.getMinutes() + totalMinutes;
                selectedDateTime.setMinutes(plusTotalMinutes);
              break;
            case AllocatedTimeInterval.ONE_HOUR_THRITY_MINUTES:
                const oneHourThirty: number = 60 + 30;
                const plusOneHourThirty: number = selectedDateTime.getMinutes() + oneHourThirty;
                selectedDateTime.setMinutes(plusOneHourThirty);
              break;
            case AllocatedTimeInterval.TWO_HOURS:
                const twoHours: number = 60 + 60;
                const plusTwoHours: number = selectedDateTime.getMinutes() + twoHours;
                selectedDateTime.setMinutes(plusTwoHours);
              break;
            case AllocatedTimeInterval.TWO_HOURS_THRITY_MINUTES:
                const twoHoursThirtyMinutes: number = 60 + 60 + 30;
                const plusTwoHoursThirty: number = selectedDateTime.getMinutes() + twoHoursThirtyMinutes;
                selectedDateTime.setMinutes(plusTwoHoursThirty);
              break;
            case AllocatedTimeInterval.TWO_HOUR_FOUTY_FIVE_MINUTES:
                const twoHoursFourtyFiveMinutes: number = 60 + 60 + 45;
                const plusTwoHoursFourtyFive: number = selectedDateTime.getMinutes() + twoHoursFourtyFiveMinutes;
                selectedDateTime.setMinutes(plusTwoHoursFourtyFive);
              break;
        }

        return selectedDateTime;
    }

    convertAllocatedTimeIntervalsToSeconds(timeInterval: AllocatedTimeInterval | string): number {
      let timeInSeconds: number;
      const oneHour: number = 3600;
      const twoHours: number = oneHour * 2;
      const fourtyFiveMinutes: number = 2700;
      const thirtyMinutes: number = 1800;
      const fifteenMinutes: number = 900;

      switch(timeInterval) {
        case AllocatedTimeInterval.FIFTEEN_MINUTES:
          timeInSeconds = fifteenMinutes;
          break;
          case AllocatedTimeInterval.THIRTY_MINUTES:
            timeInSeconds = thirtyMinutes;
            break;
        case AllocatedTimeInterval.FOURTY_FIVE_MINUTES:
          timeInSeconds = fourtyFiveMinutes;
          break;
        case AllocatedTimeInterval.ONE_HOUR:
          timeInSeconds = oneHour;
          break;
        case AllocatedTimeInterval.ONE_HOUR_THRITY_MINUTES:
          timeInSeconds = oneHour + thirtyMinutes;
          break;
        case AllocatedTimeInterval.ONE_HOUR_FOUTY_FIVE_MINUTES:
          timeInSeconds = oneHour + fourtyFiveMinutes;
          break;
        case AllocatedTimeInterval.TWO_HOURS:
          timeInSeconds = twoHours;
          break;
        case AllocatedTimeInterval.TWO_HOURS_THRITY_MINUTES:
          timeInSeconds = twoHours + thirtyMinutes;
          break;
        case AllocatedTimeInterval.TWO_HOUR_FOUTY_FIVE_MINUTES:
          timeInSeconds = twoHours + fourtyFiveMinutes;
          break;
        default:
          timeInSeconds = 0;
          break;
      }

      return timeInSeconds;
    }

    convertToTimeString(timestamp: number): string {
      const hours = Math.floor(timestamp / 60 / 60);
      const minutes = Math.floor(timestamp / 60) - (hours * 60);
      const seconds = timestamp % 60;

      return `${hours}:${minutes}:${seconds}`;
    }

    createOnline$(): Observable<boolean> {
      return merge<boolean>(
        fromEvent(window, 'offline').pipe(map(() => false)),
        fromEvent(window, 'online').pipe(map(() => true)),
        new Observable((sub: Observer<boolean>) => {
          sub.next(navigator.onLine);
          sub.complete();
        }));
    }
}
