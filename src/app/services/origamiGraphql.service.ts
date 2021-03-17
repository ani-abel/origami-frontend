import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



/** Holds selected time intervals that can be set to CA tests & exams */
export enum AllocatedTimeInterval {
  FifteenMinutes = 'FIFTEEN_MINUTES',
  ThirtyMinutes = 'THIRTY_MINUTES',
  FourtyFiveMinutes = 'FOURTY_FIVE_MINUTES',
  OneHour = 'ONE_HOUR',
  OneHourThrityMinutes = 'ONE_HOUR_THRITY_MINUTES',
  OneHourFoutyFiveMinutes = 'ONE_HOUR_FOUTY_FIVE_MINUTES',
  TwoHours = 'TWO_HOURS',
  TwoHoursThrityMinutes = 'TWO_HOURS_THRITY_MINUTES',
  TwoHourFoutyFiveMinutes = 'TWO_HOUR_FOUTY_FIVE_MINUTES'
}

export type AssignTeacherToClassDto = {
  PersonId: Scalars['String'];
  ClassId: Scalars['String'];
};

export type AssignTeacherToSubjectsDto = {
  PersonId?: Maybe<Scalars['String']>;
  SubjectList: Array<Scalars['String']>;
};

export type AuthDto = {
  Username: Scalars['String'];
  Password: Scalars['String'];
};

/** Describes the response that the user gets when they login */
export type AuthResponse = {
  __typename?: 'AuthResponse';
  UserId: Scalars['String'];
  Username: Scalars['String'];
  Role: OrigamiRole;
  DateCreated: Scalars['DateTime'];
  Token: Scalars['String'];
  TokenInitializationDate: Scalars['Float'];
  TokenExpiryDate: Scalars['Float'];
};

/** This entity holds all the chat messages that are sent by a student/Teacher */
export type Chat_By_Class = {
  __typename?: 'Chat_By_Class';
  Id: Scalars['ID'];
  /** This refers to the sender of the message to the group */
  Message: Scalars['String'];
  PersonId: Scalars['String'];
  Person: Person;
  SchoolClassId: Scalars['String'];
  SchoolClass: School_Class;
  DateCreated: Scalars['DateTime'];
};

/** This entity holds all the chat messages by subject */
export type Chat_By_Subject = {
  __typename?: 'Chat_By_Subject';
  Id: Scalars['ID'];
  /** This refers to the sender of the message to the group */
  Message: Scalars['String'];
  SubjectId: Scalars['String'];
  Subject: Subject;
  PersonId: Scalars['String'];
  Person: Person;
  DateCreated: Scalars['DateTime'];
};

/** Denotes which type of chat is being sent over */
export enum ChatCategory {
  SubjectChat = 'SUBJECT_CHAT',
  ClassChat = 'CLASS_CHAT'
}

/**
 * Holds the list of all the chat rooms that a user should
 *      be in, both by subject or by the class they are in
 */
export type ChatRoomList = {
  __typename?: 'ChatRoomList';
  Subjects: Array<Subject>;
  SchoolClasses: Array<School_Class>;
};

export type ChatRoomSelectionDto = {
  UserId: Scalars['String'];
  Role: OrigamiRole;
};

/**
 * This holds the attendance record by each student to every class Zoom meeting 
 *     organized by a teacher
 */
export type Class_Attendance = {
  __typename?: 'Class_Attendance';
  Id: Scalars['ID'];
  ClassMeetingId: Scalars['String'];
  ClassMeeting: Class_Meeting;
  /** 'PersonId' in this context refers to the Student who takes a virtual class */
  PersonId: Scalars['String'];
  Person: Person;
  DateCreated: Scalars['DateTime'];
};

/** This entity holds a list a all Zoom(Virtual) meetings organized by a teacher */
export type Class_Meeting = {
  __typename?: 'Class_Meeting';
  Id: Scalars['ID'];
  SubjectId: Scalars['String'];
  Subject: Subject;
  /** PersonId of the teacher who creates a Zoom meeting */
  PersonId: Scalars['String'];
  Person: Person;
  SchoolClassId: Scalars['String'];
  SchoolClass: School_Class;
  StartTime: Scalars['String'];
  ZoomLink: Scalars['String'];
  ZoomMeetingId: Scalars['String'];
  ZoomMeetingPassword?: Maybe<Scalars['String']>;
  DateCreated: Scalars['DateTime'];
};

/** Lists all valid Class categories */
export enum ClassCategory {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY'
}

/** Holds all the expected CA types a school offers */
export enum ContinousAssesmentType {
  FirstContinousAssesment = 'FIRST_CONTINOUS_ASSESMENT',
  SecondContinousAssesment = 'SECOND_CONTINOUS_ASSESMENT',
  ThirdContinousAssesment = 'THIRD_CONTINOUS_ASSESMENT'
}

export type CreateClassAttendanceDto = {
  ClassMeetingId: Scalars['String'];
  /** Refers to the Id of the student */
  PersonId: Scalars['String'];
  /**
   * Refers to the PersonId of the teacher who created the class. 
   *         This is collected to ensure that only the teacher who created the meeting 
   *         can update the attendance records.(Optional)
   */
  TeacherId?: Maybe<Scalars['String']>;
};

export type CustomApiType = {
  __typename?: 'CustomAPIType';
  Message: Scalars['String'];
  OperationStatus: OperationType;
};


export type DeactivateTeacherSubjectRecordDto = {
  PersonId: Scalars['String'];
  SubjectId: Scalars['String'];
};

/** Holds the school term, by the Nigerian school system */
export enum ExamType {
  FirstTerm = 'FIRST_TERM',
  SecondTerm = 'SECOND_TERM',
  ThirdTerm = 'THIRD_TERM'
}

export type FileAttachment = {
  __typename?: 'FileAttachment';
  Url: Scalars['String'];
  Name: Scalars['String'];
  MimeType: Scalars['String'];
  Encoding: Scalars['String'];
};

/** Used to sent over data on the chat room */
export type GetChatRoomParticipantDto = {
  RoomId: Scalars['String'];
  ChatType: ChatCategory;
};

/** Used to generate a new assignment for a subject by a teacher */
export type GiveAssignmentTaskDto = {
  SubjectId: Scalars['String'];
  /**
   * Field holds a link to a .docx file uploaded 
   *         by the teacher listing the questions for the assignment
   */
  AttachedFile: Scalars['String'];
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.e( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  /** The date when the assignment becomes inactive */
  DueDate: Scalars['DateTime'];
  SubjectTopicId: Scalars['String'];
};

export type GiveCaTaskDto = {
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.E( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  AllocatedTime: AllocatedTimeInterval;
  SelectedDateTime: Scalars['DateTime'];
  SubjectId: Scalars['String'];
  /**
   * Field holds a link to a .docx file uploaded 
   *         by the teacher listing the questions for the assignment
   */
  AttachedFile: Scalars['String'];
  ContinousAssesmentType: ContinousAssesmentType;
  TimeString: Scalars['String'];
};

export type GiveExamTaskDto = {
  ExamType: ExamType;
  AllocatedTime: AllocatedTimeInterval;
  SelectedDateTime: Scalars['DateTime'];
  TimeString: Scalars['String'];
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.e( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  SubjectId: Scalars['String'];
  AttachedFile: Scalars['String'];
};

export type GiveSubjectNoteTaskDto = {
  AttachedFile: Scalars['String'];
  SubjectId: Scalars['String'];
  SubjectTopicId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateSchoolSession: School_Session;
  createSchoolClass: School_Class;
  updateSchoolClass: CustomApiType;
  deactivateSchoolClass: CustomApiType;
  activateSchoolClass: CustomApiType;
  createSubject: Subject;
  updateSubject: CustomApiType;
  deactivateSubject: CustomApiType;
  activateSubject: CustomApiType;
  registerPerson: Person;
  deactivateUserStatus: CustomApiType;
  /**
   * Used to deactivate a user. 
   *         I.E after a teacher is sacked or reassigned to another class
   */
  activateUserStatus: CustomApiType;
  updatePersonDetails: Person;
  /** Used to update a student after they may have moved to another class */
  updateStudentClass: Student;
  updateUserProfile: CustomApiType;
  updateUserProfileWithoutImage: CustomApiType;
  uploadDocument: FileAttachment;
  uploadImage: FileAttachment;
  assignSubjectToTeacher: CustomApiType;
  assignClassToTeacher: Teacher_Class;
  deactivateTeacherClass: CustomApiType;
  activateTeacherClass: CustomApiType;
  activateTeacherSubject: CustomApiType;
  deactivateTeacherSubject: CustomApiType;
  /** Used to enter the record of a student who attended a Zoom virtual meeting */
  createStudentClassAttendanceRecord: Class_Attendance;
  /** Used by teacher to give assignment to their students on a subject they teach */
  giveSubjectAssignment: Subject_Assignment;
  updateSubjectAssignment: CustomApiType;
  deleteSubjectAssignment: CustomApiType;
  gradeAssignment: Subject_Assignment_Score;
  updateAssignmentGradeScore: CustomApiType;
  gradeCATest: Subject_Ca_Score;
  updateCATestGradeScore: CustomApiType;
  gradeExam: Subject_Exam_Score;
  updateExamGradeScore: CustomApiType;
  /** Used by teacher to give CA tests to their students on a subject they teach */
  giveCATest: Subject_Ca;
  /** Used by teacher to give Notes to their students on a subject they teach */
  giveSubjectNote: Subject_Note;
  deleteNote: CustomApiType;
  updateSubjectNote: CustomApiType;
  /** Used by teacher to give Exams to their students on a subject they teach */
  giveSubjectExam: Subject_Exam;
  /** Holds a list of all the students who attended a class meeting */
  getClassMeetingAttendance: Class_Meeting;
  /** Used to assign a list of subjects to a student */
  assignSubjectListToStudent: CustomApiType;
  createSubjectTopic: Subject_Topic;
  updateSubjectTopic: CustomApiType;
  deactivateSubjectTopic: CustomApiType;
  createSubjectExamParticipation: Subject_Exam_Participation;
  createSubjectCAParticipation: Subject_Ca_Participation;
  submitExam: Subject_Exam_Submission;
  /**
   * At intervals, this mutation save a captured screenshot from a 
   *         student's camera to maintain the integrity of an exam
   */
  saveExamScreenshot: Subject_Exam_Participation_Screenshot;
  submitCATest: Subject_Ca_Submission;
  /**
   * At intervals, this mutation save a captured screenshot from a 
   *         student's camera to maintain the integrity of a test
   */
  saveCATestScreenshot: Subject_Ca_Participation_Screenshot;
  submitAssignment: Subject_Assignment_Submission;
  createSchoolSession: School_Session;
  login: AuthResponse;
  createChatSubjectMessage: Chat_By_Subject;
  createChatClassMessage: Chat_By_Class;
};


export type MutationActivateSchoolSessionArgs = {
  payload: UpdateSchoolSessionDto;
};


export type MutationCreateSchoolClassArgs = {
  payload: School_Class_Dto;
};


export type MutationUpdateSchoolClassArgs = {
  payload: Update_School_Class_Dto;
};


export type MutationDeactivateSchoolClassArgs = {
  Id: Scalars['String'];
};


export type MutationActivateSchoolClassArgs = {
  Id: Scalars['String'];
};


export type MutationCreateSubjectArgs = {
  payload: Subject_Dto;
};


export type MutationUpdateSubjectArgs = {
  payload: Update_Subject_Dto;
};


export type MutationDeactivateSubjectArgs = {
  id: Scalars['String'];
};


export type MutationActivateSubjectArgs = {
  id: Scalars['String'];
};


export type MutationRegisterPersonArgs = {
  payload: PersonRegistrationDto;
};


export type MutationDeactivateUserStatusArgs = {
  personId: Scalars['String'];
};


export type MutationActivateUserStatusArgs = {
  personId: Scalars['String'];
};


export type MutationUpdatePersonDetailsArgs = {
  updatedUser: UpdatePersonRegistrationDto;
};


export type MutationUpdateStudentClassArgs = {
  updatedStudent: UpdateStudentClassDto;
};


export type MutationUpdateUserProfileArgs = {
  file: Scalars['Upload'];
  payload: UpdatePersonProfileDto;
};


export type MutationUpdateUserProfileWithoutImageArgs = {
  payload: UpdatePersonProfileDto;
};


export type MutationUploadDocumentArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};


export type MutationAssignSubjectToTeacherArgs = {
  payload: AssignTeacherToSubjectsDto;
};


export type MutationAssignClassToTeacherArgs = {
  payload: AssignTeacherToClassDto;
};


export type MutationDeactivateTeacherClassArgs = {
  payload: UpdateStudentClassDto;
};


export type MutationActivateTeacherClassArgs = {
  payload: UpdateStudentClassDto;
};


export type MutationActivateTeacherSubjectArgs = {
  payload: DeactivateTeacherSubjectRecordDto;
};


export type MutationDeactivateTeacherSubjectArgs = {
  payload: DeactivateTeacherSubjectRecordDto;
};


export type MutationCreateStudentClassAttendanceRecordArgs = {
  payload: CreateClassAttendanceDto;
};


export type MutationGiveSubjectAssignmentArgs = {
  payload: GiveAssignmentTaskDto;
};


export type MutationUpdateSubjectAssignmentArgs = {
  payload: UpdateAssignmentTaskDto;
};


export type MutationDeleteSubjectAssignmentArgs = {
  assignmentId: Scalars['String'];
};


export type MutationGradeAssignmentArgs = {
  payload: ScoreGradingDto;
};


export type MutationUpdateAssignmentGradeScoreArgs = {
  payload: UpdateScoreDto;
};


export type MutationGradeCaTestArgs = {
  payload: ScoreGradingDto;
};


export type MutationUpdateCaTestGradeScoreArgs = {
  payload: UpdateScoreDto;
};


export type MutationGradeExamArgs = {
  payload: ScoreGradingDto;
};


export type MutationUpdateExamGradeScoreArgs = {
  payload: UpdateScoreDto;
};


export type MutationGiveCaTestArgs = {
  payload: GiveCaTaskDto;
};


export type MutationGiveSubjectNoteArgs = {
  payload: GiveSubjectNoteTaskDto;
};


export type MutationDeleteNoteArgs = {
  subjectNoteId: Scalars['String'];
};


export type MutationUpdateSubjectNoteArgs = {
  payload: UpdateSubjectNoteTaskDto;
};


export type MutationGiveSubjectExamArgs = {
  payload: GiveExamTaskDto;
};


export type MutationGetClassMeetingAttendanceArgs = {
  classMeetingId: Scalars['String'];
};


export type MutationAssignSubjectListToStudentArgs = {
  payload: AssignTeacherToSubjectsDto;
};


export type MutationCreateSubjectTopicArgs = {
  payload: SubjectTopicDto;
};


export type MutationUpdateSubjectTopicArgs = {
  payload: UpdateSubjectTopicDto;
};


export type MutationDeactivateSubjectTopicArgs = {
  subjectTopicId: Scalars['String'];
};


export type MutationCreateSubjectExamParticipationArgs = {
  examId: Scalars['String'];
};


export type MutationCreateSubjectCaParticipationArgs = {
  caTestId: Scalars['String'];
};


export type MutationSubmitExamArgs = {
  payload: SubmitExamDto;
};


export type MutationSaveExamScreenshotArgs = {
  payload: ScreenshotDto;
};


export type MutationSubmitCaTestArgs = {
  payload: SubmitExamDto;
};


export type MutationSaveCaTestScreenshotArgs = {
  payload: ScreenshotDto;
};


export type MutationSubmitAssignmentArgs = {
  payload: SubjectAssignmentSubmissionDto;
};


export type MutationCreateSchoolSessionArgs = {
  sessionName: Scalars['String'];
};


export type MutationLoginArgs = {
  payload: AuthDto;
};


export type MutationCreateChatSubjectMessageArgs = {
  payload: SendChatMessageDto;
};


export type MutationCreateChatClassMessageArgs = {
  payload: SendChatMessageDto;
};

/** This are what say if an API operation was successful */
export enum OperationType {
  Sucessfull = 'SUCESSFULL',
  Failed = 'FAILED'
}

/** Lists all valid Roles for Origami */
export enum OrigamiRole {
  Admin = 'ADMIN',
  Teacher = 'TEACHER',
  Student = 'STUDENT'
}

/** Details about each 'ORIGAMI' user */
export type Person = {
  __typename?: 'Person';
  Id: Scalars['ID'];
  FirstName: Scalars['String'];
  LastName: Scalars['String'];
  Role: OrigamiRole;
  Username: Scalars['String'];
  Password: Scalars['String'];
  PassportUrl: Scalars['String'];
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
  LastLogin: Scalars['DateTime'];
  SubjectList: Array<Subject>;
  ClassList: Array<School_Class>;
  SubjectAssignmentScoreList: Array<Subject_Assignment_Score>;
  SubjectCAScoreList: Array<Subject_Ca_Score>;
  SubjectExamScoreList: Array<Subject_Exam_Score>;
  ClassMeetingList: Array<Class_Meeting>;
  ClassAttendanceList: Array<Class_Meeting>;
  ChatMessagesByClass: Array<Chat_By_Class>;
  ChatMessagesBySubject: Array<Chat_By_Subject>;
  SubjectAssignmentsCreatedByYou: Array<Subject_Assignment>;
  SubjectCATestsCreatedByYou: Array<Subject_Ca>;
  SubjectExamsCreatedByYou: Array<Subject_Exam>;
  SubjectNotesCreatedByYou: Array<Subject_Note>;
  ExamsParticipatedInByYou: Array<Subject_Exam_Participation>;
  CAsParticipatedInByYou: Array<Subject_Ca_Participation>;
  SubjectTopicList: Array<Subject_Topic>;
};

export type PersonRegistrationDto = {
  FirstName: Scalars['String'];
  LastName: Scalars['String'];
  Role: OrigamiRole;
  Username: Scalars['String'];
  PassportUrl?: Maybe<Scalars['String']>;
  ClassId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getClassCategories: Array<SelectListData>;
  getOrigamiRoles: Array<SelectListData>;
  getExamTypes: Array<SelectListData>;
  getContiniousAssesmentTypes: Array<SelectListData>;
  getAllocatedTimeIntervals: Array<SelectListData>;
  getMarkGrades: Array<SelectListData>;
  getOperationTypes: Array<SelectListData>;
  getAClassById: School_Class;
  getAllSchoolClasses: Array<School_Class>;
  getAllActiveSchoolClasses: Array<School_Class>;
  getAllDeactivatedClasses: Array<School_Class>;
  getAllSubjects: Array<Subject>;
  getAllActiveSubjects: Array<Subject>;
  getSubjectById: Subject;
  getStudentsBySubject: Array<Student_Subject>;
  getPersonById: Person;
  /**
   * Returns the person details for a logged in user by extracting their 
   *         user details from the request's authentication token
   */
  getUserProfile: Person;
  getUsersByRole: Array<Person>;
  getInActiveUsersForARole: Array<Person>;
  getActiveUsersForARole: Array<Person>;
  getPersonByUsername: Person;
  /** Returns a list of all the assignments for a given subject */
  getSubjectAssignmentsBySubject: Array<Subject_Assignment>;
  /** Returns an assignment */
  getSubjectAssignmentById: Subject_Assignment;
  getAssignmentSubmissionsByAssignment: Array<Subject_Assignment_Submission>;
  getAssignmentSubmissionById: Subject_Assignment_Submission;
  getSubjectAssignmentScoreById: Subject_Assignment_Score;
  getSubjectCAScoreById: Subject_Ca_Score;
  getSubjectExamScoreById: Subject_Exam_Score;
  getNotesBySubject: Array<Subject_Note>;
  getASubjectNote: Subject_Note;
  getAllOnGoingExams: Array<Subject_Exam>;
  getAllExamsTeacherCreated: Array<SubjectExamReMap>;
  getCompletedExams: Array<Subject_Exam>;
  getAllOnGoingCATests: Array<Subject_Ca>;
  getAllCompletedCATests: Array<Subject_Ca>;
  getAllCATestsCreatedByTeacher: Array<SubjectCaReMap>;
  /** This returns then list of subjects handled by a teacher */
  getSubjectsAssignedToTeacher: Array<Subject>;
  getExamParticipation: Subject_Exam_Participation;
  getCAParticipation: Array<Subject_Ca_Participation>;
  getExamParticipationScreenshots: Array<Subject_Exam_Participation_Screenshot>;
  getCAParticipationScreenshots: Array<Subject_Ca_Participation_Screenshot>;
  getExamSubmissions: Array<Subject_Exam_Submission>;
  getExamSubmission: Subject_Exam_Submission;
  getExamParticipationList: Array<Subject_Exam_Participation>;
  getCASubmissions: Array<Subject_Ca_Submission>;
  getCASubmission: Subject_Ca_Submission;
  getSubjectTopics: Array<Subject_Topic>;
  getSubjectTopic: Subject_Topic;
  getAllSubjectsAssignedToStudent: Array<Student_Subject>;
  getSubjectStudentShouldEnrollFor: Array<Subject>;
  getAllSubjectAssignments: Array<Array<Subject_Assignment>>;
  getAssignmentsBySubject: Array<Subject_Assignment>;
  getLatestAssignmentsBySubject: Array<Subject_Assignment>;
  getDoneAssignments: Array<Subject_Assignment>;
  getUndoneAssignments: Array<Subject_Assignment>;
  getAssignment: Subject_Assignment;
  getStudentAssignmentSubmission: Subject_Assignment_Submission;
  getAssignmentScore: Subject_Assignment_Score;
  getAllSubjectCA: Array<Array<Subject_Ca>>;
  getAllSubjectExam: Array<Array<Subject_Exam>>;
  getUndoneExams: Array<Subject_Exam>;
  getExamsBySubject: Array<Subject_Exam>;
  getExam: Subject_Exam;
  getDoneExams: Array<Subject_Exam>;
  getUserExamSubmission: Subject_Exam_Submission;
  getAssignmentListBySubject: Array<Subject_Assignment>;
  getCAListBySubject: Array<Subject_Ca>;
  getExamListBySubject: Array<Subject_Ca>;
  getUndoneCATests: Array<Subject_Ca>;
  getCATestsBySubject: Array<Subject_Ca>;
  getCATest: Subject_Ca;
  getDoneCATests: Array<Subject_Ca>;
  getUserCATestSubmission: Subject_Ca_Submission;
  getCATestParticipation: Subject_Ca_Participation;
  getSubjectNotes: Array<Subject_Note>;
  getSubjectNote: Subject_Note;
  getAllSchoolSessions: Array<School_Session>;
  getAllSchoolSessionByActive: Array<School_Session>;
  getMessagesForSubjectChatRoom: Array<Chat_By_Subject>;
  getMessagesForClassChatRoom: Array<Chat_By_Class>;
  getChatRoomParticipants: Array<Person>;
  getUserChatRooms: ChatRoomList;
};


export type QueryGetAClassByIdArgs = {
  Id: Scalars['String'];
};


export type QueryGetSubjectByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetStudentsBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetPersonByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersByRoleArgs = {
  role: Scalars['String'];
};


export type QueryGetInActiveUsersForARoleArgs = {
  role: Scalars['String'];
};


export type QueryGetActiveUsersForARoleArgs = {
  role: Scalars['String'];
};


export type QueryGetPersonByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetSubjectAssignmentsBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetSubjectAssignmentByIdArgs = {
  assignmentId: Scalars['String'];
};


export type QueryGetAssignmentSubmissionsByAssignmentArgs = {
  subjectAssignmentId: Scalars['String'];
};


export type QueryGetAssignmentSubmissionByIdArgs = {
  subjectAssignmentSubmissionId: Scalars['String'];
};


export type QueryGetSubjectAssignmentScoreByIdArgs = {
  subjectAssignmentSubmissionId: Scalars['String'];
};


export type QueryGetSubjectCaScoreByIdArgs = {
  subjectCASubmissionId: Scalars['String'];
};


export type QueryGetSubjectExamScoreByIdArgs = {
  subjectExamSubmissionId: Scalars['String'];
};


export type QueryGetNotesBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetASubjectNoteArgs = {
  subjectNoteId: Scalars['String'];
};


export type QueryGetSubjectsAssignedToTeacherArgs = {
  userId: Scalars['String'];
};


export type QueryGetExamParticipationArgs = {
  examId: Scalars['String'];
};


export type QueryGetCaParticipationArgs = {
  caId: Scalars['String'];
};


export type QueryGetExamParticipationScreenshotsArgs = {
  examParticipationId: Scalars['String'];
};


export type QueryGetCaParticipationScreenshotsArgs = {
  caParticipationId: Scalars['String'];
};


export type QueryGetExamSubmissionsArgs = {
  examId: Scalars['String'];
};


export type QueryGetExamSubmissionArgs = {
  examSubmissionId: Scalars['String'];
};


export type QueryGetExamParticipationListArgs = {
  examId: Scalars['String'];
};


export type QueryGetCaSubmissionsArgs = {
  caId: Scalars['String'];
};


export type QueryGetCaSubmissionArgs = {
  caSubmissionId: Scalars['String'];
};


export type QueryGetSubjectTopicsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetSubjectTopicArgs = {
  subjectTopicId: Scalars['String'];
};


export type QueryGetAssignmentsBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetLatestAssignmentsBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetDoneAssignmentsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetUndoneAssignmentsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetAssignmentArgs = {
  assignmentId: Scalars['String'];
};


export type QueryGetStudentAssignmentSubmissionArgs = {
  assignmentId: Scalars['String'];
};


export type QueryGetAssignmentScoreArgs = {
  assignmentId: Scalars['String'];
};


export type QueryGetAllSubjectCaArgs = {
  personId: Scalars['String'];
};


export type QueryGetUndoneExamsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetExamsBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetExamArgs = {
  examId: Scalars['String'];
};


export type QueryGetDoneExamsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetUserExamSubmissionArgs = {
  examId: Scalars['String'];
};


export type QueryGetAssignmentListBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetCaListBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetExamListBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetUndoneCaTestsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetCaTestsBySubjectArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetCaTestArgs = {
  caTestId: Scalars['String'];
};


export type QueryGetDoneCaTestsArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetUserCaTestSubmissionArgs = {
  caTestId: Scalars['String'];
};


export type QueryGetCaTestParticipationArgs = {
  caTestId: Scalars['String'];
};


export type QueryGetSubjectNotesArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetSubjectNoteArgs = {
  noteId: Scalars['String'];
};


export type QueryGetAllSchoolSessionByActiveArgs = {
  active: Scalars['Boolean'];
};


export type QueryGetMessagesForSubjectChatRoomArgs = {
  subjectId: Scalars['String'];
};


export type QueryGetMessagesForClassChatRoomArgs = {
  classId: Scalars['String'];
};


export type QueryGetChatRoomParticipantsArgs = {
  payload: GetChatRoomParticipantDto;
};


export type QueryGetUserChatRoomsArgs = {
  payload: ChatRoomSelectionDto;
};

/** This entity holds the classes in a given school.(i.e SS.1) */
export type School_Class = {
  __typename?: 'School_Class';
  Id: Scalars['ID'];
  Name: Scalars['String'];
  ClassCategory: ClassCategory;
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
  ClassMeetingList: Array<Class_Meeting>;
  StudentList: Array<Student>;
  ChatMessagesByClass: Array<Chat_By_Class>;
  SchoolSessionId: Scalars['String'];
  SchoolSession: School_Session;
};

export type School_Class_Dto = {
  Name: Scalars['String'];
  ClassCategory: ClassCategory;
};

/** This entity holds the session (I.e '2018/2019') */
export type School_Session = {
  __typename?: 'School_Session';
  Id: Scalars['ID'];
  /** I.E(2018/2019) */
  Name: Scalars['String'];
  /**
   * Used to tell if a session is currently active and can be started.
   *         NOTE: Only one session can be turned on at a time
   */
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
  SubjectAssignmentList: Array<Subject_Assignment>;
  SubjectCAList: Array<Subject_Ca>;
  SubjectExamList: Array<Subject_Exam>;
  SchoolClassList: Array<School_Class>;
};

/**
 * Used by a user in TEACHER role for grading either an Assignment, 
 *     CA test or an Exam by a teacher
 */
export type ScoreGradingDto = {
  /**
   * Refers to Either an AssignmentSubmissionId, ExamSubmissionId, 
   *         or CATestSubmissionId depending on the context
   */
  Id: Scalars['String'];
  Remark?: Maybe<Scalars['String']>;
  Score: Scalars['Int'];
};

export type ScreenshotDto = {
  ParticipationId: Scalars['String'];
  DataUri: Scalars['String'];
};

export type SelectListData = {
  __typename?: 'SelectListData';
  Name: Scalars['String'];
  Value: Scalars['String'];
};

export type SendChatMessageDto = {
  Message: Scalars['String'];
  /**
   * This refers to either SubjectId or ClassId 
   *         depending on the type of chat that is going on
   */
  RoomId: Scalars['String'];
  /** Refers to the PersonId of the user who sent the Message */
  PersonId?: Maybe<Scalars['String']>;
};

/** This entity holds record of registered users who are students */
export type Student = {
  __typename?: 'Student';
  Id: Scalars['ID'];
  PersonId: Scalars['String'];
  Person: Person;
  SchoolClassId: Scalars['String'];
  SchoolClass: School_Class;
  DateCreated: Scalars['DateTime'];
  Active: Scalars['Boolean'];
  StudentSubjectList: Array<Student_Subject>;
  SubjectAssignmentSubmissionList: Array<Subject_Exam_Submission>;
  SubjectCASubmissionList: Array<Subject_Ca_Submission>;
  SubjectExamSubmissionList: Array<Subject_Exam_Submission>;
};

/** This holds all the records of classes offered by a scondary school student */
export type Student_Subject = {
  __typename?: 'Student_Subject';
  Id: Scalars['ID'];
  StudentId: Scalars['String'];
  Student: Student;
  SubjectId: Scalars['String'];
  Subject: Subject;
  DateCreated: Scalars['DateTime'];
  Active: Scalars['Boolean'];
};

/** Holds Subjects offered by a School */
export type Subject = {
  __typename?: 'Subject';
  Id: Scalars['ID'];
  Name: Scalars['String'];
  ClassCategory: ClassCategory;
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
  TeacherSubjectList: Array<Subject_Assignment>;
  SubjectAssignmentList: Array<Subject_Assignment>;
  SubjectCAList: Array<Subject_Ca>;
  ClassMeetingList: Array<Class_Meeting>;
  StudentSubjectList: Array<Student_Subject>;
  ChatMessagesBySubject: Array<Chat_By_Subject>;
  SubjectNoteList: Array<Subject_Note>;
  SubjectExamList: Array<Subject_Exam>;
  SubjectTopicList: Array<Subject_Topic>;
};

/** This entity holds all the assignments given per subject. */
export type Subject_Assignment = {
  __typename?: 'Subject_Assignment';
  Id: Scalars['ID'];
  SubjectId: Scalars['String'];
  /**
   * Field holds a link to a .docx file uploaded 
   *         by the teacher listing the questions for the assignment
   */
  AttachedFile: Scalars['String'];
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.e( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  SchoolSessionId: Scalars['String'];
  SchoolSession: School_Session;
  DateCreated: Scalars['DateTime'];
  Subject: Subject;
  /** Identity of the user who created the assignment */
  PersonId: Scalars['String'];
  Person: Person;
  Active: Scalars['Boolean'];
  DueDate: Scalars['DateTime'];
  SubjectTopicId: Scalars['String'];
  SubjectTopic: Subject_Topic;
  SubjectAssigmentSubmissionList: Array<Subject_Assignment_Submission>;
};

/** This entity holds the score of each assignment as scored by the teacher */
export type Subject_Assignment_Score = {
  __typename?: 'Subject_Assignment_Score';
  Id: Scalars['ID'];
  SubjectAssignmentSubmissionId: Scalars['String'];
  SubjectAssignmentSubmission: Subject_Assignment_Submission;
  /** 'Id' of each student that takes submits the assignment */
  PersonId: Scalars['String'];
  Person: Person;
  Score: Scalars['Int'];
  Remark?: Maybe<Scalars['String']>;
  DateCreated: Scalars['DateTime'];
};

/** This entity holds all the assignments submitted by a student */
export type Subject_Assignment_Submission = {
  __typename?: 'Subject_Assignment_Submission';
  Id: Scalars['ID'];
  StudentId: Scalars['String'];
  Student: Student;
  AttachedFile: Scalars['String'];
  SubjectAssignmentId: Scalars['String'];
  SubjectAssignment: Subject_Assignment;
  DateCreated: Scalars['DateTime'];
  SubjectAssignmentScoreList: Array<Subject_Assignment_Score>;
};

/** This entity contains all CA tests given by a teacher */
export type Subject_Ca = {
  __typename?: 'Subject_CA';
  Id: Scalars['ID'];
  ContinousAssesmentType: ContinousAssesmentType;
  SubjectId: Scalars['String'];
  /**
   * Field holds a link to a .docx file uploaded 
   *         by the teacher listing the questions for the assignment
   */
  AttachedFile: Scalars['String'];
  AllocatedTime: AllocatedTimeInterval;
  SelectedDateTime: Scalars['DateTime'];
  DateCreated: Scalars['DateTime'];
  Subject: Subject;
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.E( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  SchoolSessionId: Scalars['String'];
  SchoolSession: School_Session;
  /** Identity of the user who created the CA test */
  PersonId: Scalars['String'];
  Person: Person;
  SubjectCASubmissionList: Array<Subject_Ca_Submission>;
  SubjectCAParticipationList: Array<Subject_Ca_Participation>;
};

/** Holds details about a student and the exam they participated in */
export type Subject_Ca_Participation = {
  __typename?: 'Subject_CA_Participation';
  Id: Scalars['ID'];
  SubjectCAId: Scalars['String'];
  SubjectCA: Subject_Ca;
  PersonId: Scalars['String'];
  Person: Person;
  DateCreated: Scalars['DateTime'];
  SubjectCAParticipationScreenshotList: Array<Subject_Ca_Participation_Screenshot>;
};

/**
 * Catalogs all the screenshot taken as safety measures from 
 *     a student during the cause of a test
 */
export type Subject_Ca_Participation_Screenshot = {
  __typename?: 'Subject_CA_Participation_Screenshot';
  Id: Scalars['ID'];
  Url: Scalars['String'];
  DateCreated: Scalars['DateTime'];
  SubjectCAParticipationId: Scalars['String'];
  SubjectCAParticipation: Subject_Ca_Participation;
};

/** This entity holds the scores for each student CA test scores per subject */
export type Subject_Ca_Score = {
  __typename?: 'Subject_CA_Score';
  Id: Scalars['ID'];
  SubjectCASubmissionId: Scalars['String'];
  SubjectCASubmission: Subject_Ca_Submission;
  PersonId: Scalars['String'];
  Person: Person;
  Remark?: Maybe<Scalars['String']>;
  Score: Scalars['Int'];
  DateCreated: Scalars['DateTime'];
};

/** This entity holds all the continious assesments submitted by a student */
export type Subject_Ca_Submission = {
  __typename?: 'Subject_CA_Submission';
  Id: Scalars['ID'];
  AttachedFile: Scalars['String'];
  StudentId: Scalars['String'];
  Student: Student;
  SubjectCAId: Scalars['String'];
  SubjectCA: Subject_Ca;
  DateCreated: Scalars['DateTime'];
  SubjectCAScore: Array<Subject_Ca_Score>;
};

export type Subject_Dto = {
  Name: Scalars['String'];
  ClassCategory: ClassCategory;
};

/** This entity holds all the exams added per subject */
export type Subject_Exam = {
  __typename?: 'Subject_Exam';
  Id: Scalars['ID'];
  SchoolSessionId: Scalars['String'];
  SubjectId: Scalars['String'];
  Subject: Subject;
  SchoolSession: School_Session;
  ExamType: ExamType;
  AllocatedTime: AllocatedTimeInterval;
  SelectedDateTime: Scalars['DateTime'];
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.e( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  AttachedFile: Scalars['String'];
  DateCreated: Scalars['DateTime'];
  /** Identity of the user(teacher) who creates the Exam */
  PersonId: Person;
  Person: Person;
  SubjectExamSubmissionList: Array<Subject_Exam_Submission>;
  SubjectExamParticipationList: Array<Subject_Exam_Participation>;
};

/** Holds details about a student and the exam they participated in */
export type Subject_Exam_Participation = {
  __typename?: 'Subject_Exam_Participation';
  Id: Scalars['ID'];
  SubjectExamId: Scalars['String'];
  SubjectExam: Subject_Exam;
  PersonId: Scalars['String'];
  Person: Person;
  DateCreated: Scalars['DateTime'];
  SubjectExamParticipationScreenshotList: Array<Subject_Exam_Participation_Screenshot>;
};

/**
 * Catalogs all the screenshot taken as safety measures from 
 *     a student during the cause of a test
 */
export type Subject_Exam_Participation_Screenshot = {
  __typename?: 'Subject_Exam_Participation_Screenshot';
  Id: Scalars['ID'];
  Url: Scalars['String'];
  DateCreated: Scalars['DateTime'];
  SubjectExamParticipationId: Scalars['String'];
  SubjectExamParticipation: Subject_Exam_Participation;
};

/** This entity holds the score of a student per exam */
export type Subject_Exam_Score = {
  __typename?: 'Subject_Exam_Score';
  Id: Scalars['ID'];
  SubjectExamSubmissionId: Scalars['String'];
  SubjectExamSubmission: Subject_Exam_Submission;
  PersonId: Scalars['String'];
  Person: Person;
  Score: Scalars['Int'];
  Remark?: Maybe<Scalars['String']>;
  DateCreated: Scalars['DateTime'];
};

/** This entity holds all the scores for exams a student has written */
export type Subject_Exam_Submission = {
  __typename?: 'Subject_Exam_Submission';
  Id: Scalars['ID'];
  AttachedFile: Scalars['String'];
  StudentId: Scalars['String'];
  Student: Student;
  SubjectExamId: Scalars['String'];
  SubjectExam: Subject_Exam;
  DateCreated: Scalars['DateTime'];
  SubjectExamScoreList: Array<Subject_Exam_Score>;
};

/** Holds all notes added by a teacher for a subject */
export type Subject_Note = {
  __typename?: 'Subject_Note';
  Id: Scalars['ID'];
  AttachedFile: Scalars['String'];
  SubjectId: Scalars['String'];
  Subject: Subject;
  SubjectTopicId: Scalars['String'];
  SubjectTopic: Subject_Topic;
  PersonId: Scalars['String'];
  Person: Person;
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
};

export type Subject_Topic = {
  __typename?: 'Subject_Topic';
  Id: Scalars['ID'];
  SubjectId: Scalars['String'];
  Subject: Subject;
  PersonId: Scalars['String'];
  Person: Person;
  Title: Scalars['String'];
  DateCreated: Scalars['DateTime'];
  Active: Scalars['Boolean'];
  SubjectNoteList: Array<Subject_Note>;
  SubjectAssignmentList: Array<Subject_Assignment>;
};

/**
 * This carries the subject assignment. This version 
 *     is remapped to hold all Date columns as string. This is to avoid a bug in GraphQL
 */
export type SubjectAssignmentReMap = {
  __typename?: 'SubjectAssignmentReMap';
  Id: Scalars['ID'];
  SubjectId: Scalars['String'];
  /**
   * Field holds a link to a .docx file uploaded 
   *         by the teacher listing the questions for the assignment
   */
  AttachedFile: Scalars['String'];
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.e( 8/10 )
   */
  TotalExpectedScore: Scalars['Int'];
  SchoolSessionId: Scalars['String'];
  SchoolSession: School_Session;
  DateCreated: Scalars['String'];
  Subject: Subject;
  /** Identity of the user who created the assignment */
  PersonId: Scalars['String'];
  Person: Person;
  Active: Scalars['Boolean'];
  DueDate: Scalars['String'];
};

/** Used for collecting a student's assignment submission */
export type SubjectAssignmentSubmissionDto = {
  AttachedFile: Scalars['String'];
  SubjectAssignmentId: Scalars['String'];
};

/** This contains exams that have been remapped */
export type SubjectCaReMap = {
  __typename?: 'SubjectCAReMap';
  SerialNumber: Scalars['Int'];
  Id: Scalars['String'];
  Subject: Scalars['String'];
  CAType: ContinousAssesmentType;
  SelectedDateTime: Scalars['DateTime'];
  SchoolSession: Scalars['String'];
  TotalExpectedScore: Scalars['Int'];
  DateCreated: Scalars['DateTime'];
};

/** Collect details for subject exam */
export type SubjectExamParticipationDto = {
  PersonId: Scalars['String'];
  SubjectExamId: Scalars['String'];
};

/** This contains exams that have been remapped */
export type SubjectExamReMap = {
  __typename?: 'SubjectExamReMap';
  SerialNumber: Scalars['Int'];
  Id: Scalars['String'];
  Subject: Scalars['String'];
  ExamType: ExamType;
  SelectedDateTime: Scalars['DateTime'];
  SchoolSession: Scalars['String'];
  TotalExpectedScore: Scalars['Int'];
  DateCreated: Scalars['DateTime'];
};

export type SubjectTopicDto = {
  Title: Scalars['String'];
  SubjectId: Scalars['String'];
};

export type SubmitExamDto = {
  AttachedFile: Scalars['String'];
  Id: Scalars['String'];
};

/**
 * This entity holds all the classes(i.e primary 4) assigned to a teacher.
 *     NOTE: This is for Primary school teachers/Secondary school form teachers as they are 
 *     NOT usually assigned by subjects, a
 *     but by the class they are assigned to manage
 */
export type Teacher_Class = {
  __typename?: 'Teacher_Class';
  Id: Scalars['ID'];
  PersonId: Scalars['String'];
  /**
   * This field has a one-to-one relationship with schoolClass(I.E SS1), 
   *         beacause it is expected that a teacher can be only assigned to ONLY one class
   */
  SchoolClassId: Scalars['String'];
  Person: Person;
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
  SchoolClass: School_Class;
};

/**
 * This entity holds all the subject(i.e Litrature) 
 *     that are assignment to a given teacher.
 *     NOTE: This is for Secondary school teachers as they are not usually assigned by class, 
 *     but by the subject they teach
 */
export type Teacher_Subject = {
  __typename?: 'Teacher_Subject';
  Id: Scalars['ID'];
  PersonId: Scalars['String'];
  SubjectId: Scalars['String'];
  Active: Scalars['Boolean'];
  DateCreated: Scalars['DateTime'];
  Person: Person;
  Subject: Subject;
};

export type Update_School_Class_Dto = {
  Id: Scalars['String'];
  Name: Scalars['String'];
  ClassCategory: ClassCategory;
};

export type Update_Subject_Dto = {
  Id: Scalars['String'];
  Name?: Maybe<Scalars['String']>;
  ClassCategory?: Maybe<ClassCategory>;
};

export type UpdateAssignmentTaskDto = {
  AssignmentId: Scalars['String'];
  SubjectId?: Maybe<Scalars['String']>;
  SubjectTopicId?: Maybe<Scalars['String']>;
  /**
   * Field holds a link to a .docx file uploaded 
   *         by the teacher listing the questions for the assignment
   */
  AttachedFile?: Maybe<Scalars['String']>;
  /**
   * This holds the total expected score for each assignment. 
   *         To be used for grading. I.e( 8/10 )
   */
  TotalExpectedScore?: Maybe<Scalars['Int']>;
  /** The date when the assignment becomes inactive */
  DueDate?: Maybe<Scalars['DateTime']>;
};

/** Used to update the Profile of a user. UserId is gotten from the Token */
export type UpdatePersonProfileDto = {
  FirstName?: Maybe<Scalars['String']>;
  LastName?: Maybe<Scalars['String']>;
  Username?: Maybe<Scalars['String']>;
};

/** Type for updating a person profile */
export type UpdatePersonRegistrationDto = {
  PersonId: Scalars['String'];
  FirstName?: Maybe<Scalars['String']>;
  LastName?: Maybe<Scalars['String']>;
  Username?: Maybe<Scalars['String']>;
  Password?: Maybe<Scalars['String']>;
  PassportUrl?: Maybe<Scalars['String']>;
  ClassId?: Maybe<Scalars['String']>;
};

export type UpdateSchoolSessionDto = {
  Id: Scalars['String'];
  Active: Scalars['Boolean'];
};

/** Used for updating score set for an assignment submission or a CA Test submission */
export type UpdateScoreDto = {
  /**
   * Refers to Either an AssignmentSubmissionId, ExamSubmissionId, 
   *         or CATestSubmissionId depending on the context
   */
  Id: Scalars['String'];
  Remark?: Maybe<Scalars['String']>;
  Score?: Maybe<Scalars['Int']>;
};

/** DTO for updating a student's class, I.E after they graduate */
export type UpdateStudentClassDto = {
  PersonId: Scalars['String'];
  ClassId: Scalars['String'];
};

export type UpdateSubjectNoteTaskDto = {
  Id: Scalars['String'];
  AttachedFile?: Maybe<Scalars['String']>;
  SubjectId?: Maybe<Scalars['String']>;
  SubjectTopicId?: Maybe<Scalars['String']>;
};

export type UpdateSubjectTopicDto = {
  Id: Scalars['String'];
  Title?: Maybe<Scalars['String']>;
  SubjectId?: Maybe<Scalars['String']>;
};


export type LoginMutationVariables = {
  data: AuthDto;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'UserId' | 'Username' | 'Role' | 'Token' | 'TokenExpiryDate'>
  ) }
);

export type CreateSchoolClassMutationVariables = {
  payload: School_Class_Dto;
};


export type CreateSchoolClassMutation = (
  { __typename?: 'Mutation' }
  & { createSchoolClass: (
    { __typename?: 'School_Class' }
    & Pick<School_Class, 'Id' | 'Name'>
  ) }
);

export type DeactivateSchoolClassMutationVariables = {
  data: Scalars['String'];
};


export type DeactivateSchoolClassMutation = (
  { __typename?: 'Mutation' }
  & { deactivateSchoolClass: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type UpdateClassMutationVariables = {
  data: Update_School_Class_Dto;
};


export type UpdateClassMutation = (
  { __typename?: 'Mutation' }
  & { updateSchoolClass: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type AssignClassToTeacherMutationVariables = {
  payload: AssignTeacherToClassDto;
};


export type AssignClassToTeacherMutation = (
  { __typename?: 'Mutation' }
  & { assignClassToTeacher: (
    { __typename?: 'Teacher_Class' }
    & Pick<Teacher_Class, 'Id'>
  ) }
);

export type AssignSubjectToTeacherMutationVariables = {
  payload: AssignTeacherToSubjectsDto;
};


export type AssignSubjectToTeacherMutation = (
  { __typename?: 'Mutation' }
  & { assignSubjectToTeacher: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type DeleteSubjectMutationVariables = {
  data: Scalars['String'];
};


export type DeleteSubjectMutation = (
  { __typename?: 'Mutation' }
  & { deactivateSubject: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type CreateSubjectMutationVariables = {
  payload: Subject_Dto;
};


export type CreateSubjectMutation = (
  { __typename?: 'Mutation' }
  & { createSubject: (
    { __typename?: 'Subject' }
    & Pick<Subject, 'Name'>
  ) }
);

export type UpdateSubjectMutationVariables = {
  payload: Update_Subject_Dto;
};


export type UpdateSubjectMutation = (
  { __typename?: 'Mutation' }
  & { updateSubject: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type RegisterUserMutationVariables = {
  payload: PersonRegistrationDto;
};


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerPerson: (
    { __typename?: 'Person' }
    & Pick<Person, 'Id'>
  ) }
);

export type UpdateUserMutationVariables = {
  payload: UpdatePersonRegistrationDto;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updatePersonDetails: (
    { __typename?: 'Person' }
    & Pick<Person, 'Id'>
  ) }
);

export type DeactivateUserMutationVariables = {
  payload: Scalars['String'];
};


export type DeactivateUserMutation = (
  { __typename?: 'Mutation' }
  & { deactivateUserStatus: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type UpdateUserProfileWithoutImageMutationVariables = {
  payload: UpdatePersonProfileDto;
};


export type UpdateUserProfileWithoutImageMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfileWithoutImage: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type GiveSubjectAssignmentMutationVariables = {
  payload: GiveAssignmentTaskDto;
};


export type GiveSubjectAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { giveSubjectAssignment: (
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'Id'>
  ) }
);

export type UpdateSubjectAssignmentMutationVariables = {
  payload: UpdateAssignmentTaskDto;
};


export type UpdateSubjectAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { updateSubjectAssignment: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type DeleteSubjectAssignmentMutationVariables = {
  assignmentId: Scalars['String'];
};


export type DeleteSubjectAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { deleteSubjectAssignment: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type GradeAssignmentMutationVariables = {
  payload: ScoreGradingDto;
};


export type GradeAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { gradeAssignment: (
    { __typename?: 'Subject_Assignment_Score' }
    & Pick<Subject_Assignment_Score, 'Id'>
  ) }
);

export type GradeCaTestMutationVariables = {
  payload: ScoreGradingDto;
};


export type GradeCaTestMutation = (
  { __typename?: 'Mutation' }
  & { gradeCATest: (
    { __typename?: 'Subject_CA_Score' }
    & Pick<Subject_Ca_Score, 'Id'>
  ) }
);

export type GradeExamMutationVariables = {
  payload: ScoreGradingDto;
};


export type GradeExamMutation = (
  { __typename?: 'Mutation' }
  & { gradeExam: (
    { __typename?: 'Subject_Exam_Score' }
    & Pick<Subject_Exam_Score, 'Id'>
  ) }
);

export type GiveSubjectExamMutationVariables = {
  payload: GiveExamTaskDto;
};


export type GiveSubjectExamMutation = (
  { __typename?: 'Mutation' }
  & { giveSubjectExam: (
    { __typename?: 'Subject_Exam' }
    & Pick<Subject_Exam, 'Id'>
  ) }
);

export type GiveSubjectCaTestMutationVariables = {
  payload: GiveCaTaskDto;
};


export type GiveSubjectCaTestMutation = (
  { __typename?: 'Mutation' }
  & { giveCATest: (
    { __typename?: 'Subject_CA' }
    & Pick<Subject_Ca, 'Id'>
  ) }
);

export type GiveSubjectNoteMutationVariables = {
  payload: GiveSubjectNoteTaskDto;
};


export type GiveSubjectNoteMutation = (
  { __typename?: 'Mutation' }
  & { giveSubjectNote: (
    { __typename?: 'Subject_Note' }
    & Pick<Subject_Note, 'Id'>
  ) }
);

export type UpdateSubjectNoteMutationVariables = {
  payload: UpdateSubjectNoteTaskDto;
};


export type UpdateSubjectNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateSubjectNote: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type DeleteSubjectNoteMutationVariables = {
  subjectNoteId: Scalars['String'];
};


export type DeleteSubjectNoteMutation = (
  { __typename?: 'Mutation' }
  & { deleteNote: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type SubmitSubjectAssignmentMutationVariables = {
  payload: SubjectAssignmentSubmissionDto;
};


export type SubmitSubjectAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { submitAssignment: (
    { __typename?: 'Subject_Assignment_Submission' }
    & Pick<Subject_Assignment_Submission, 'Id'>
  ) }
);

export type EnrollStudentForSubjectsMutationVariables = {
  payload: AssignTeacherToSubjectsDto;
};


export type EnrollStudentForSubjectsMutation = (
  { __typename?: 'Mutation' }
  & { assignSubjectListToStudent: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type UpdateAssignmentGradeScoreMutationVariables = {
  payload: UpdateScoreDto;
};


export type UpdateAssignmentGradeScoreMutation = (
  { __typename?: 'Mutation' }
  & { updateAssignmentGradeScore: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type UpdateExamGradeScoreMutationVariables = {
  payload: UpdateScoreDto;
};


export type UpdateExamGradeScoreMutation = (
  { __typename?: 'Mutation' }
  & { updateExamGradeScore: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type UpdateCaTestGradeScoreMutationVariables = {
  payload: UpdateScoreDto;
};


export type UpdateCaTestGradeScoreMutation = (
  { __typename?: 'Mutation' }
  & { updateCATestGradeScore: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type CreateSubjectExamParticipationMutationVariables = {
  examId: Scalars['String'];
};


export type CreateSubjectExamParticipationMutation = (
  { __typename?: 'Mutation' }
  & { createSubjectExamParticipation: (
    { __typename?: 'Subject_Exam_Participation' }
    & Pick<Subject_Exam_Participation, 'Id'>
  ) }
);

export type SubmitSubjectExamMutationVariables = {
  payload: SubmitExamDto;
};


export type SubmitSubjectExamMutation = (
  { __typename?: 'Mutation' }
  & { submitExam: (
    { __typename?: 'Subject_Exam_Submission' }
    & Pick<Subject_Exam_Submission, 'Id'>
  ) }
);

export type SaveExamScreenshotMutationVariables = {
  payload: ScreenshotDto;
};


export type SaveExamScreenshotMutation = (
  { __typename?: 'Mutation' }
  & { saveExamScreenshot: (
    { __typename?: 'Subject_Exam_Participation_Screenshot' }
    & Pick<Subject_Exam_Participation_Screenshot, 'Id' | 'Url'>
  ) }
);

export type SubmitSubjectCaTestMutationVariables = {
  payload: SubmitExamDto;
};


export type SubmitSubjectCaTestMutation = (
  { __typename?: 'Mutation' }
  & { submitCATest: (
    { __typename?: 'Subject_CA_Submission' }
    & Pick<Subject_Ca_Submission, 'Id'>
  ) }
);

export type SaveCaTestScreenshotMutationVariables = {
  payload: ScreenshotDto;
};


export type SaveCaTestScreenshotMutation = (
  { __typename?: 'Mutation' }
  & { saveCATestScreenshot: (
    { __typename?: 'Subject_CA_Participation_Screenshot' }
    & Pick<Subject_Ca_Participation_Screenshot, 'Id' | 'Url'>
  ) }
);

export type CreateSubjectCaTestParticipationMutationVariables = {
  caTestId: Scalars['String'];
};


export type CreateSubjectCaTestParticipationMutation = (
  { __typename?: 'Mutation' }
  & { createSubjectCAParticipation: (
    { __typename?: 'Subject_CA_Participation' }
    & Pick<Subject_Ca_Participation, 'Id'>
  ) }
);

export type CreateSubjectTopicMutationVariables = {
  payload: SubjectTopicDto;
};


export type CreateSubjectTopicMutation = (
  { __typename?: 'Mutation' }
  & { createSubjectTopic: (
    { __typename?: 'Subject_Topic' }
    & Pick<Subject_Topic, 'Id'>
  ) }
);

export type UpdateSubjectTopicMutationVariables = {
  payload: UpdateSubjectTopicDto;
};


export type UpdateSubjectTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateSubjectTopic: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type DeactivateSubjectTopicMutationVariables = {
  subjectTopicId: Scalars['String'];
};


export type DeactivateSubjectTopicMutation = (
  { __typename?: 'Mutation' }
  & { deactivateSubjectTopic: (
    { __typename?: 'CustomAPIType' }
    & Pick<CustomApiType, 'Message' | 'OperationStatus'>
  ) }
);

export type GetClassCategoriesQueryVariables = {};


export type GetClassCategoriesQuery = (
  { __typename?: 'Query' }
  & { getClassCategories: Array<(
    { __typename?: 'SelectListData' }
    & Pick<SelectListData, 'Name' | 'Value'>
  )> }
);

export type GetAllActiveSchoolClassesQueryVariables = {};


export type GetAllActiveSchoolClassesQuery = (
  { __typename?: 'Query' }
  & { getAllActiveSchoolClasses: Array<(
    { __typename?: 'School_Class' }
    & Pick<School_Class, 'Id' | 'Name' | 'ClassCategory'>
  )> }
);

export type GetClassByIdQueryVariables = {
  payload: Scalars['String'];
};


export type GetClassByIdQuery = (
  { __typename?: 'Query' }
  & { getAClassById: (
    { __typename?: 'School_Class' }
    & Pick<School_Class, 'Id' | 'Name' | 'ClassCategory'>
  ) }
);

export type GetUsersByRoleQueryVariables = {
  payload: Scalars['String'];
};


export type GetUsersByRoleQuery = (
  { __typename?: 'Query' }
  & { getUsersByRole: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'Id' | 'FirstName' | 'LastName' | 'Username'>
  )> }
);

export type GetAllActiveSubjectsQueryVariables = {};


export type GetAllActiveSubjectsQuery = (
  { __typename?: 'Query' }
  & { getAllActiveSubjects: Array<(
    { __typename?: 'Subject' }
    & Pick<Subject, 'Id' | 'Name' | 'ClassCategory'>
  )> }
);

export type GetSubjectByIdQueryVariables = {
  data: Scalars['String'];
};


export type GetSubjectByIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectById: (
    { __typename?: 'Subject' }
    & Pick<Subject, 'Name' | 'ClassCategory'>
  ) }
);

export type GetOrigamiRolesQueryVariables = {};


export type GetOrigamiRolesQuery = (
  { __typename?: 'Query' }
  & { getOrigamiRoles: Array<(
    { __typename?: 'SelectListData' }
    & Pick<SelectListData, 'Name' | 'Value'>
  )> }
);

export type GetActiveClassesForSelectListQueryVariables = {};


export type GetActiveClassesForSelectListQuery = (
  { __typename?: 'Query' }
  & { getAllActiveSchoolClasses: Array<(
    { __typename?: 'School_Class' }
    & Pick<School_Class, 'Id' | 'Name'>
  )> }
);

export type GetPersonByIdQueryVariables = {
  id: Scalars['String'];
};


export type GetPersonByIdQuery = (
  { __typename?: 'Query' }
  & { getPersonById: (
    { __typename?: 'Person' }
    & Pick<Person, 'FirstName' | 'LastName' | 'Username'>
  ) }
);

export type GetStudentsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getStudentsBySubject: Array<(
    { __typename?: 'Student_Subject' }
    & Pick<Student_Subject, 'Id'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Student: (
      { __typename?: 'Student' }
      & { Person: (
        { __typename?: 'Person' }
        & Pick<Person, 'Id' | 'FirstName' | 'LastName'>
      ), SchoolClass: (
        { __typename?: 'School_Class' }
        & Pick<School_Class, 'Name'>
      ) }
    ) }
  )> }
);

export type GetProfileImageQueryVariables = {
  userId: Scalars['String'];
};


export type GetProfileImageQuery = (
  { __typename?: 'Query' }
  & { getPersonById: (
    { __typename?: 'Person' }
    & Pick<Person, 'PassportUrl' | 'FirstName' | 'LastName'>
  ) }
);

export type GetSubjectListForTeacherQueryVariables = {
  userId: Scalars['String'];
};


export type GetSubjectListForTeacherQuery = (
  { __typename?: 'Query' }
  & { getSubjectsAssignedToTeacher: Array<(
    { __typename?: 'Subject' }
    & Pick<Subject, 'Id' | 'Name' | 'ClassCategory'>
  )> }
);

export type GetUserProfileQueryVariables = {};


export type GetUserProfileQuery = (
  { __typename?: 'Query' }
  & { getUserProfile: (
    { __typename?: 'Person' }
    & Pick<Person, 'Id' | 'FirstName' | 'LastName' | 'Username' | 'PassportUrl'>
  ) }
);

export type GetSubjectAssignmentsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetSubjectAssignmentsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getSubjectAssignmentsBySubject: Array<(
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'Id' | 'DateCreated' | 'DueDate' | 'TotalExpectedScore'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ) }
  )> }
);

export type GetSubjectAssignmentByIdQueryVariables = {
  assignmentId: Scalars['String'];
};


export type GetSubjectAssignmentByIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectAssignmentById: (
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'SubjectId' | 'SubjectTopicId' | 'TotalExpectedScore' | 'DueDate' | 'AttachedFile'>
  ) }
);

export type GetAssignmentSubmissionsQueryVariables = {
  subjectAssignmentId: Scalars['String'];
};


export type GetAssignmentSubmissionsQuery = (
  { __typename?: 'Query' }
  & { getAssignmentSubmissionsByAssignment: Array<(
    { __typename?: 'Subject_Assignment_Submission' }
    & Pick<Subject_Assignment_Submission, 'Id' | 'DateCreated'>
    & { Student: (
      { __typename?: 'Student' }
      & { Person: (
        { __typename?: 'Person' }
        & Pick<Person, 'FirstName' | 'LastName'>
      ) }
    ), SubjectAssignment: (
      { __typename?: 'Subject_Assignment' }
      & Pick<Subject_Assignment, 'TotalExpectedScore'>
      & { Subject: (
        { __typename?: 'Subject' }
        & Pick<Subject, 'Name'>
      ) }
    ), SubjectAssignmentScoreList: Array<(
      { __typename?: 'Subject_Assignment_Score' }
      & Pick<Subject_Assignment_Score, 'Id'>
    )> }
  )> }
);

export type GetAttachedFileFromAssignmentSubmissionQueryVariables = {
  submissionId: Scalars['String'];
};


export type GetAttachedFileFromAssignmentSubmissionQuery = (
  { __typename?: 'Query' }
  & { getAssignmentSubmissionById: (
    { __typename?: 'Subject_Assignment_Submission' }
    & Pick<Subject_Assignment_Submission, 'AttachedFile'>
    & { SubjectAssignment: (
      { __typename?: 'Subject_Assignment' }
      & Pick<Subject_Assignment, 'TotalExpectedScore'>
    ), SubjectAssignmentScoreList: Array<(
      { __typename?: 'Subject_Assignment_Score' }
      & Pick<Subject_Assignment_Score, 'Id'>
    )> }
  ) }
);

export type GetExamTypesQueryVariables = {};


export type GetExamTypesQuery = (
  { __typename?: 'Query' }
  & { getExamTypes: Array<(
    { __typename?: 'SelectListData' }
    & Pick<SelectListData, 'Name' | 'Value'>
  )> }
);

export type GetAllocatedTimeQueryVariables = {};


export type GetAllocatedTimeQuery = (
  { __typename?: 'Query' }
  & { getAllocatedTimeIntervals: Array<(
    { __typename?: 'SelectListData' }
    & Pick<SelectListData, 'Name' | 'Value'>
  )> }
);

export type GetCaTypesQueryVariables = {};


export type GetCaTypesQuery = (
  { __typename?: 'Query' }
  & { getContiniousAssesmentTypes: Array<(
    { __typename?: 'SelectListData' }
    & Pick<SelectListData, 'Name' | 'Value'>
  )> }
);

export type GetAllOnGoingExamsQueryVariables = {};


export type GetAllOnGoingExamsQuery = (
  { __typename?: 'Query' }
  & { getAllOnGoingExams: Array<(
    { __typename?: 'Subject_Exam' }
    & Pick<Subject_Exam, 'Id' | 'SelectedDateTime' | 'TotalExpectedScore'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name' | 'ClassCategory'>
    ), SchoolSession: (
      { __typename?: 'School_Session' }
      & Pick<School_Session, 'Name'>
    ) }
  )> }
);

export type GetExamsTeacherCreatedQueryVariables = {};


export type GetExamsTeacherCreatedQuery = (
  { __typename?: 'Query' }
  & { getAllExamsTeacherCreated: Array<(
    { __typename?: 'SubjectExamReMap' }
    & Pick<SubjectExamReMap, 'Id' | 'Subject' | 'ExamType' | 'SelectedDateTime' | 'TotalExpectedScore' | 'DateCreated' | 'SerialNumber' | 'SchoolSession'>
  )> }
);

export type GetExamParticipationQueryVariables = {
  examId: Scalars['String'];
};


export type GetExamParticipationQuery = (
  { __typename?: 'Query' }
  & { getExamParticipation: (
    { __typename?: 'Subject_Exam_Participation' }
    & Pick<Subject_Exam_Participation, 'Id' | 'DateCreated'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ), SubjectExam: (
      { __typename?: 'Subject_Exam' }
      & { Subject: (
        { __typename?: 'Subject' }
        & Pick<Subject, 'Name'>
      ), SchoolSession: (
        { __typename?: 'School_Session' }
        & Pick<School_Session, 'Name'>
      ) }
    ) }
  ) }
);

export type GetExamParticipationListQueryVariables = {
  examId: Scalars['String'];
};


export type GetExamParticipationListQuery = (
  { __typename?: 'Query' }
  & { getExamParticipationList: Array<(
    { __typename?: 'Subject_Exam_Participation' }
    & Pick<Subject_Exam_Participation, 'Id' | 'DateCreated'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ), SubjectExam: (
      { __typename?: 'Subject_Exam' }
      & Pick<Subject_Exam, 'SelectedDateTime'>
      & { Subject: (
        { __typename?: 'Subject' }
        & Pick<Subject, 'Name'>
      ), SchoolSession: (
        { __typename?: 'School_Session' }
        & Pick<School_Session, 'Name'>
      ) }
    ) }
  )> }
);

export type GetCaParticipationQueryVariables = {
  caId: Scalars['String'];
};


export type GetCaParticipationQuery = (
  { __typename?: 'Query' }
  & { getCAParticipation: Array<(
    { __typename?: 'Subject_CA_Participation' }
    & Pick<Subject_Ca_Participation, 'Id' | 'DateCreated'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ), SubjectCA: (
      { __typename?: 'Subject_CA' }
      & { Subject: (
        { __typename?: 'Subject' }
        & Pick<Subject, 'Name'>
      ), SchoolSession: (
        { __typename?: 'School_Session' }
        & Pick<School_Session, 'Name'>
      ) }
    ) }
  )> }
);

export type GetExamParticipationScreenshotsQueryVariables = {
  examParticipationId: Scalars['String'];
};


export type GetExamParticipationScreenshotsQuery = (
  { __typename?: 'Query' }
  & { getExamParticipationScreenshots: Array<(
    { __typename?: 'Subject_Exam_Participation_Screenshot' }
    & Pick<Subject_Exam_Participation_Screenshot, 'Url'>
  )> }
);

export type GetCaParticipationScreenshotsQueryVariables = {
  caParticipationId: Scalars['String'];
};


export type GetCaParticipationScreenshotsQuery = (
  { __typename?: 'Query' }
  & { getCAParticipationScreenshots: Array<(
    { __typename?: 'Subject_CA_Participation_Screenshot' }
    & Pick<Subject_Ca_Participation_Screenshot, 'Url'>
  )> }
);

export type GetExamSubmissionsQueryVariables = {
  examId: Scalars['String'];
};


export type GetExamSubmissionsQuery = (
  { __typename?: 'Query' }
  & { getExamSubmissions: Array<(
    { __typename?: 'Subject_Exam_Submission' }
    & Pick<Subject_Exam_Submission, 'Id' | 'DateCreated'>
    & { Student: (
      { __typename?: 'Student' }
      & { Person: (
        { __typename?: 'Person' }
        & Pick<Person, 'FirstName' | 'LastName'>
      ) }
    ), SubjectExam: (
      { __typename?: 'Subject_Exam' }
      & Pick<Subject_Exam, 'TotalExpectedScore'>
    ) }
  )> }
);

export type GetCaSubmissionsQueryVariables = {
  caId: Scalars['String'];
};


export type GetCaSubmissionsQuery = (
  { __typename?: 'Query' }
  & { getCASubmissions: Array<(
    { __typename?: 'Subject_CA_Submission' }
    & Pick<Subject_Ca_Submission, 'Id' | 'DateCreated'>
    & { Student: (
      { __typename?: 'Student' }
      & { Person: (
        { __typename?: 'Person' }
        & Pick<Person, 'FirstName' | 'LastName'>
      ) }
    ), SubjectCA: (
      { __typename?: 'Subject_CA' }
      & Pick<Subject_Ca, 'TotalExpectedScore'>
    ) }
  )> }
);

export type GetExamSubmissionQueryVariables = {
  examSubmissionId: Scalars['String'];
};


export type GetExamSubmissionQuery = (
  { __typename?: 'Query' }
  & { getExamSubmission: (
    { __typename?: 'Subject_Exam_Submission' }
    & Pick<Subject_Exam_Submission, 'AttachedFile'>
    & { SubjectExam: (
      { __typename?: 'Subject_Exam' }
      & Pick<Subject_Exam, 'TotalExpectedScore'>
    ) }
  ) }
);

export type GetCaSubmissionQueryVariables = {
  caSubmissionId: Scalars['String'];
};


export type GetCaSubmissionQuery = (
  { __typename?: 'Query' }
  & { getCASubmission: (
    { __typename?: 'Subject_CA_Submission' }
    & Pick<Subject_Ca_Submission, 'AttachedFile'>
    & { SubjectCA: (
      { __typename?: 'Subject_CA' }
      & Pick<Subject_Ca, 'TotalExpectedScore'>
    ) }
  ) }
);

export type GetAllCaTestsCreatedByTeacherQueryVariables = {};


export type GetAllCaTestsCreatedByTeacherQuery = (
  { __typename?: 'Query' }
  & { getAllCATestsCreatedByTeacher: Array<(
    { __typename?: 'SubjectCAReMap' }
    & Pick<SubjectCaReMap, 'Id' | 'Subject' | 'CAType' | 'SelectedDateTime' | 'TotalExpectedScore' | 'DateCreated' | 'SerialNumber' | 'SchoolSession'>
  )> }
);

export type GetAllOnGoingCaTestsCreatedByTeacherQueryVariables = {};


export type GetAllOnGoingCaTestsCreatedByTeacherQuery = (
  { __typename?: 'Query' }
  & { getAllOnGoingCATests: Array<(
    { __typename?: 'Subject_CA' }
    & Pick<Subject_Ca, 'Id' | 'SelectedDateTime' | 'TotalExpectedScore'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name' | 'ClassCategory'>
    ), SchoolSession: (
      { __typename?: 'School_Session' }
      & Pick<School_Session, 'Name'>
    ) }
  )> }
);

export type GetSubjectNoteByIdQueryVariables = {
  subjectNoteId: Scalars['String'];
};


export type GetSubjectNoteByIdQuery = (
  { __typename?: 'Query' }
  & { getASubjectNote: (
    { __typename?: 'Subject_Note' }
    & Pick<Subject_Note, 'SubjectId' | 'AttachedFile' | 'SubjectTopicId'>
  ) }
);

export type GetSubjectNotesQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetSubjectNotesQuery = (
  { __typename?: 'Query' }
  & { getNotesBySubject: Array<(
    { __typename?: 'Subject_Note' }
    & Pick<Subject_Note, 'Id' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'Id' | 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentAssignmentsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentAssignmentsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getAssignmentsBySubject: Array<(
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentDoneAssignmentsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentDoneAssignmentsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getDoneAssignments: Array<(
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentUndoneAssignmentsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentUndoneAssignmentsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getUndoneAssignments: Array<(
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetLatestAssignmentsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetLatestAssignmentsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getLatestAssignmentsBySubject: Array<(
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetAllSubjectsAssignedToStudentForSlQueryVariables = {};


export type GetAllSubjectsAssignedToStudentForSlQuery = (
  { __typename?: 'Query' }
  & { getAllSubjectsAssignedToStudent: Array<(
    { __typename?: 'Student_Subject' }
    & Pick<Student_Subject, 'Id'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Id' | 'Name' | 'ClassCategory'>
    ) }
  )> }
);

export type GetMyAssignmentQueryVariables = {
  assignmentId: Scalars['String'];
};


export type GetMyAssignmentQuery = (
  { __typename?: 'Query' }
  & { getAssignment: (
    { __typename?: 'Subject_Assignment' }
    & Pick<Subject_Assignment, 'AttachedFile' | 'DateCreated' | 'DueDate'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  ) }
);

export type GetStudentAssignmentSubmissionQueryVariables = {
  assignmentId: Scalars['String'];
};


export type GetStudentAssignmentSubmissionQuery = (
  { __typename?: 'Query' }
  & { getStudentAssignmentSubmission: (
    { __typename?: 'Subject_Assignment_Submission' }
    & Pick<Subject_Assignment_Submission, 'AttachedFile'>
  ) }
);

export type GetAssignmentScoreQueryVariables = {
  assignmentId: Scalars['String'];
};


export type GetAssignmentScoreQuery = (
  { __typename?: 'Query' }
  & { getAssignmentScore: (
    { __typename?: 'Subject_Assignment_Score' }
    & Pick<Subject_Assignment_Score, 'Score' | 'Remark'>
  ) }
);

export type GetSubjectNotesForStudentQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetSubjectNotesForStudentQuery = (
  { __typename?: 'Query' }
  & { getSubjectNotes: Array<(
    { __typename?: 'Subject_Note' }
    & Pick<Subject_Note, 'Id' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ) }
  )> }
);

export type GetSubjectNoteForStudentQueryVariables = {
  noteId: Scalars['String'];
};


export type GetSubjectNoteForStudentQuery = (
  { __typename?: 'Query' }
  & { getSubjectNote: (
    { __typename?: 'Subject_Note' }
    & Pick<Subject_Note, 'AttachedFile' | 'DateCreated'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  ) }
);

export type GetSubjectsAssignedToStudentQueryVariables = {};


export type GetSubjectsAssignedToStudentQuery = (
  { __typename?: 'Query' }
  & { getAllSubjectsAssignedToStudent: Array<(
    { __typename?: 'Student_Subject' }
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Id' | 'Name' | 'DateCreated' | 'ClassCategory'>
    ) }
  )> }
);

export type GetSubjectStudentShouldEnrollForQueryVariables = {};


export type GetSubjectStudentShouldEnrollForQuery = (
  { __typename?: 'Query' }
  & { getSubjectStudentShouldEnrollFor: Array<(
    { __typename?: 'Subject' }
    & Pick<Subject, 'Id' | 'Name' | 'ClassCategory'>
  )> }
);

export type GetSubjectAssignmentScoreByIdQueryVariables = {
  assignmentSubmissionId: Scalars['String'];
};


export type GetSubjectAssignmentScoreByIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectAssignmentScoreById: (
    { __typename?: 'Subject_Assignment_Score' }
    & Pick<Subject_Assignment_Score, 'Score' | 'Remark'>
    & { SubjectAssignmentSubmission: (
      { __typename?: 'Subject_Assignment_Submission' }
      & { SubjectAssignment: (
        { __typename?: 'Subject_Assignment' }
        & Pick<Subject_Assignment, 'TotalExpectedScore'>
      ) }
    ) }
  ) }
);

export type GetSubjectCaScoreByIdQueryVariables = {
  caSubmissionId: Scalars['String'];
};


export type GetSubjectCaScoreByIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectCAScoreById: (
    { __typename?: 'Subject_CA_Score' }
    & Pick<Subject_Ca_Score, 'Score' | 'Remark'>
    & { SubjectCASubmission: (
      { __typename?: 'Subject_CA_Submission' }
      & { SubjectCA: (
        { __typename?: 'Subject_CA' }
        & Pick<Subject_Ca, 'TotalExpectedScore'>
      ) }
    ) }
  ) }
);

export type GetSubjectExamScoreByIdQueryVariables = {
  examSubmissionId: Scalars['String'];
};


export type GetSubjectExamScoreByIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectExamScoreById: (
    { __typename?: 'Subject_Exam_Score' }
    & Pick<Subject_Exam_Score, 'Score' | 'Remark'>
    & { SubjectExamSubmission: (
      { __typename?: 'Subject_Exam_Submission' }
      & { SubjectExam: (
        { __typename?: 'Subject_Exam' }
        & Pick<Subject_Exam, 'TotalExpectedScore'>
      ) }
    ) }
  ) }
);

export type GetStudentExamsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentExamsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getExamsBySubject: Array<(
    { __typename?: 'Subject_Exam' }
    & Pick<Subject_Exam, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentUndoneExamsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentUndoneExamsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getUndoneExams: Array<(
    { __typename?: 'Subject_Exam' }
    & Pick<Subject_Exam, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentDoneExamsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentDoneExamsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getDoneExams: Array<(
    { __typename?: 'Subject_Exam' }
    & Pick<Subject_Exam, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetMyExamQueryVariables = {
  examId: Scalars['String'];
};


export type GetMyExamQuery = (
  { __typename?: 'Query' }
  & { getExam: (
    { __typename?: 'Subject_Exam' }
    & Pick<Subject_Exam, 'AttachedFile' | 'DateCreated' | 'ExamType' | 'AllocatedTime' | 'SelectedDateTime'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  ) }
);

export type GetMyExamSubmissionQueryVariables = {
  examId: Scalars['String'];
};


export type GetMyExamSubmissionQuery = (
  { __typename?: 'Query' }
  & { getUserExamSubmission: (
    { __typename?: 'Subject_Exam_Submission' }
    & Pick<Subject_Exam_Submission, 'AttachedFile'>
  ) }
);

export type GetMyExamParticipationQueryVariables = {
  examId: Scalars['String'];
};


export type GetMyExamParticipationQuery = (
  { __typename?: 'Query' }
  & { getExamParticipation: (
    { __typename?: 'Subject_Exam_Participation' }
    & Pick<Subject_Exam_Participation, 'Id'>
  ) }
);

export type GetStudentCaTestsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentCaTestsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getCATestsBySubject: Array<(
    { __typename?: 'Subject_CA' }
    & Pick<Subject_Ca, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentUndoneCaTestsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentUndoneCaTestsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getUndoneCATests: Array<(
    { __typename?: 'Subject_CA' }
    & Pick<Subject_Ca, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetStudentDoneCaTestsBySubjectQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetStudentDoneCaTestsBySubjectQuery = (
  { __typename?: 'Query' }
  & { getDoneCATests: Array<(
    { __typename?: 'Subject_CA' }
    & Pick<Subject_Ca, 'Id' | 'TotalExpectedScore' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetMyCaTestQueryVariables = {
  caTestId: Scalars['String'];
};


export type GetMyCaTestQuery = (
  { __typename?: 'Query' }
  & { getCATest: (
    { __typename?: 'Subject_CA' }
    & Pick<Subject_Ca, 'AttachedFile' | 'DateCreated' | 'ContinousAssesmentType' | 'AllocatedTime' | 'SelectedDateTime'>
    & { Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'FirstName' | 'LastName'>
    ) }
  ) }
);

export type GetMyCaTestSubmissionQueryVariables = {
  caTestId: Scalars['String'];
};


export type GetMyCaTestSubmissionQuery = (
  { __typename?: 'Query' }
  & { getUserCATestSubmission: (
    { __typename?: 'Subject_CA_Submission' }
    & Pick<Subject_Ca_Submission, 'AttachedFile'>
  ) }
);

export type GetMyCaTestParticipationQueryVariables = {
  caTestId: Scalars['String'];
};


export type GetMyCaTestParticipationQuery = (
  { __typename?: 'Query' }
  & { getCATestParticipation: (
    { __typename?: 'Subject_CA_Participation' }
    & Pick<Subject_Ca_Participation, 'Id'>
  ) }
);

export type GetChatRoomParticipantsQueryVariables = {
  payload: GetChatRoomParticipantDto;
};


export type GetChatRoomParticipantsQuery = (
  { __typename?: 'Query' }
  & { getChatRoomParticipants: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'Id' | 'FirstName' | 'LastName' | 'Role' | 'PassportUrl'>
  )> }
);

export type GetUserChatRoomsQueryVariables = {
  payload: ChatRoomSelectionDto;
};


export type GetUserChatRoomsQuery = (
  { __typename?: 'Query' }
  & { getUserChatRooms: (
    { __typename?: 'ChatRoomList' }
    & { Subjects: Array<(
      { __typename?: 'Subject' }
      & Pick<Subject, 'Id' | 'Name' | 'ClassCategory'>
    )>, SchoolClasses: Array<(
      { __typename?: 'School_Class' }
      & Pick<School_Class, 'Id' | 'Name' | 'ClassCategory'>
    )> }
  ) }
);

export type GetSubjectTopicsQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetSubjectTopicsQuery = (
  { __typename?: 'Query' }
  & { getSubjectTopics: Array<(
    { __typename?: 'Subject_Topic' }
    & Pick<Subject_Topic, 'Id' | 'Title'>
  )> }
);

export type GetSubjectTopicsBySubjectIdQueryVariables = {
  subjectId: Scalars['String'];
};


export type GetSubjectTopicsBySubjectIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectTopics: Array<(
    { __typename?: 'Subject_Topic' }
    & Pick<Subject_Topic, 'Id' | 'DateCreated'>
    & { Subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'Name'>
    ), Person: (
      { __typename?: 'Person' }
      & Pick<Person, 'Id' | 'FirstName' | 'LastName'>
    ) }
  )> }
);

export type GetSubjectTopicByIdQueryVariables = {
  subjectTopicId: Scalars['String'];
};


export type GetSubjectTopicByIdQuery = (
  { __typename?: 'Query' }
  & { getSubjectTopic: (
    { __typename?: 'Subject_Topic' }
    & Pick<Subject_Topic, 'Title' | 'SubjectId'>
  ) }
);

export const LoginDocument = gql`
    mutation login($data: AuthDTO!) {
  login(payload: $data) {
    UserId
    Username
    Role
    Token
    TokenExpiryDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
  }
export const CreateSchoolClassDocument = gql`
    mutation createSchoolClass($payload: School_Class_DTO!) {
  createSchoolClass(payload: $payload) {
    Id
    Name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSchoolClassGQL extends Apollo.Mutation<CreateSchoolClassMutation, CreateSchoolClassMutationVariables> {
    document = CreateSchoolClassDocument;
    
  }
export const DeactivateSchoolClassDocument = gql`
    mutation deactivateSchoolClass($data: String!) {
  deactivateSchoolClass(Id: $data) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeactivateSchoolClassGQL extends Apollo.Mutation<DeactivateSchoolClassMutation, DeactivateSchoolClassMutationVariables> {
    document = DeactivateSchoolClassDocument;
    
  }
export const UpdateClassDocument = gql`
    mutation updateClass($data: Update_School_Class_DTO!) {
  updateSchoolClass(payload: $data) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateClassGQL extends Apollo.Mutation<UpdateClassMutation, UpdateClassMutationVariables> {
    document = UpdateClassDocument;
    
  }
export const AssignClassToTeacherDocument = gql`
    mutation assignClassToTeacher($payload: AssignTeacherToClassDTO!) {
  assignClassToTeacher(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssignClassToTeacherGQL extends Apollo.Mutation<AssignClassToTeacherMutation, AssignClassToTeacherMutationVariables> {
    document = AssignClassToTeacherDocument;
    
  }
export const AssignSubjectToTeacherDocument = gql`
    mutation assignSubjectToTeacher($payload: AssignTeacherToSubjectsDTO!) {
  assignSubjectToTeacher(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssignSubjectToTeacherGQL extends Apollo.Mutation<AssignSubjectToTeacherMutation, AssignSubjectToTeacherMutationVariables> {
    document = AssignSubjectToTeacherDocument;
    
  }
export const DeleteSubjectDocument = gql`
    mutation deleteSubject($data: String!) {
  deactivateSubject(id: $data) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteSubjectGQL extends Apollo.Mutation<DeleteSubjectMutation, DeleteSubjectMutationVariables> {
    document = DeleteSubjectDocument;
    
  }
export const CreateSubjectDocument = gql`
    mutation createSubject($payload: Subject_DTO!) {
  createSubject(payload: $payload) {
    Name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSubjectGQL extends Apollo.Mutation<CreateSubjectMutation, CreateSubjectMutationVariables> {
    document = CreateSubjectDocument;
    
  }
export const UpdateSubjectDocument = gql`
    mutation updateSubject($payload: Update_Subject_DTO!) {
  updateSubject(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSubjectGQL extends Apollo.Mutation<UpdateSubjectMutation, UpdateSubjectMutationVariables> {
    document = UpdateSubjectDocument;
    
  }
export const RegisterUserDocument = gql`
    mutation registerUser($payload: PersonRegistrationDTO!) {
  registerPerson(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    document = RegisterUserDocument;
    
  }
export const UpdateUserDocument = gql`
    mutation updateUser($payload: UpdatePersonRegistrationDTO!) {
  updatePersonDetails(updatedUser: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
  }
export const DeactivateUserDocument = gql`
    mutation deactivateUser($payload: String!) {
  deactivateUserStatus(personId: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeactivateUserGQL extends Apollo.Mutation<DeactivateUserMutation, DeactivateUserMutationVariables> {
    document = DeactivateUserDocument;
    
  }
export const UpdateUserProfileWithoutImageDocument = gql`
    mutation updateUserProfileWithoutImage($payload: UpdatePersonProfileDTO!) {
  updateUserProfileWithoutImage(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserProfileWithoutImageGQL extends Apollo.Mutation<UpdateUserProfileWithoutImageMutation, UpdateUserProfileWithoutImageMutationVariables> {
    document = UpdateUserProfileWithoutImageDocument;
    
  }
export const GiveSubjectAssignmentDocument = gql`
    mutation giveSubjectAssignment($payload: GiveAssignmentTaskDTO!) {
  giveSubjectAssignment(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GiveSubjectAssignmentGQL extends Apollo.Mutation<GiveSubjectAssignmentMutation, GiveSubjectAssignmentMutationVariables> {
    document = GiveSubjectAssignmentDocument;
    
  }
export const UpdateSubjectAssignmentDocument = gql`
    mutation updateSubjectAssignment($payload: UpdateAssignmentTaskDTO!) {
  updateSubjectAssignment(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSubjectAssignmentGQL extends Apollo.Mutation<UpdateSubjectAssignmentMutation, UpdateSubjectAssignmentMutationVariables> {
    document = UpdateSubjectAssignmentDocument;
    
  }
export const DeleteSubjectAssignmentDocument = gql`
    mutation deleteSubjectAssignment($assignmentId: String!) {
  deleteSubjectAssignment(assignmentId: $assignmentId) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteSubjectAssignmentGQL extends Apollo.Mutation<DeleteSubjectAssignmentMutation, DeleteSubjectAssignmentMutationVariables> {
    document = DeleteSubjectAssignmentDocument;
    
  }
export const GradeAssignmentDocument = gql`
    mutation gradeAssignment($payload: ScoreGradingDTO!) {
  gradeAssignment(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GradeAssignmentGQL extends Apollo.Mutation<GradeAssignmentMutation, GradeAssignmentMutationVariables> {
    document = GradeAssignmentDocument;
    
  }
export const GradeCaTestDocument = gql`
    mutation gradeCATest($payload: ScoreGradingDTO!) {
  gradeCATest(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GradeCaTestGQL extends Apollo.Mutation<GradeCaTestMutation, GradeCaTestMutationVariables> {
    document = GradeCaTestDocument;
    
  }
export const GradeExamDocument = gql`
    mutation gradeExam($payload: ScoreGradingDTO!) {
  gradeExam(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GradeExamGQL extends Apollo.Mutation<GradeExamMutation, GradeExamMutationVariables> {
    document = GradeExamDocument;
    
  }
export const GiveSubjectExamDocument = gql`
    mutation giveSubjectExam($payload: GiveExamTaskDTO!) {
  giveSubjectExam(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GiveSubjectExamGQL extends Apollo.Mutation<GiveSubjectExamMutation, GiveSubjectExamMutationVariables> {
    document = GiveSubjectExamDocument;
    
  }
export const GiveSubjectCaTestDocument = gql`
    mutation giveSubjectCATest($payload: GiveCATaskDTO!) {
  giveCATest(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GiveSubjectCaTestGQL extends Apollo.Mutation<GiveSubjectCaTestMutation, GiveSubjectCaTestMutationVariables> {
    document = GiveSubjectCaTestDocument;
    
  }
export const GiveSubjectNoteDocument = gql`
    mutation giveSubjectNote($payload: GiveSubjectNoteTaskDTO!) {
  giveSubjectNote(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GiveSubjectNoteGQL extends Apollo.Mutation<GiveSubjectNoteMutation, GiveSubjectNoteMutationVariables> {
    document = GiveSubjectNoteDocument;
    
  }
export const UpdateSubjectNoteDocument = gql`
    mutation updateSubjectNote($payload: UpdateSubjectNoteTaskDTO!) {
  updateSubjectNote(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSubjectNoteGQL extends Apollo.Mutation<UpdateSubjectNoteMutation, UpdateSubjectNoteMutationVariables> {
    document = UpdateSubjectNoteDocument;
    
  }
export const DeleteSubjectNoteDocument = gql`
    mutation deleteSubjectNote($subjectNoteId: String!) {
  deleteNote(subjectNoteId: $subjectNoteId) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteSubjectNoteGQL extends Apollo.Mutation<DeleteSubjectNoteMutation, DeleteSubjectNoteMutationVariables> {
    document = DeleteSubjectNoteDocument;
    
  }
export const SubmitSubjectAssignmentDocument = gql`
    mutation submitSubjectAssignment($payload: SubjectAssignmentSubmissionDTO!) {
  submitAssignment(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubmitSubjectAssignmentGQL extends Apollo.Mutation<SubmitSubjectAssignmentMutation, SubmitSubjectAssignmentMutationVariables> {
    document = SubmitSubjectAssignmentDocument;
    
  }
export const EnrollStudentForSubjectsDocument = gql`
    mutation enrollStudentForSubjects($payload: AssignTeacherToSubjectsDTO!) {
  assignSubjectListToStudent(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EnrollStudentForSubjectsGQL extends Apollo.Mutation<EnrollStudentForSubjectsMutation, EnrollStudentForSubjectsMutationVariables> {
    document = EnrollStudentForSubjectsDocument;
    
  }
export const UpdateAssignmentGradeScoreDocument = gql`
    mutation updateAssignmentGradeScore($payload: UpdateScoreDTO!) {
  updateAssignmentGradeScore(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAssignmentGradeScoreGQL extends Apollo.Mutation<UpdateAssignmentGradeScoreMutation, UpdateAssignmentGradeScoreMutationVariables> {
    document = UpdateAssignmentGradeScoreDocument;
    
  }
export const UpdateExamGradeScoreDocument = gql`
    mutation updateExamGradeScore($payload: UpdateScoreDTO!) {
  updateExamGradeScore(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateExamGradeScoreGQL extends Apollo.Mutation<UpdateExamGradeScoreMutation, UpdateExamGradeScoreMutationVariables> {
    document = UpdateExamGradeScoreDocument;
    
  }
export const UpdateCaTestGradeScoreDocument = gql`
    mutation updateCATestGradeScore($payload: UpdateScoreDTO!) {
  updateCATestGradeScore(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCaTestGradeScoreGQL extends Apollo.Mutation<UpdateCaTestGradeScoreMutation, UpdateCaTestGradeScoreMutationVariables> {
    document = UpdateCaTestGradeScoreDocument;
    
  }
export const CreateSubjectExamParticipationDocument = gql`
    mutation createSubjectExamParticipation($examId: String!) {
  createSubjectExamParticipation(examId: $examId) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSubjectExamParticipationGQL extends Apollo.Mutation<CreateSubjectExamParticipationMutation, CreateSubjectExamParticipationMutationVariables> {
    document = CreateSubjectExamParticipationDocument;
    
  }
export const SubmitSubjectExamDocument = gql`
    mutation submitSubjectExam($payload: SubmitExamDTO!) {
  submitExam(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubmitSubjectExamGQL extends Apollo.Mutation<SubmitSubjectExamMutation, SubmitSubjectExamMutationVariables> {
    document = SubmitSubjectExamDocument;
    
  }
export const SaveExamScreenshotDocument = gql`
    mutation saveExamScreenshot($payload: ScreenshotDTO!) {
  saveExamScreenshot(payload: $payload) {
    Id
    Url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveExamScreenshotGQL extends Apollo.Mutation<SaveExamScreenshotMutation, SaveExamScreenshotMutationVariables> {
    document = SaveExamScreenshotDocument;
    
  }
export const SubmitSubjectCaTestDocument = gql`
    mutation submitSubjectCATest($payload: SubmitExamDTO!) {
  submitCATest(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubmitSubjectCaTestGQL extends Apollo.Mutation<SubmitSubjectCaTestMutation, SubmitSubjectCaTestMutationVariables> {
    document = SubmitSubjectCaTestDocument;
    
  }
export const SaveCaTestScreenshotDocument = gql`
    mutation saveCATestScreenshot($payload: ScreenshotDTO!) {
  saveCATestScreenshot(payload: $payload) {
    Id
    Url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveCaTestScreenshotGQL extends Apollo.Mutation<SaveCaTestScreenshotMutation, SaveCaTestScreenshotMutationVariables> {
    document = SaveCaTestScreenshotDocument;
    
  }
export const CreateSubjectCaTestParticipationDocument = gql`
    mutation createSubjectCATestParticipation($caTestId: String!) {
  createSubjectCAParticipation(caTestId: $caTestId) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSubjectCaTestParticipationGQL extends Apollo.Mutation<CreateSubjectCaTestParticipationMutation, CreateSubjectCaTestParticipationMutationVariables> {
    document = CreateSubjectCaTestParticipationDocument;
    
  }
export const CreateSubjectTopicDocument = gql`
    mutation createSubjectTopic($payload: SubjectTopicDTO!) {
  createSubjectTopic(payload: $payload) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSubjectTopicGQL extends Apollo.Mutation<CreateSubjectTopicMutation, CreateSubjectTopicMutationVariables> {
    document = CreateSubjectTopicDocument;
    
  }
export const UpdateSubjectTopicDocument = gql`
    mutation updateSubjectTopic($payload: UpdateSubjectTopicDTO!) {
  updateSubjectTopic(payload: $payload) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSubjectTopicGQL extends Apollo.Mutation<UpdateSubjectTopicMutation, UpdateSubjectTopicMutationVariables> {
    document = UpdateSubjectTopicDocument;
    
  }
export const DeactivateSubjectTopicDocument = gql`
    mutation deactivateSubjectTopic($subjectTopicId: String!) {
  deactivateSubjectTopic(subjectTopicId: $subjectTopicId) {
    Message
    OperationStatus
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeactivateSubjectTopicGQL extends Apollo.Mutation<DeactivateSubjectTopicMutation, DeactivateSubjectTopicMutationVariables> {
    document = DeactivateSubjectTopicDocument;
    
  }
export const GetClassCategoriesDocument = gql`
    query getClassCategories {
  getClassCategories {
    Name
    Value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetClassCategoriesGQL extends Apollo.Query<GetClassCategoriesQuery, GetClassCategoriesQueryVariables> {
    document = GetClassCategoriesDocument;
    
  }
export const GetAllActiveSchoolClassesDocument = gql`
    query getAllActiveSchoolClasses {
  getAllActiveSchoolClasses {
    Id
    Name
    ClassCategory
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllActiveSchoolClassesGQL extends Apollo.Query<GetAllActiveSchoolClassesQuery, GetAllActiveSchoolClassesQueryVariables> {
    document = GetAllActiveSchoolClassesDocument;
    
  }
export const GetClassByIdDocument = gql`
    query getClassById($payload: String!) {
  getAClassById(Id: $payload) {
    Id
    Name
    ClassCategory
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetClassByIdGQL extends Apollo.Query<GetClassByIdQuery, GetClassByIdQueryVariables> {
    document = GetClassByIdDocument;
    
  }
export const GetUsersByRoleDocument = gql`
    query getUsersByRole($payload: String!) {
  getUsersByRole(role: $payload) {
    Id
    FirstName
    LastName
    Username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUsersByRoleGQL extends Apollo.Query<GetUsersByRoleQuery, GetUsersByRoleQueryVariables> {
    document = GetUsersByRoleDocument;
    
  }
export const GetAllActiveSubjectsDocument = gql`
    query getAllActiveSubjects {
  getAllActiveSubjects {
    Id
    Name
    ClassCategory
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllActiveSubjectsGQL extends Apollo.Query<GetAllActiveSubjectsQuery, GetAllActiveSubjectsQueryVariables> {
    document = GetAllActiveSubjectsDocument;
    
  }
export const GetSubjectByIdDocument = gql`
    query getSubjectById($data: String!) {
  getSubjectById(id: $data) {
    Name
    ClassCategory
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectByIdGQL extends Apollo.Query<GetSubjectByIdQuery, GetSubjectByIdQueryVariables> {
    document = GetSubjectByIdDocument;
    
  }
export const GetOrigamiRolesDocument = gql`
    query getOrigamiRoles {
  getOrigamiRoles {
    Name
    Value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrigamiRolesGQL extends Apollo.Query<GetOrigamiRolesQuery, GetOrigamiRolesQueryVariables> {
    document = GetOrigamiRolesDocument;
    
  }
export const GetActiveClassesForSelectListDocument = gql`
    query getActiveClassesForSelectList {
  getAllActiveSchoolClasses {
    Id
    Name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActiveClassesForSelectListGQL extends Apollo.Query<GetActiveClassesForSelectListQuery, GetActiveClassesForSelectListQueryVariables> {
    document = GetActiveClassesForSelectListDocument;
    
  }
export const GetPersonByIdDocument = gql`
    query getPersonById($id: String!) {
  getPersonById(id: $id) {
    FirstName
    LastName
    Username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPersonByIdGQL extends Apollo.Query<GetPersonByIdQuery, GetPersonByIdQueryVariables> {
    document = GetPersonByIdDocument;
    
  }
export const GetStudentsBySubjectDocument = gql`
    query getStudentsBySubject($subjectId: String!) {
  getStudentsBySubject(subjectId: $subjectId) {
    Id
    Subject {
      Name
    }
    Student {
      Person {
        Id
        FirstName
        LastName
      }
      SchoolClass {
        Name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentsBySubjectGQL extends Apollo.Query<GetStudentsBySubjectQuery, GetStudentsBySubjectQueryVariables> {
    document = GetStudentsBySubjectDocument;
    
  }
export const GetProfileImageDocument = gql`
    query getProfileImage($userId: String!) {
  getPersonById(id: $userId) {
    PassportUrl
    FirstName
    LastName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProfileImageGQL extends Apollo.Query<GetProfileImageQuery, GetProfileImageQueryVariables> {
    document = GetProfileImageDocument;
    
  }
export const GetSubjectListForTeacherDocument = gql`
    query getSubjectListForTeacher($userId: String!) {
  getSubjectsAssignedToTeacher(userId: $userId) {
    Id
    Name
    ClassCategory
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectListForTeacherGQL extends Apollo.Query<GetSubjectListForTeacherQuery, GetSubjectListForTeacherQueryVariables> {
    document = GetSubjectListForTeacherDocument;
    
  }
export const GetUserProfileDocument = gql`
    query getUserProfile {
  getUserProfile {
    Id
    FirstName
    LastName
    Username
    PassportUrl
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserProfileGQL extends Apollo.Query<GetUserProfileQuery, GetUserProfileQueryVariables> {
    document = GetUserProfileDocument;
    
  }
export const GetSubjectAssignmentsBySubjectDocument = gql`
    query getSubjectAssignmentsBySubject($subjectId: String!) {
  getSubjectAssignmentsBySubject(subjectId: $subjectId) {
    Id
    Subject {
      Name
    }
    DateCreated
    DueDate
    TotalExpectedScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectAssignmentsBySubjectGQL extends Apollo.Query<GetSubjectAssignmentsBySubjectQuery, GetSubjectAssignmentsBySubjectQueryVariables> {
    document = GetSubjectAssignmentsBySubjectDocument;
    
  }
export const GetSubjectAssignmentByIdDocument = gql`
    query getSubjectAssignmentById($assignmentId: String!) {
  getSubjectAssignmentById(assignmentId: $assignmentId) {
    SubjectId
    SubjectTopicId
    TotalExpectedScore
    DueDate
    AttachedFile
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectAssignmentByIdGQL extends Apollo.Query<GetSubjectAssignmentByIdQuery, GetSubjectAssignmentByIdQueryVariables> {
    document = GetSubjectAssignmentByIdDocument;
    
  }
export const GetAssignmentSubmissionsDocument = gql`
    query getAssignmentSubmissions($subjectAssignmentId: String!) {
  getAssignmentSubmissionsByAssignment(subjectAssignmentId: $subjectAssignmentId) {
    Id
    DateCreated
    Student {
      Person {
        FirstName
        LastName
      }
    }
    SubjectAssignment {
      TotalExpectedScore
      Subject {
        Name
      }
    }
    SubjectAssignmentScoreList {
      Id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAssignmentSubmissionsGQL extends Apollo.Query<GetAssignmentSubmissionsQuery, GetAssignmentSubmissionsQueryVariables> {
    document = GetAssignmentSubmissionsDocument;
    
  }
export const GetAttachedFileFromAssignmentSubmissionDocument = gql`
    query getAttachedFileFromAssignmentSubmission($submissionId: String!) {
  getAssignmentSubmissionById(subjectAssignmentSubmissionId: $submissionId) {
    AttachedFile
    SubjectAssignment {
      TotalExpectedScore
    }
    SubjectAssignmentScoreList {
      Id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAttachedFileFromAssignmentSubmissionGQL extends Apollo.Query<GetAttachedFileFromAssignmentSubmissionQuery, GetAttachedFileFromAssignmentSubmissionQueryVariables> {
    document = GetAttachedFileFromAssignmentSubmissionDocument;
    
  }
export const GetExamTypesDocument = gql`
    query getExamTypes {
  getExamTypes {
    Name
    Value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamTypesGQL extends Apollo.Query<GetExamTypesQuery, GetExamTypesQueryVariables> {
    document = GetExamTypesDocument;
    
  }
export const GetAllocatedTimeDocument = gql`
    query getAllocatedTime {
  getAllocatedTimeIntervals {
    Name
    Value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllocatedTimeGQL extends Apollo.Query<GetAllocatedTimeQuery, GetAllocatedTimeQueryVariables> {
    document = GetAllocatedTimeDocument;
    
  }
export const GetCaTypesDocument = gql`
    query getCATypes {
  getContiniousAssesmentTypes {
    Name
    Value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCaTypesGQL extends Apollo.Query<GetCaTypesQuery, GetCaTypesQueryVariables> {
    document = GetCaTypesDocument;
    
  }
export const GetAllOnGoingExamsDocument = gql`
    query getAllOnGoingExams {
  getAllOnGoingExams {
    Id
    Subject {
      Name
      ClassCategory
    }
    SchoolSession {
      Name
    }
    SelectedDateTime
    TotalExpectedScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllOnGoingExamsGQL extends Apollo.Query<GetAllOnGoingExamsQuery, GetAllOnGoingExamsQueryVariables> {
    document = GetAllOnGoingExamsDocument;
    
  }
export const GetExamsTeacherCreatedDocument = gql`
    query getExamsTeacherCreated {
  getAllExamsTeacherCreated {
    Id
    Subject
    ExamType
    SelectedDateTime
    TotalExpectedScore
    DateCreated
    SerialNumber
    SchoolSession
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamsTeacherCreatedGQL extends Apollo.Query<GetExamsTeacherCreatedQuery, GetExamsTeacherCreatedQueryVariables> {
    document = GetExamsTeacherCreatedDocument;
    
  }
export const GetExamParticipationDocument = gql`
    query getExamParticipation($examId: String!) {
  getExamParticipation(examId: $examId) {
    Id
    Person {
      FirstName
      LastName
    }
    DateCreated
    SubjectExam {
      Subject {
        Name
      }
      SchoolSession {
        Name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamParticipationGQL extends Apollo.Query<GetExamParticipationQuery, GetExamParticipationQueryVariables> {
    document = GetExamParticipationDocument;
    
  }
export const GetExamParticipationListDocument = gql`
    query getExamParticipationList($examId: String!) {
  getExamParticipationList(examId: $examId) {
    Id
    Person {
      FirstName
      LastName
    }
    DateCreated
    SubjectExam {
      SelectedDateTime
      Subject {
        Name
      }
      SchoolSession {
        Name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamParticipationListGQL extends Apollo.Query<GetExamParticipationListQuery, GetExamParticipationListQueryVariables> {
    document = GetExamParticipationListDocument;
    
  }
export const GetCaParticipationDocument = gql`
    query getCAParticipation($caId: String!) {
  getCAParticipation(caId: $caId) {
    Id
    Person {
      FirstName
      LastName
    }
    DateCreated
    SubjectCA {
      Subject {
        Name
      }
      SchoolSession {
        Name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCaParticipationGQL extends Apollo.Query<GetCaParticipationQuery, GetCaParticipationQueryVariables> {
    document = GetCaParticipationDocument;
    
  }
export const GetExamParticipationScreenshotsDocument = gql`
    query getExamParticipationScreenshots($examParticipationId: String!) {
  getExamParticipationScreenshots(examParticipationId: $examParticipationId) {
    Url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamParticipationScreenshotsGQL extends Apollo.Query<GetExamParticipationScreenshotsQuery, GetExamParticipationScreenshotsQueryVariables> {
    document = GetExamParticipationScreenshotsDocument;
    
  }
export const GetCaParticipationScreenshotsDocument = gql`
    query getCAParticipationScreenshots($caParticipationId: String!) {
  getCAParticipationScreenshots(caParticipationId: $caParticipationId) {
    Url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCaParticipationScreenshotsGQL extends Apollo.Query<GetCaParticipationScreenshotsQuery, GetCaParticipationScreenshotsQueryVariables> {
    document = GetCaParticipationScreenshotsDocument;
    
  }
export const GetExamSubmissionsDocument = gql`
    query getExamSubmissions($examId: String!) {
  getExamSubmissions(examId: $examId) {
    Id
    Student {
      Person {
        FirstName
        LastName
      }
    }
    DateCreated
    SubjectExam {
      TotalExpectedScore
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamSubmissionsGQL extends Apollo.Query<GetExamSubmissionsQuery, GetExamSubmissionsQueryVariables> {
    document = GetExamSubmissionsDocument;
    
  }
export const GetCaSubmissionsDocument = gql`
    query getCASubmissions($caId: String!) {
  getCASubmissions(caId: $caId) {
    Id
    Student {
      Person {
        FirstName
        LastName
      }
    }
    DateCreated
    SubjectCA {
      TotalExpectedScore
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCaSubmissionsGQL extends Apollo.Query<GetCaSubmissionsQuery, GetCaSubmissionsQueryVariables> {
    document = GetCaSubmissionsDocument;
    
  }
export const GetExamSubmissionDocument = gql`
    query getExamSubmission($examSubmissionId: String!) {
  getExamSubmission(examSubmissionId: $examSubmissionId) {
    AttachedFile
    SubjectExam {
      TotalExpectedScore
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExamSubmissionGQL extends Apollo.Query<GetExamSubmissionQuery, GetExamSubmissionQueryVariables> {
    document = GetExamSubmissionDocument;
    
  }
export const GetCaSubmissionDocument = gql`
    query getCASubmission($caSubmissionId: String!) {
  getCASubmission(caSubmissionId: $caSubmissionId) {
    AttachedFile
    SubjectCA {
      TotalExpectedScore
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCaSubmissionGQL extends Apollo.Query<GetCaSubmissionQuery, GetCaSubmissionQueryVariables> {
    document = GetCaSubmissionDocument;
    
  }
export const GetAllCaTestsCreatedByTeacherDocument = gql`
    query getAllCATestsCreatedByTeacher {
  getAllCATestsCreatedByTeacher {
    Id
    Subject
    CAType
    SelectedDateTime
    TotalExpectedScore
    DateCreated
    SerialNumber
    SchoolSession
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllCaTestsCreatedByTeacherGQL extends Apollo.Query<GetAllCaTestsCreatedByTeacherQuery, GetAllCaTestsCreatedByTeacherQueryVariables> {
    document = GetAllCaTestsCreatedByTeacherDocument;
    
  }
export const GetAllOnGoingCaTestsCreatedByTeacherDocument = gql`
    query getAllOnGoingCATestsCreatedByTeacher {
  getAllOnGoingCATests {
    Id
    Subject {
      Name
      ClassCategory
    }
    SchoolSession {
      Name
    }
    SelectedDateTime
    TotalExpectedScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllOnGoingCaTestsCreatedByTeacherGQL extends Apollo.Query<GetAllOnGoingCaTestsCreatedByTeacherQuery, GetAllOnGoingCaTestsCreatedByTeacherQueryVariables> {
    document = GetAllOnGoingCaTestsCreatedByTeacherDocument;
    
  }
export const GetSubjectNoteByIdDocument = gql`
    query getSubjectNoteById($subjectNoteId: String!) {
  getASubjectNote(subjectNoteId: $subjectNoteId) {
    SubjectId
    AttachedFile
    SubjectTopicId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectNoteByIdGQL extends Apollo.Query<GetSubjectNoteByIdQuery, GetSubjectNoteByIdQueryVariables> {
    document = GetSubjectNoteByIdDocument;
    
  }
export const GetSubjectNotesDocument = gql`
    query getSubjectNotes($subjectId: String!) {
  getNotesBySubject(subjectId: $subjectId) {
    Id
    DateCreated
    Subject {
      Name
    }
    Person {
      Id
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectNotesGQL extends Apollo.Query<GetSubjectNotesQuery, GetSubjectNotesQueryVariables> {
    document = GetSubjectNotesDocument;
    
  }
export const GetStudentAssignmentsBySubjectDocument = gql`
    query getStudentAssignmentsBySubject($subjectId: String!) {
  getAssignmentsBySubject(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentAssignmentsBySubjectGQL extends Apollo.Query<GetStudentAssignmentsBySubjectQuery, GetStudentAssignmentsBySubjectQueryVariables> {
    document = GetStudentAssignmentsBySubjectDocument;
    
  }
export const GetStudentDoneAssignmentsBySubjectDocument = gql`
    query getStudentDoneAssignmentsBySubject($subjectId: String!) {
  getDoneAssignments(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentDoneAssignmentsBySubjectGQL extends Apollo.Query<GetStudentDoneAssignmentsBySubjectQuery, GetStudentDoneAssignmentsBySubjectQueryVariables> {
    document = GetStudentDoneAssignmentsBySubjectDocument;
    
  }
export const GetStudentUndoneAssignmentsBySubjectDocument = gql`
    query getStudentUndoneAssignmentsBySubject($subjectId: String!) {
  getUndoneAssignments(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentUndoneAssignmentsBySubjectGQL extends Apollo.Query<GetStudentUndoneAssignmentsBySubjectQuery, GetStudentUndoneAssignmentsBySubjectQueryVariables> {
    document = GetStudentUndoneAssignmentsBySubjectDocument;
    
  }
export const GetLatestAssignmentsBySubjectDocument = gql`
    query getLatestAssignmentsBySubject($subjectId: String!) {
  getLatestAssignmentsBySubject(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLatestAssignmentsBySubjectGQL extends Apollo.Query<GetLatestAssignmentsBySubjectQuery, GetLatestAssignmentsBySubjectQueryVariables> {
    document = GetLatestAssignmentsBySubjectDocument;
    
  }
export const GetAllSubjectsAssignedToStudentForSlDocument = gql`
    query getAllSubjectsAssignedToStudentForSL {
  getAllSubjectsAssignedToStudent {
    Id
    Subject {
      Id
      Name
      ClassCategory
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllSubjectsAssignedToStudentForSlGQL extends Apollo.Query<GetAllSubjectsAssignedToStudentForSlQuery, GetAllSubjectsAssignedToStudentForSlQueryVariables> {
    document = GetAllSubjectsAssignedToStudentForSlDocument;
    
  }
export const GetMyAssignmentDocument = gql`
    query getMyAssignment($assignmentId: String!) {
  getAssignment(assignmentId: $assignmentId) {
    AttachedFile
    DateCreated
    DueDate
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyAssignmentGQL extends Apollo.Query<GetMyAssignmentQuery, GetMyAssignmentQueryVariables> {
    document = GetMyAssignmentDocument;
    
  }
export const GetStudentAssignmentSubmissionDocument = gql`
    query getStudentAssignmentSubmission($assignmentId: String!) {
  getStudentAssignmentSubmission(assignmentId: $assignmentId) {
    AttachedFile
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentAssignmentSubmissionGQL extends Apollo.Query<GetStudentAssignmentSubmissionQuery, GetStudentAssignmentSubmissionQueryVariables> {
    document = GetStudentAssignmentSubmissionDocument;
    
  }
export const GetAssignmentScoreDocument = gql`
    query getAssignmentScore($assignmentId: String!) {
  getAssignmentScore(assignmentId: $assignmentId) {
    Score
    Remark
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAssignmentScoreGQL extends Apollo.Query<GetAssignmentScoreQuery, GetAssignmentScoreQueryVariables> {
    document = GetAssignmentScoreDocument;
    
  }
export const GetSubjectNotesForStudentDocument = gql`
    query getSubjectNotesForStudent($subjectId: String!) {
  getSubjectNotes(subjectId: $subjectId) {
    Id
    DateCreated
    Subject {
      Name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectNotesForStudentGQL extends Apollo.Query<GetSubjectNotesForStudentQuery, GetSubjectNotesForStudentQueryVariables> {
    document = GetSubjectNotesForStudentDocument;
    
  }
export const GetSubjectNoteForStudentDocument = gql`
    query getSubjectNoteForStudent($noteId: String!) {
  getSubjectNote(noteId: $noteId) {
    AttachedFile
    DateCreated
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectNoteForStudentGQL extends Apollo.Query<GetSubjectNoteForStudentQuery, GetSubjectNoteForStudentQueryVariables> {
    document = GetSubjectNoteForStudentDocument;
    
  }
export const GetSubjectsAssignedToStudentDocument = gql`
    query getSubjectsAssignedToStudent {
  getAllSubjectsAssignedToStudent {
    Subject {
      Id
      Name
      DateCreated
      ClassCategory
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectsAssignedToStudentGQL extends Apollo.Query<GetSubjectsAssignedToStudentQuery, GetSubjectsAssignedToStudentQueryVariables> {
    document = GetSubjectsAssignedToStudentDocument;
    
  }
export const GetSubjectStudentShouldEnrollForDocument = gql`
    query getSubjectStudentShouldEnrollFor {
  getSubjectStudentShouldEnrollFor {
    Id
    Name
    ClassCategory
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectStudentShouldEnrollForGQL extends Apollo.Query<GetSubjectStudentShouldEnrollForQuery, GetSubjectStudentShouldEnrollForQueryVariables> {
    document = GetSubjectStudentShouldEnrollForDocument;
    
  }
export const GetSubjectAssignmentScoreByIdDocument = gql`
    query getSubjectAssignmentScoreById($assignmentSubmissionId: String!) {
  getSubjectAssignmentScoreById(subjectAssignmentSubmissionId: $assignmentSubmissionId) {
    Score
    Remark
    SubjectAssignmentSubmission {
      SubjectAssignment {
        TotalExpectedScore
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectAssignmentScoreByIdGQL extends Apollo.Query<GetSubjectAssignmentScoreByIdQuery, GetSubjectAssignmentScoreByIdQueryVariables> {
    document = GetSubjectAssignmentScoreByIdDocument;
    
  }
export const GetSubjectCaScoreByIdDocument = gql`
    query getSubjectCAScoreById($caSubmissionId: String!) {
  getSubjectCAScoreById(subjectCASubmissionId: $caSubmissionId) {
    Score
    Remark
    SubjectCASubmission {
      SubjectCA {
        TotalExpectedScore
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectCaScoreByIdGQL extends Apollo.Query<GetSubjectCaScoreByIdQuery, GetSubjectCaScoreByIdQueryVariables> {
    document = GetSubjectCaScoreByIdDocument;
    
  }
export const GetSubjectExamScoreByIdDocument = gql`
    query getSubjectExamScoreById($examSubmissionId: String!) {
  getSubjectExamScoreById(subjectExamSubmissionId: $examSubmissionId) {
    Score
    Remark
    SubjectExamSubmission {
      SubjectExam {
        TotalExpectedScore
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectExamScoreByIdGQL extends Apollo.Query<GetSubjectExamScoreByIdQuery, GetSubjectExamScoreByIdQueryVariables> {
    document = GetSubjectExamScoreByIdDocument;
    
  }
export const GetStudentExamsBySubjectDocument = gql`
    query getStudentExamsBySubject($subjectId: String!) {
  getExamsBySubject(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentExamsBySubjectGQL extends Apollo.Query<GetStudentExamsBySubjectQuery, GetStudentExamsBySubjectQueryVariables> {
    document = GetStudentExamsBySubjectDocument;
    
  }
export const GetStudentUndoneExamsBySubjectDocument = gql`
    query getStudentUndoneExamsBySubject($subjectId: String!) {
  getUndoneExams(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentUndoneExamsBySubjectGQL extends Apollo.Query<GetStudentUndoneExamsBySubjectQuery, GetStudentUndoneExamsBySubjectQueryVariables> {
    document = GetStudentUndoneExamsBySubjectDocument;
    
  }
export const GetStudentDoneExamsBySubjectDocument = gql`
    query getStudentDoneExamsBySubject($subjectId: String!) {
  getDoneExams(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentDoneExamsBySubjectGQL extends Apollo.Query<GetStudentDoneExamsBySubjectQuery, GetStudentDoneExamsBySubjectQueryVariables> {
    document = GetStudentDoneExamsBySubjectDocument;
    
  }
export const GetMyExamDocument = gql`
    query getMyExam($examId: String!) {
  getExam(examId: $examId) {
    AttachedFile
    DateCreated
    ExamType
    AllocatedTime
    SelectedDateTime
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyExamGQL extends Apollo.Query<GetMyExamQuery, GetMyExamQueryVariables> {
    document = GetMyExamDocument;
    
  }
export const GetMyExamSubmissionDocument = gql`
    query getMyExamSubmission($examId: String!) {
  getUserExamSubmission(examId: $examId) {
    AttachedFile
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyExamSubmissionGQL extends Apollo.Query<GetMyExamSubmissionQuery, GetMyExamSubmissionQueryVariables> {
    document = GetMyExamSubmissionDocument;
    
  }
export const GetMyExamParticipationDocument = gql`
    query getMyExamParticipation($examId: String!) {
  getExamParticipation(examId: $examId) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyExamParticipationGQL extends Apollo.Query<GetMyExamParticipationQuery, GetMyExamParticipationQueryVariables> {
    document = GetMyExamParticipationDocument;
    
  }
export const GetStudentCaTestsBySubjectDocument = gql`
    query getStudentCATestsBySubject($subjectId: String!) {
  getCATestsBySubject(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentCaTestsBySubjectGQL extends Apollo.Query<GetStudentCaTestsBySubjectQuery, GetStudentCaTestsBySubjectQueryVariables> {
    document = GetStudentCaTestsBySubjectDocument;
    
  }
export const GetStudentUndoneCaTestsBySubjectDocument = gql`
    query getStudentUndoneCATestsBySubject($subjectId: String!) {
  getUndoneCATests(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentUndoneCaTestsBySubjectGQL extends Apollo.Query<GetStudentUndoneCaTestsBySubjectQuery, GetStudentUndoneCaTestsBySubjectQueryVariables> {
    document = GetStudentUndoneCaTestsBySubjectDocument;
    
  }
export const GetStudentDoneCaTestsBySubjectDocument = gql`
    query getStudentDoneCATestsBySubject($subjectId: String!) {
  getDoneCATests(subjectId: $subjectId) {
    Id
    TotalExpectedScore
    DateCreated
    Subject {
      Name
    }
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentDoneCaTestsBySubjectGQL extends Apollo.Query<GetStudentDoneCaTestsBySubjectQuery, GetStudentDoneCaTestsBySubjectQueryVariables> {
    document = GetStudentDoneCaTestsBySubjectDocument;
    
  }
export const GetMyCaTestDocument = gql`
    query getMyCATest($caTestId: String!) {
  getCATest(caTestId: $caTestId) {
    AttachedFile
    DateCreated
    ContinousAssesmentType
    AllocatedTime
    SelectedDateTime
    Person {
      FirstName
      LastName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyCaTestGQL extends Apollo.Query<GetMyCaTestQuery, GetMyCaTestQueryVariables> {
    document = GetMyCaTestDocument;
    
  }
export const GetMyCaTestSubmissionDocument = gql`
    query getMyCATestSubmission($caTestId: String!) {
  getUserCATestSubmission(caTestId: $caTestId) {
    AttachedFile
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyCaTestSubmissionGQL extends Apollo.Query<GetMyCaTestSubmissionQuery, GetMyCaTestSubmissionQueryVariables> {
    document = GetMyCaTestSubmissionDocument;
    
  }
export const GetMyCaTestParticipationDocument = gql`
    query getMyCATestParticipation($caTestId: String!) {
  getCATestParticipation(caTestId: $caTestId) {
    Id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyCaTestParticipationGQL extends Apollo.Query<GetMyCaTestParticipationQuery, GetMyCaTestParticipationQueryVariables> {
    document = GetMyCaTestParticipationDocument;
    
  }
export const GetChatRoomParticipantsDocument = gql`
    query getChatRoomParticipants($payload: GetChatRoomParticipantDTO!) {
  getChatRoomParticipants(payload: $payload) {
    Id
    FirstName
    LastName
    Role
    PassportUrl
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetChatRoomParticipantsGQL extends Apollo.Query<GetChatRoomParticipantsQuery, GetChatRoomParticipantsQueryVariables> {
    document = GetChatRoomParticipantsDocument;
    
  }
export const GetUserChatRoomsDocument = gql`
    query getUserChatRooms($payload: ChatRoomSelectionDTO!) {
  getUserChatRooms(payload: $payload) {
    Subjects {
      Id
      Name
      ClassCategory
    }
    SchoolClasses {
      Id
      Name
      ClassCategory
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserChatRoomsGQL extends Apollo.Query<GetUserChatRoomsQuery, GetUserChatRoomsQueryVariables> {
    document = GetUserChatRoomsDocument;
    
  }
export const GetSubjectTopicsDocument = gql`
    query getSubjectTopics($subjectId: String!) {
  getSubjectTopics(subjectId: $subjectId) {
    Id
    Title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectTopicsGQL extends Apollo.Query<GetSubjectTopicsQuery, GetSubjectTopicsQueryVariables> {
    document = GetSubjectTopicsDocument;
    
  }
export const GetSubjectTopicsBySubjectIdDocument = gql`
    query getSubjectTopicsBySubjectId($subjectId: String!) {
  getSubjectTopics(subjectId: $subjectId) {
    Subject {
      Name
    }
    Person {
      Id
      FirstName
      LastName
    }
    Id
    DateCreated
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectTopicsBySubjectIdGQL extends Apollo.Query<GetSubjectTopicsBySubjectIdQuery, GetSubjectTopicsBySubjectIdQueryVariables> {
    document = GetSubjectTopicsBySubjectIdDocument;
    
  }
export const GetSubjectTopicByIdDocument = gql`
    query getSubjectTopicById($subjectTopicId: String!) {
  getSubjectTopic(subjectTopicId: $subjectTopicId) {
    Title
    SubjectId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubjectTopicByIdGQL extends Apollo.Query<GetSubjectTopicByIdQuery, GetSubjectTopicByIdQueryVariables> {
    document = GetSubjectTopicByIdDocument;
    
  }