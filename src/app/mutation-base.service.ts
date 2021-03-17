import { Injectable } from '@angular/core';
import {
  LoginGQL,
  CreateSchoolClassGQL,
  ClassCategory,
  DeactivateSchoolClassGQL,
  UpdateClassGQL,
  AssignClassToTeacherGQL,
  UpdateSubjectGQL,
  RegisterUserGQL,
  OrigamiRole,
  AssignSubjectToTeacherGQL,
  UpdateSubjectAssignmentGQL,
  GiveSubjectAssignmentGQL,
  DeleteSubjectAssignmentGQL,
  GiveSubjectExamGQL,
  ExamType,
  GiveSubjectCaTestGQL,
  GiveSubjectNoteGQL,
  UpdateSubjectNoteGQL,
  DeleteSubjectGQL,
  CreateSubjectGQL,
  UpdateUserGQL,
  DeactivateUserGQL,
  UpdateUserProfileWithoutImageGQL,
  GradeAssignmentGQL,
  GradeCaTestGQL,
  GradeExamGQL,
  AllocatedTimeInterval,
  ContinousAssesmentType,
  DeleteSubjectNoteGQL,
  SubmitSubjectAssignmentGQL,
  EnrollStudentForSubjectsGQL,
  UpdateAssignmentGradeScoreGQL,
  UpdateExamGradeScoreGQL,
  UpdateCaTestGradeScoreGQL,
  CreateSubjectExamParticipationGQL,
  SubmitSubjectExamGQL,
  SaveExamScreenshotGQL,
  SubmitSubjectCaTestGQL,
  SaveCaTestScreenshotGQL,
  CreateSubjectCaTestParticipationGQL,
  CreateSubjectTopicGQL,
  UpdateSubjectTopicGQL,
  DeactivateSubjectTopicGQL
} from './services/origamiGraphql.service';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { ApolloError } from 'apollo-client';
import { UpdateProfile } from './types/internal-types.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CustomApiType } from './services/origamiGraphql.service';


@Injectable({
  providedIn: 'root'
})
export class MutationBaseService {

  constructor(
    private loginService: LoginGQL,
    private createClassService: CreateSchoolClassGQL,
    private deactivateClassService: DeactivateSchoolClassGQL,
    private updateClass: UpdateClassGQL,
    private assignClassToTeacher: AssignClassToTeacherGQL,
    private deleteSubject: DeleteSubjectGQL,
    private createNewSubject: CreateSubjectGQL,
    private updateSubject: UpdateSubjectGQL,
    private registerUser:  RegisterUserGQL,
    private updateUser: UpdateUserGQL,
    private deleteOrigamiUser: DeactivateUserGQL,
    private assignSubjectToTeacher: AssignSubjectToTeacherGQL,
    private updateUserProfile: UpdateUserProfileWithoutImageGQL,
    private createAssignment: GiveSubjectAssignmentGQL,
    private updateSubjectAssignment: UpdateSubjectAssignmentGQL,
    private deleteSubjectAssignment: DeleteSubjectAssignmentGQL,
    private gradeSubjectAssignment: GradeAssignmentGQL,
    private gradeSubjectCATest: GradeCaTestGQL,
    private gradeSubjectExam: GradeExamGQL,
    private giveSubjectExam: GiveSubjectExamGQL,
    private giveSubjectCATest: GiveSubjectCaTestGQL,
    private giveMySubjectNote: GiveSubjectNoteGQL,
    private updateSubjectNote: UpdateSubjectNoteGQL,
    private deleteSubjectNote: DeleteSubjectNoteGQL,
    private submitSubjectAssignment: SubmitSubjectAssignmentGQL,
    private enrollStudentForSubjects: EnrollStudentForSubjectsGQL,
    private updateAssignmentGradeScore: UpdateAssignmentGradeScoreGQL,
    private updateCaTestGradeScore: UpdateCaTestGradeScoreGQL,
    private updateExamGradeScore: UpdateExamGradeScoreGQL,
    private createSubjectExamParticipation: CreateSubjectExamParticipationGQL,
    private submitSubjectExam: SubmitSubjectExamGQL,
    private saveExamScreenshot: SaveExamScreenshotGQL,
    private submitSubjectCaTest: SubmitSubjectCaTestGQL,
    private saveCaTestScreenshot: SaveCaTestScreenshotGQL,
    private createSubjectCATestParticipation: CreateSubjectCaTestParticipationGQL,
    private createSubjectTopic: CreateSubjectTopicGQL,
    private updateSubjectTopic: UpdateSubjectTopicGQL,
    private deactivateSubjectTopic: DeactivateSubjectTopicGQL,
    private readonly httpClientSrv: HttpClient,
  ) { }

  createClass(className: string, classCategory: ClassCategory)
  : Observable<any> {
    return this.createClassService
                .mutate({
                  payload: {
                    Name: className,
                    ClassCategory: classCategory
                  }
                })
                .pipe(
                  map(
                    res => res.data.createSchoolClass),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  login(username: string, password: string)
  : Observable<any>{
    return this.loginService
                .mutate({ data: {
                  Username: username,
                  Password: password
                } })
                .pipe(
                  map(res => res.data.login),
                  catchError((ex: ApolloError) => throwError(ex.graphQLErrors))
                );

  }

  deactivateClass(Id: string)
  : Observable<any> {
    return this.deactivateClassService
                .mutate({
                    data: Id
                })
                .pipe(
                  map(
                    res => {
                      return res.data.deactivateSchoolClass
                    }
                  ),
                  catchError((error: ApolloError) => {
                    return throwError(error.graphQLErrors);
                  })
                )
  }

  updateSchoolClass(Id: string, Name: string, Category: ClassCategory)
  : Observable<any> {
    return this.updateClass
               .mutate({
                 data: {
                   Id,
                   ClassCategory: Category,
                   Name
                 }
               })
               .pipe(
                 map(res => res.data.updateSchoolClass),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  assignTeacherToClass(classId: string, personId: string)
  : Observable<any> {
    return this.assignClassToTeacher
                .mutate({
                  payload: {
                    ClassId: classId,
                    PersonId: personId
                  }
                })
                .pipe(
                  map(res => res.data.assignClassToTeacher),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  deleteSubjectFromList(Id: string)
  : Observable<any> {
    return this.deleteSubject
                .mutate({
                  data: Id
                })
                .pipe(
                  map(res => res.data.deactivateSubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  createSubject(subjectName: string, classCategory: ClassCategory)
  : Observable<any> {
    return this.createNewSubject
                .mutate({
                  payload: {
                    ClassCategory: classCategory,
                    Name: subjectName
                  }
                })
                .pipe(
                  map(res => res.data.createSubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                )
  }

  updateExistingSubject(Id: string, subjectName: string, classCategory: ClassCategory)
  : Observable<any> {
    return this.updateSubject
                .mutate({
                  payload: {
                    Id,
                    Name: subjectName,
                    ClassCategory: classCategory
                  }
                })
                .pipe(
                  map(res => res.data.updateSubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                )
  }

  registerOrigamiUser(
    firstName: string,
    lastName: string,
    email: string,
    userRole: OrigamiRole,
    classId?: string
  ): Observable<any> {
    return this.registerUser
                .mutate({
                  payload: {
                    FirstName: firstName,
                    LastName: lastName,
                    Role: userRole,
                    Username: email,
                    ClassId: classId
                  }
                })
                .pipe(
                  map(res => res.data.registerPerson),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateOrigamiUser(Id: string, email: string, firstName: string, lastName: string)
  : Observable<any> {
    return this.updateUser
                .mutate({
                  payload: {
                    PersonId: Id,
                    FirstName: firstName,
                    LastName: lastName,
                    Username: email
                  }
                })
                .pipe(
                  map(res => res.data.updatePersonDetails),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  deactivateUser(Id: string): Observable<any> {
    return this.deleteOrigamiUser
                .mutate({
                  payload: Id
                })
                .pipe(
                  map(res => res.data.deactivateUserStatus),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  assignSubjectListToTeacher(teacherId: string, subjects: string[])
  : Observable<any> {
    return this.assignSubjectToTeacher
                .mutate({
                  payload: {
                    PersonId: teacherId,
                    SubjectList: subjects
                  }
                })
                .pipe(
                  map(res => res.data.assignSubjectToTeacher),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateProfile(updateProfile: UpdateProfile)
  : Observable<any> {
    const { Username, FirstName, LastName } = updateProfile;

    return this.updateUserProfile
                .mutate({
                  payload: {
                    FirstName,
                    LastName,
                    Username
                  }
                })
                .pipe(
                  map(res => res.data.updateUserProfileWithoutImage),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateProfileWithImage(updateProfile: UpdateProfile): Observable<any> {
    const { FirstName, LastName, Username, ProfileImage } = updateProfile;
    const operations = {"query":"mutation updateUserProfile($payload: UpdatePersonProfileDTO!, $file: Upload!) {updateUserProfile(payload: $payload, file: $file) {Message,OperationStatus}}", "variables": { "payload": { "FirstName": FirstName, "LastName": LastName, "Username": Username }, file: null }};
    const _map = {
      profileImage: ["variables.file"]
    };

    const fd: FormData = new FormData()
    fd.append('operations', JSON.stringify(operations))
    fd.append('map', JSON.stringify(_map))
    fd.append('profileImage', ProfileImage);

    return this.httpClientSrv
        .post<any>(environment.graphQLRoot, fd)
        .pipe(
          map(res => res.data.updateUserProfile),
          catchError((error: ApolloError) => throwError(error.graphQLErrors))
        );
  }

  createNewAssignment(
    subjectId: string,
    encodedContent: string,
    totalExpectedScore: number,
    dueDate: Date,
    subjectTopicId: string
  )
  : Observable<any> {
    return this.createAssignment
                .mutate({
                  payload: {
                    SubjectId: subjectId,
                    AttachedFile: encodedContent,
                    TotalExpectedScore: totalExpectedScore,
                    DueDate: dueDate,
                    SubjectTopicId: subjectTopicId
                  }
                })
                .pipe(
                  map(res => res.data.giveSubjectAssignment),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateAssignment(
    assignmentId: string,
    dueDate: Date,
    subjectId: string,
    totalExpectedScore: number,
    attachedFile?: string,
    subjectTopicId?: string
  ): Observable<any> {
    return this.updateSubjectAssignment
              .mutate({
                payload: {
                  AssignmentId: assignmentId,
                  DueDate: dueDate,
                  SubjectId: subjectId,
                  AttachedFile: attachedFile,
                  TotalExpectedScore: totalExpectedScore,
                  SubjectTopicId: subjectTopicId
                }
              })
              .pipe(
                map(res => res.data.updateSubjectAssignment),
                catchError((error: ApolloError) => throwError(error.graphQLErrors))
              );
  }

  deleteAssignment(assignmentId: string): Observable<any> {
    return this.deleteSubjectAssignment
                .mutate({
                  assignmentId
                })
                .pipe(
                  map(res => res.data.deleteSubjectAssignment),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  gradeAssignment(submissionId: string, score: number, remark?: string)
  : Observable<any> {
    return this.gradeSubjectAssignment
                .mutate({
                  payload: {
                    Id: submissionId,
                    Score: score,
                    Remark: remark
                  }
                })
                .pipe(
                  map(res => res.data.gradeAssignment),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  gradeCATest(submissionId: string, score: number, remark?: string)
  : Observable<any> {
    return this.gradeSubjectCATest
                .mutate({
                  payload: {
                    Id: submissionId,
                    Score: score,
                    Remark: remark
                  }
                })
                .pipe(
                  map(res => res.data.gradeCATest),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  gradeExam(submissionId: string, score: number, remark?: string)
  : Observable<any> {
    return this.gradeSubjectExam
                .mutate({
                  payload: {
                    Id: submissionId,
                    Score: score,
                    Remark: remark
                  }
                })
                .pipe(
                  map(res => res.data.gradeExam),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  giveExam(
    examType: ExamType,
    allocatedTime: AllocatedTimeInterval,
    selectedDateTime: Date,
    totalExpectedScore: number,
    subjectId: string,
    attachedFile: string,
    startTime: string
  )
  : Observable<any> {
    return this.giveSubjectExam
                .mutate({
                  payload: {
                    AllocatedTime: allocatedTime,
                    AttachedFile: attachedFile,
                    ExamType: examType,
                    SelectedDateTime: selectedDateTime,
                    TotalExpectedScore: totalExpectedScore,
                    SubjectId: subjectId,
                    TimeString: startTime
                  }
                })
                .pipe(
                  map(res => res.data.giveSubjectExam),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  giveCATest(
    totalExpectedScore: number,
    allocatedTime: AllocatedTimeInterval,
    selectedDateTime: Date,
    subjectId: string,
    attachedFile: string,
    continousAssesmentType: ContinousAssesmentType,
    timeString: string
  ): Observable<any> {
    return this.giveSubjectCATest
                .mutate({
                  payload: {
                    AllocatedTime: allocatedTime,
                    TotalExpectedScore: totalExpectedScore,
                    SelectedDateTime: selectedDateTime,
                    SubjectId: subjectId,
                    AttachedFile: attachedFile,
                    ContinousAssesmentType: continousAssesmentType,
                    TimeString: timeString
                  }
                })
                .pipe(
                  map(res => res.data.giveCATest),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  giveNote(subjectId: string, attachedFile: string, subjectTopicId: string)
  : Observable<any> {
    return this.giveMySubjectNote
                .mutate({
                  payload: {
                    AttachedFile: attachedFile,
                    SubjectId: subjectId,
                    SubjectTopicId: subjectTopicId
                  }
                })
                .pipe(
                  map(res => res.data.giveSubjectNote),
                  catchError((error: ApolloError) => error.graphQLErrors)
                );
  }

  updateNote(noteId: string, subjectId: string, attachedFile?: string, subjectTopic?: string)
  : Observable<any> {
    return this.updateSubjectNote
                .mutate({
                  payload: {
                    Id: noteId,
                    AttachedFile: attachedFile,
                    SubjectId: subjectId,
                    SubjectTopicId: subjectTopic
                  }
                })
                .pipe(
                  map(res => res.data.updateSubjectNote),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  deleteNote(subjectNoteId: string)
  : Observable<any> {
    return this.deleteSubjectNote
                .mutate({
                  subjectNoteId
                })
                .pipe(
                  map(res => res.data.deleteNote),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  submitAssignment(attachedFile: string, assignmentId: string)
  : Observable<any> {
    return this.submitSubjectAssignment
                .mutate({
                  payload: {
                    AttachedFile: attachedFile,
                    SubjectAssignmentId: assignmentId
                  }
                })
                .pipe(
                  map(res => res.data.submitAssignment),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  enrollStudentForSubjectList(subjectList: string[]): Observable<any> {
    return this.enrollStudentForSubjects
                .mutate({
                  payload: {
                    SubjectList: subjectList
                  }
                })
                .pipe(
                  map(res => res.data.assignSubjectListToStudent),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateAssignmentScore(submissionId: string, remark?: string, score?: number)
  : Observable<any> {
    return this.updateAssignmentGradeScore
                .mutate({
                  payload: {
                    Id: submissionId,
                    Remark: remark,
                    Score: score
                  }
                })
                .pipe(
                  map(res => res.data.updateAssignmentGradeScore),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateCaTestScore(submissionId: string, remark?: string, score?: number)
  : Observable<any> {
    return this.updateCaTestGradeScore
                .mutate({
                  payload: {
                    Id: submissionId,
                    Remark: remark,
                    Score: score
                  }
                })
                .pipe(
                  map(res => res.data.updateCATestGradeScore),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateExamScore(submissionId: string, remark?: string, score?: number)
  : Observable<any> {
    return this.updateExamGradeScore
                .mutate({
                  payload: {
                    Id: submissionId,
                    Remark: remark,
                    Score: score
                  }
                })
                .pipe(
                  map(res => res.data.updateExamGradeScore),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  registerExamParticipation(examId: string)
  : Observable<any> {
    return this.createSubjectExamParticipation
                .mutate({
                  examId
                })
                .pipe(
                  map(res =>res.data.createSubjectExamParticipation),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  submitExam(examText: string, examId: string)
  : Observable<any> {
    return this.submitSubjectExam
                .mutate({
                  payload: {
                    AttachedFile: examText,
                    Id: examId
                  }
                })
                .pipe(
                  map(res => res.data.submitExam),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  saveScreenshotFromExam(dataUrl: string, examParticipationId: string)
  : Observable<any> {
    return this.saveExamScreenshot
                .mutate({
                  payload: {
                    DataUri: dataUrl,
                    ParticipationId: examParticipationId
                  }
                })
                .pipe(
                  map(res => res.data.saveExamScreenshot),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  submitCaTest(caTestText: string, caTestId: string): Observable<any> {
    return this.submitSubjectCaTest
                .mutate({
                  payload: {
                    AttachedFile: caTestText,
                    Id: caTestId
                  }
                })
                .pipe(
                  map(res => res.data.submitCATest),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  saveScreenshotFromCATest(dataUrl: string, caTestParticipationId: string)
  : Observable<any> {
    return this.saveCaTestScreenshot
                .mutate({
                  payload: {
                    DataUri: dataUrl,
                    ParticipationId: caTestParticipationId
                  }
                })
                .pipe(
                  map(res => res.data.saveCATestScreenshot),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  registerCATestParticipation(caTestId: string)
  : Observable<any> {
    return this.createSubjectCATestParticipation
               .mutate({
                 caTestId
               })
               .pipe(
                 map(res => res.data.createSubjectCAParticipation),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  createTopic(subjectId: string, title: string)
  : Observable<any> {
    return this.createSubjectTopic
                .mutate({
                  payload: {
                    SubjectId: subjectId,
                    Title: title
                  }
                })
                .pipe(
                  map(res => res.data.createSubjectTopic),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  updateTopic(id: string, title?: string, subjectId?: string)
  : Observable<any> {
    return this.updateSubjectTopic
                .mutate({
                  payload: {
                    Id: id,
                    SubjectId: subjectId,
                    Title: title
                  }
                })
                .pipe(
                  map(res => res.data.updateSubjectTopic),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  deactivateTopic(subjectTopicId: string)
  : Observable<any> {
    return this.deactivateSubjectTopic
               .mutate({
                 subjectTopicId
               })
               .pipe(
                 map(res => res.data.deactivateSubjectTopic),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }
}
