import { Injectable } from '@angular/core';
import {
  GetClassCategoriesGQL,
  GetAllActiveSchoolClassesGQL,
  GetClassByIdGQL,
  GetActiveClassesForSelectListGQL,
  GetSubjectAssignmentsBySubjectGQL,
  GetAssignmentSubmissionsGQL,
  GetSubjectListForTeacherGQL,
  GetSubjectAssignmentByIdGQL,
  GetAttachedFileFromAssignmentSubmissionGQL,
  OrigamiRole,
  GetUsersByRoleGQL,
  GetAllActiveSubjectsGQL,
  GetSubjectByIdGQL,
  GetOrigamiRolesGQL,
  GetPersonByIdGQL,
  GetStudentsBySubjectGQL,
  GetProfileImageGQL,
  GetUserProfileGQL,
  GetExamSubmissionsGQL,
  GetCaSubmissionsGQL,
  GetExamTypesGQL,
  GetAllocatedTimeGQL,
  GetExamsTeacherCreatedGQL,
  GetAllOnGoingExamsGQL,
  GetExamParticipationGQL,
  GetCaParticipationGQL,
  GetExamParticipationScreenshotsGQL,
  GetCaParticipationScreenshotsGQL,
  GetCaSubmissionGQL,
  GetExamSubmissionGQL,
  GetAllCaTestsCreatedByTeacherGQL,
  GetSubjectNotesGQL,
  GetStudentAssignmentsBySubjectGQL,
  GetStudentDoneAssignmentsBySubjectGQL,
  GetStudentUndoneAssignmentsBySubjectGQL,
  GetCaTypesGQL,
  GetAllOnGoingCaTestsCreatedByTeacherGQL,
  GetSubjectNoteByIdGQL,
  GetLatestAssignmentsBySubjectGQL,
  GetAllSubjectsAssignedToStudentForSlGQL,
  GetMyAssignmentGQL,
  GetStudentAssignmentSubmissionGQL,
  GetAssignmentScoreGQL,
  GetSubjectNotesForStudentGQL,
  GetSubjectNoteForStudentGQL,
  GetSubjectsAssignedToStudentGQL,
  GetSubjectStudentShouldEnrollForGQL,
  GetSubjectAssignmentScoreByIdGQL,
  GetSubjectCaScoreByIdGQL,
  GetSubjectExamScoreByIdGQL,
  GetStudentExamsBySubjectGQL,
  GetStudentUndoneExamsBySubjectGQL,
  GetStudentDoneExamsBySubjectGQL,
  GetMyExamGQL,
  GetMyExamSubmissionGQL,
  GetMyExamParticipationGQL,
  GetExamParticipationListGQL,
  GetStudentCaTestsBySubjectGQL,
  GetStudentUndoneCaTestsBySubjectGQL,
  GetStudentDoneCaTestsBySubjectGQL,
  GetMyCaTestGQL,
  GetMyCaTestSubmissionGQL,
  GetMyCaTestParticipationGQL,
  GetChatRoomParticipantsGQL,
  GetUserChatRoomsGQL,
  GetSubjectTopicsGQL,
  GetSubjectTopicsBySubjectIdGQL,
  GetSubjectTopicByIdGQL
} from './services/origamiGraphql.service';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ApolloError } from 'apollo-client';
import { ChatCategory } from './services/origamiGraphql.service';

@Injectable({
  providedIn: 'root'
})
export class QueryBaseService {

  constructor(
    private classCatgories: GetClassCategoriesGQL,
    private classes: GetAllActiveSchoolClassesGQL,
    private getClassById: GetClassByIdGQL,
    private userListByRole: GetUsersByRoleGQL,
    private getActiveSubjects: GetAllActiveSubjectsGQL,
    private getExistingSubjectById: GetSubjectByIdGQL,
    private getRoles: GetOrigamiRolesGQL,
    private getActiveClassesForSL: GetActiveClassesForSelectListGQL,
    private getPersonByUserId: GetPersonByIdGQL,
    private getStudentsBySubjectsOffered: GetStudentsBySubjectGQL,
    private getUserProfileImage: GetProfileImageGQL,
    private getSubjectAssignedToTeacher: GetSubjectListForTeacherGQL,
    private getUserProfile: GetUserProfileGQL,
    private getSubjectAssignmentById: GetSubjectAssignmentByIdGQL,
    private getSubjectAssignmentsBySubject: GetSubjectAssignmentsBySubjectGQL,
    private getAssignmentSubmissions: GetAssignmentSubmissionsGQL,
    private getAttachedFileFromSubjectAssignmentSubmission: GetAttachedFileFromAssignmentSubmissionGQL,
    private getExamTypeSL: GetExamTypesGQL,
    private getAllocatedTimeSL: GetAllocatedTimeGQL,
    private getSubjectExamsTeacherCreated: GetExamsTeacherCreatedGQL,
    private getOngoingSubjectExamsCreatedByTeacher: GetAllOnGoingExamsGQL,
    private getSubjectExamParticipation: GetExamParticipationGQL,
    private getSubjectCAParticipation: GetCaParticipationGQL,
    private getSubjectExamParticipationScreenshots: GetExamParticipationScreenshotsGQL,
    private getSubjectCAParticipationScreenshots: GetCaParticipationScreenshotsGQL,
    private getSubjectExamSubmissions: GetExamSubmissionsGQL,
    private getSubjectCASubmissions: GetCaSubmissionsGQL,
    private getSubjectExamSubmission: GetExamSubmissionGQL,
    private getSubjectCASubmission: GetCaSubmissionGQL,
    private getSubjectCATypes: GetCaTypesGQL,
    private getAllSubjectCATestsCreatedByTeacher: GetAllCaTestsCreatedByTeacherGQL,
    private getAllOnGoingSubjectCATestsCreatedByTeacher: GetAllOnGoingCaTestsCreatedByTeacherGQL,
    private getSubjectNoteById: GetSubjectNoteByIdGQL,
    private getSubjectNotes: GetSubjectNotesGQL,
    private getStudentSubjectAssignmentsBySubject: GetStudentAssignmentsBySubjectGQL,
    private getStudentDoneSubjectAssignmentsBySubject: GetStudentDoneAssignmentsBySubjectGQL,
    private getStudentUndoneSubjectAssignmentsBySubject: GetStudentUndoneAssignmentsBySubjectGQL,
    private getLatestSubjectAssignmentsBySubject: GetLatestAssignmentsBySubjectGQL,
    private getAllSubjectsAssignedToStudentForSL: GetAllSubjectsAssignedToStudentForSlGQL,
    private getStudentAssignment: GetMyAssignmentGQL,
    private getStudentAssignmentSubmission: GetStudentAssignmentSubmissionGQL,
    private getSubjectAssignmentScore: GetAssignmentScoreGQL,
    private getSubjectNotesForStudent: GetSubjectNotesForStudentGQL,
    private getSubjectNoteForStudent: GetSubjectNoteForStudentGQL,
    private getSubjectsAssignedToStudent: GetSubjectsAssignedToStudentGQL,
    private getSubjectStudentShouldEnrollFor: GetSubjectStudentShouldEnrollForGQL,
    private getSubjectAssignmentScoreById: GetSubjectAssignmentScoreByIdGQL,
    private getSubjectCaScoreById: GetSubjectCaScoreByIdGQL,
    private getSubjectExamScoreById: GetSubjectExamScoreByIdGQL,
    private getStudentExamsBySubject: GetStudentExamsBySubjectGQL,
    private getStudentUndoneExamsBySubject: GetStudentUndoneExamsBySubjectGQL,
    private getStudentDoneExamsBySubject: GetStudentDoneExamsBySubjectGQL,
    private getMySubjectExam: GetMyExamGQL,
    private getMySubjectExamParticipation: GetMyExamParticipationGQL,
    private getMySubjectExamSubmission: GetMyExamSubmissionGQL,
    private getSubjectExamParticipationList: GetExamParticipationListGQL,
    private getStudentCATestsBySubject: GetStudentCaTestsBySubjectGQL,
    private getStudentUndoneCATestsBySubject: GetStudentUndoneCaTestsBySubjectGQL,
    private getStudentDoneCATestsBySubject: GetStudentDoneCaTestsBySubjectGQL,
    private getStudentCATest: GetMyCaTestGQL,
    private getMySubjectCATestParticipation: GetMyCaTestParticipationGQL,
    private getStudentCATestSubmission: GetMyCaTestSubmissionGQL,
    private chatRoomParticipants: GetChatRoomParticipantsGQL,
    private getUserChatRooms: GetUserChatRoomsGQL,
    private getSubjectTopics: GetSubjectTopicsGQL,
    private getSubjectTopicsBySubjectId: GetSubjectTopicsBySubjectIdGQL,
    private getSubjectTopicById: GetSubjectTopicByIdGQL
  ) { }

  //Get seleclist data for all the classCategories
  getClassCategories(): Observable<any> {
    return this.classCatgories
               .fetch()
               .pipe(
                 map(res => {
                   return res.data.getClassCategories
                 }),
                 catchError((error: ApolloError) => {
                    return throwError(error.graphQLErrors);
                 })
               )
  }

  getAllClasses(): Observable<any> {
    return this.classes
               .fetch()
               .pipe(
                 map(
                   res => {
                     return res.data.getAllActiveSchoolClasses;
                   },
                   catchError((error: ApolloError) => {
                     return throwError(error.graphQLErrors);
                   })
                 )
               )
  }

  getSchoolClassById(Id: string): Observable<any> {
    return this.getClassById
                .fetch({
                  payload: Id
                })
                .pipe(
                  map(res => res.data.getAClassById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getUserListByRole(role: OrigamiRole): Observable<any> {
    return this.userListByRole
                .fetch({
                  payload: role
                })
                .pipe(
                  map(res => res.data.getUsersByRole),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                )
  }

  getAllActiveSubjects(): Observable<any> {
    return this.getActiveSubjects
               .fetch()
               .pipe(
                 map(res => res.data.getAllActiveSubjects),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getSubjectById(Id: string): Observable<any> {
    return this.getExistingSubjectById
                .fetch({
                  data: Id
                })
                .pipe(
                  map(res => res.data.getSubjectById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getOrigamiRoles(): Observable<any> {
    return this.getRoles
                .fetch()
                .pipe(
                  map(res => res.data.getOrigamiRoles),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                )
  }

  getActiveClassesForSelectList(): Observable<any> {
    return this.getActiveClassesForSL
                .fetch()
                .pipe(
                  map(res => res.data.getAllActiveSchoolClasses),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                )
  }

  getPersonById(Id: string): Observable<any> {
    return this.getPersonByUserId
                .fetch({
                  id: Id
                })
                .pipe(
                  map(res => res.data.getPersonById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentBySubject(subjectId: string): Observable<any> {
    return this.getStudentsBySubjectsOffered
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getStudentsBySubject),
                  catchError((error: ApolloError) => error.graphQLErrors)
                );
  }

  getProfileImage(userId: string): Observable<any> {
    return this.getUserProfileImage
                .fetch({
                  userId
                })
                .pipe(
                  map(res => res.data.getPersonById),
                  catchError((error: ApolloError) => error.graphQLErrors)
                );
  }

  getSubjectListAssignedToTeacher(userId: string): Observable<any> {
    return this.getSubjectAssignedToTeacher
              .fetch({
                userId
              })
              .pipe(
                map(res => res.data.getSubjectsAssignedToTeacher),
                catchError((error: ApolloError) => error.graphQLErrors)
              );
  }

  getProfile(): Observable<any> {
    return this.getUserProfile
                .fetch()
                .pipe(
                  map(res => res.data.getUserProfile),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getAssignmentById(assignmentId: string)
  : Observable<any> {
    return this.getSubjectAssignmentById
              .fetch({
                assignmentId
              })
              .pipe(
                map(res => res.data.getSubjectAssignmentById),
                catchError((error: ApolloError) => throwError(error.graphQLErrors))
              )
  }

  getAssignmentsBySubject(subjectId: string)
  : Observable<any> {
    return this.getSubjectAssignmentsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getSubjectAssignmentsBySubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getAssignmentSubmissionList(assignmentId: string)
  : Observable<any> {
    return this.getAssignmentSubmissions
               .fetch({
                 subjectAssignmentId: assignmentId
               })
               .pipe(
                 map(res => res.data.getAssignmentSubmissionsByAssignment),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getAttachedFileFromAssignmentSubmission(assignmentSubmissionId: string)
  : Observable<any> {
    return this.getAttachedFileFromSubjectAssignmentSubmission
                .fetch({
                  submissionId: assignmentSubmissionId
                })
                .pipe(
                  map(res => res.data.getAssignmentSubmissionById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getExamType()
  : Observable<any> {
    return this.getExamTypeSL
                .fetch()
                .pipe(
                  map(res => res.data.getExamTypes),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getAllocatedTime()
  : Observable<any> {
    return this.getAllocatedTimeSL
                .fetch()
                .pipe(
                  map(res => res.data.getAllocatedTimeIntervals),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getExamsCreatedByTeacher(): Observable<any> {
    return this.getSubjectExamsTeacherCreated
                .fetch()
                .pipe(
                  map(res => res.data.getAllExamsTeacherCreated),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getOngoingExamsCreatedByTeacher(): Observable<any> {
    return this.getOngoingSubjectExamsCreatedByTeacher
                .fetch()
                .pipe(
                  map(res => res.data.getAllOnGoingExams),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getExamParticipation(examId: string)
  : Observable<any> {
    return this.getSubjectExamParticipation
                .fetch({
                  examId
                })
                .pipe(
                  map(res => res.data.getExamParticipation),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );

  }

  getCAParticipation(caId: string)
  : Observable<any> {
    return this.getSubjectCAParticipation
                .fetch({
                  caId
                })
                .pipe(
                  map(res => res.data.getCAParticipation),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );

  }

  getExamParticipationScreenshots(examParticipationId: string): Observable<any> {
    return this.getSubjectExamParticipationScreenshots
                .fetch({
                  examParticipationId
                })
                .pipe(
                  map(res => res.data.getExamParticipationScreenshots),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getCAParticipationScreenshots(caParticipationId: string): Observable<any> {
    return this.getSubjectCAParticipationScreenshots
                .fetch({
                  caParticipationId
                })
                .pipe(
                  map(res => res.data.getCAParticipationScreenshots),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getExamSubmissions(examId: string): Observable<any> {
    return this.getSubjectExamSubmissions
                .fetch({
                  examId
                })
                .pipe(
                  map(res => res.data.getExamSubmissions),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getCASubmissions(caId: string): Observable<any> {
    return this.getSubjectCASubmissions
                .fetch({
                  caId
                })
                .pipe(
                  map(res => res.data.getCASubmissions),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getExamSubmission(examSubmissionId: string): Observable<any> {
    return this.getSubjectExamSubmission
                .fetch({
                  examSubmissionId
                })
                .pipe(
                  map(res => res.data.getExamSubmission),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getCASubmission(caSubmissionId: string): Observable<any> {
    return this.getSubjectCASubmission
                .fetch({
                  caSubmissionId
                })
                .pipe(
                  map(res => res.data.getCASubmission),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getCATypes(): Observable<any> {
    return this.getSubjectCATypes
                .fetch()
                .pipe(
                  map(res => res.data.getContiniousAssesmentTypes),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getAllCATestsCreatedByTeacher(): Observable<any> {
    return this.getAllSubjectCATestsCreatedByTeacher
                .fetch()
                .pipe(
                  map(res => res.data.getAllCATestsCreatedByTeacher),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getOngoingCATestsCreatedByTeacher(): Observable<any> {
    return this.getAllOnGoingSubjectCATestsCreatedByTeacher
                .fetch()
                .pipe(
                  map(res => res.data.getAllOnGoingCATests),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getNoteById(subjectNoteId: string)
  : Observable<any> {
    return this.getSubjectNoteById
                .fetch({
                  subjectNoteId
                })
                .pipe(
                  map(res => res.data.getASubjectNote),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getNotesBySubject(subjectId: string)
  : Observable<any> {
    return this.getSubjectNotes
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getNotesBySubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentAssignmentListPerSubject(subjectId: string): Observable<any> {
    return this.getStudentSubjectAssignmentsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getAssignmentsBySubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentDoneAssignmentPerSubject(subjectId: string): Observable<any> {
    return this.getStudentDoneSubjectAssignmentsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getDoneAssignments),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentUndoneAssignmentPerSubject(subjectId: string): Observable<any> {
    return this.getStudentUndoneSubjectAssignmentsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getUndoneAssignments),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getLatestSubjectAssignmentPerSubject(subjectId: string): Observable<any> {
    return this.getLatestSubjectAssignmentsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getLatestAssignmentsBySubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentSubjectsForSL()
  : Observable<any> {
    return this.getAllSubjectsAssignedToStudentForSL
                .fetch()
                .pipe(
                  map(res => res.data.getAllSubjectsAssignedToStudent),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentSubjectAssignment(assignmentId: string)
  : Observable<any> {
    return this.getStudentAssignment
               .fetch({
                 assignmentId
               })
               .pipe(
                 map(res => res.data.getAssignment),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getStudentSubjectAssignmentSubmission(assignmentId: string)
  : Observable<any> {
    return this.getStudentAssignmentSubmission
                .fetch({
                  assignmentId
                })
                .pipe(
                  map(res => res.data.getStudentAssignmentSubmission),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getAssignmentScore(assignmentId: string): Observable<any> {
    return this.getSubjectAssignmentScore
                .fetch({
                  assignmentId
                })
                .pipe(
                  map(res => res.data.getAssignmentScore),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getNotesForStudent(subjectId: string)
  : Observable<any> {
    return this.getSubjectNotesForStudent
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getSubjectNotes),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getNoteForStudent(noteId: string)
  : Observable<any> {
    return this.getSubjectNoteForStudent
                .fetch({
                  noteId
                })
                .pipe(
                  map(res => res.data.getSubjectNote),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getSubjectsAssignedToAStudent(): Observable<any> {
    return this.getSubjectsAssignedToStudent
                .fetch()
                .pipe(
                  map(res => res.data.getAllSubjectsAssignedToStudent),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getSubjectListStudentShouldEnrollFor(): Observable<any> {
    return this.getSubjectStudentShouldEnrollFor
                .fetch()
                .pipe(
                  map(res => res.data.getSubjectStudentShouldEnrollFor),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getAssignmentScoreById(assignmentSubmissionId: string)
  : Observable<any> {
    return this.getSubjectAssignmentScoreById
                .fetch({
                  assignmentSubmissionId
                })
                .pipe(
                  map(res => res.data.getSubjectAssignmentScoreById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getCAScoreById(caSubmissionId: string)
  : Observable<any> {
    return this.getSubjectCaScoreById
                .fetch({
                  caSubmissionId
                })
                .pipe(
                  map(res => res.data.getSubjectCAScoreById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getExamScoreById(examSubmissionId: string)
  : Observable<any> {
    return this.getSubjectExamScoreById
                .fetch({
                  examSubmissionId
                })
                .pipe(
                  map(res => res.data.getSubjectExamScoreById),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentExamsBySubjectId(subjectId: string): Observable<any> {
    return this.getStudentExamsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getExamsBySubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentUndoneExamsBySubjectId(subjectId: string): Observable<any> {
    return this.getStudentUndoneExamsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getUndoneExams),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getStudentDoneExamsBySubjectId(subjectId: string): Observable<any> {
    return this.getStudentDoneExamsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getDoneExams),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getMyExam(examId: string): Observable<any> {
    return this.getMySubjectExam
               .fetch({
                 examId
               })
               .pipe(
                 map(res => res.data.getExam)
               );
  }

  getMyExamSubmission(examId: string)
  : Observable<any> {
    return this.getMySubjectExamSubmission
                .fetch({
                  examId
                })
                .pipe(
                  map(res => res.data.getUserExamSubmission),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getMyExamParticipation(examId: string): Observable<any> {
    return this.getMySubjectExamParticipation
              .fetch({
                examId
              })
              .pipe(
                map(res => res.data.getExamParticipation),
                catchError((error: ApolloError) => throwError(error.graphQLErrors))
              );
  }

  getExamParticipationList(examId: string): Observable<any> {
    return this.getSubjectExamParticipationList
               .fetch({
                 examId
               })
               .pipe(
                 map(res => res.data.getExamParticipationList),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getCATestsBySubject(subjectId: string)
  : Observable<any> {
    return this.getStudentCATestsBySubject
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getCATestsBySubject),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getUndoneCATestsBySubject(subjectId: string)
  : Observable<any> {
    return this.getStudentUndoneCATestsBySubject
               .fetch({
                 subjectId
               })
               .pipe(
                 map(res => res.data.getUndoneCATests),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getDoneCATestsBySubject(subjectId: string)
  : Observable<any> {
    return this.getStudentDoneCATestsBySubject
               .fetch({
                 subjectId
               })
               .pipe(
                 map(res => res.data.getDoneCATests),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getMyCATest(caTestId: string): Observable<any> {
    return this.getStudentCATest
               .fetch({
                caTestId
               })
               .pipe(
                 map(res => res.data.getCATest),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getMyCATestSubmission(caTestId: string)
  : Observable<any> {
    return this.getStudentCATestSubmission
               .fetch({
                 caTestId
               })
               .pipe(
                 map(res => res.data.getUserCATestSubmission),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getMyCATestParticipation(caTestId: string): Observable<any> {
    return this.getMySubjectCATestParticipation
               .fetch({
                 caTestId
               })
               .pipe(
                 map(res => res.data.getCATestParticipation),
                 catchError((error: ApolloError) => throwError(error.graphQLErrors))
               );
  }

  getChatRoomParticipants(roomId: string, chatType: ChatCategory)
  : Observable<any> {
    return this.chatRoomParticipants
                .fetch({
                  payload: {
                    ChatType: chatType,
                    RoomId: roomId
                  }
                })
                .pipe(
                  map(res => res.data.getChatRoomParticipants),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getChatRooms(userId: string, role: OrigamiRole)
  : Observable<any> {
    return this.getUserChatRooms
                .fetch({
                  payload: {
                    Role: role,
                    UserId: userId
                  }
                })
                .pipe(
                  map(res => res.data.getUserChatRooms),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getTopicsForASubject(subjectId: string)
  : Observable<any> {
    return this.getSubjectTopics
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getSubjectTopics),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getTopicsBySubjectId(subjectId: string)
  : Observable<any> {
    return this.getSubjectTopicsBySubjectId
                .fetch({
                  subjectId
                })
                .pipe(
                  map(res => res.data.getSubjectTopics),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }

  getTopicById(subjectTopicId: string)
  : Observable<any> {
    return this.getSubjectTopicById
                .fetch({
                  subjectTopicId
                })
                .pipe(
                  map(res => res.data.getSubjectTopic),
                  catchError((error: ApolloError) => throwError(error.graphQLErrors))
                );
  }
}
