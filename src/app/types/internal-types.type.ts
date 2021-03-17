import { OrigamiRole, ClassCategory, ExamType, ContinousAssesmentType } from '../services/origamiGraphql.service';
export enum Purpose {
  ASSIGNMENT = 'ASSIGNMENT',
  CA_TEST = 'CA TEST',
  EXAM = 'EXAM'
}

export interface AssignmentScoreDialogData {
  assignmentId: string,
  score?: number;
  totalExpectedScore: number;
  purpose: Purpose;
}

export interface ErrorMessageDialogData {
  message: string;
}

export interface SubjectExamParticipationReMap {
  Id: string;

  SerialNumber: number;

  Name: string;

  Subject: string;

  ExamStartDate: Date;

  Session: string;
}

export interface InfoMessageDialogData {
  message: string;
}

export interface AuthData {
  username: string;

  role: OrigamiRole;

  token: string;

  tokenExpiryDate: number;

  userId: string;
}


export interface SchoolClassReMap {
  SerialNumber: number;

  Id: string;

  Name: string;

  ClassCategory: ClassCategory;
}

export interface SubjectReMap {
  SerialNumber: number;

  Id: string;

  Name: string;

  ClassCategory: ClassCategory;
}

export interface PersonReMap {
  SerialNumber: number;

  Id: string;

  Name: string;

  Username: string;
}

export interface StudentListReMap {
  Id: string;

  Name: string;

  Username: string;

  SchoolClass: string;
}

export interface UpdateProfile  {
  ProfileImage?: File | string;

  FirstName?: string;

  LastName?: string;

  Username?: string;
}

export interface SubjectAssignmentListReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  DateCreated: Date;

  DueDate: Date;

  TotalExpectedScore: number;
}


export interface AssignmentSubmissionsReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  DateCreated: Date;

  StudentName: string;

  TotalExpectedScoreFromAssignment: number;

  IsSubmitted: boolean;
}

export interface SubmissionsReMap {
  Id: string;

  SerialNumber: number;

  Name: string;

  DateSubmitted: Date;

  TotalExpectedScoreFromExam: number;
}

export interface OngoingSubjectExamReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  ExamType: ExamType;

  SelectedDateTime: Date;

  DateCreated: Date;

  SchoolSession: string;

  TotalExpectedScore: number;
}

export interface OngoingSubjectCAReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  CAType: ContinousAssesmentType;

  SelectedDateTime: Date;

  DateCreated: Date;

  SchoolSession: string;

  TotalExpectedScore: number;
}

export interface MySubjectNoteReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  CreatedBy: string;

  DateCreated: Date;
}

export interface StudentAssignmentListReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  CreatedBy: string;

  DateCreated: Date;

  TotalExpectedScore: number;
}

export interface BottomSheetData {
  TeacherName: string;

  DueDate?: Date;

  GivenDate: Date;
}

export interface SubjectNoteReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  DateCreated: Date;
}

export interface StudentSubjectListReMap {
  Id: string;

  SerialNumber: number;

  Subject: string;

  DateCreated: Date;

  ClassCategory: ClassCategory;
}

export enum AllocatedTimeInterval {
  FIFTEEN_MINUTES = 'FIFTEEN_MINUTES',
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  FOURTY_FIVE_MINUTES = 'FOURTY_FIVE_MINUTES',
  ONE_HOUR = 'ONE_HOUR',
  ONE_HOUR_THRITY_MINUTES = 'ONE_HOUR_THRITY_MINUTES',
  ONE_HOUR_FOUTY_FIVE_MINUTES = 'ONE_HOUR_FOUTY_FIVE_MINUTES',
  TWO_HOURS = 'TWO_HOURS',
  TWO_HOURS_THRITY_MINUTES = 'TWO_HOURS_THRITY_MINUTES',
  TWO_HOUR_FOUTY_FIVE_MINUTES = 'TWO_HOUR_FOUTY_FIVE_MINUTES'
}

export interface ChatMessageReMap {
  Id: string;

  DateCreated: Date;

  Message: string;

  RoomId: string;

  PersonId: string;

  Username: string;

  ProfileImage: string;
}

export enum WebSocketEventType {
  USER_JOINED = 'USER_JOINED',
  USER_IS_TYPING = 'USER_IS_TYPING',
  USER_SENT_MESSAGE = 'USER_SENT_MESSAGE',
  USER_LEFT = 'USER_LEFT',
  USER_JOINED_CONFIRMATION = 'USER_JOINED_CONFIRMATION',
  USER_LEFT_CONFIRMATION = 'USER_LEFT_CONFIRMATION',
  USER_IS_TYPING_CONFIRMATION = 'USER_IS_TYPING_CONFIRMATION',
  USER_MESSAGE_CONFIRMATION = 'USER_MESSAGE_CONFIRMATION',
  SEND_ALL_MESSAGES = 'SEND_ALL_MESSAGES',
  GET_ACTIVE_USERS = 'GET_ACTIVE_USERS'
}

export enum ChatCategory {
 SUBJECT_CHAT = 'SUBJECT_CHAT',
 CLASS_CHAT = 'CLASS_CHAT'
}

export class ChatPayload {
/**
 * Refers the Id of the logged in user
*/
UserId: string;

Message?: string;

/**
  * Describes the type of Chat that is about to take Place
  */
ChatType: ChatCategory;

/**
 * Could be either the subjectId or Class Id
*/
SocketId: string;
}

export interface UserJoinsRoomPayload {
  SubjectId: string;

  UserId: string

  ChatType?: ChatCategory;
}

export interface ChatMessageReMapAndRoomName {
  Messages: ChatMessageReMap[];

  RoomName: string;
}
