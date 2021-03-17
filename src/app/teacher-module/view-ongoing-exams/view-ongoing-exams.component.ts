import { Component, OnInit, OnDestroy } from '@angular/core';
import { ELEMENT_DATA } from 'src/app/admin-module/view-all-subjects/view-all-subjects.component';
import { TeacherService } from '../teacher.service';
import { Subject_Exam, SubjectExamReMap } from '../../services/origamiGraphql.service';
import { Subscription } from 'rxjs';
import { OngoingSubjectExamReMap } from 'src/app/types/internal-types.type';

@Component({
  selector: 'app-view-ongoing-exams',
  templateUrl: './view-ongoing-exams.component.html',
  styleUrls: ['./view-ongoing-exams.component.css']
})
export class ViewOngoingExamsComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = [
    "S/N",
    "Subject",
    "ExamType",
    "DateOfExam",
    "TotalMarksExpected",
    "DateCreated",
    "Actions"
  ];
  dataSource: OngoingSubjectExamReMap[] = [];
  subscriptionList: Subscription[] = [];

  constructor(
    private readonly teacherSrv: TeacherService
  ) { }

  ngOnInit(): void {
    const getOnGoingExams: Subscription =
    this.teacherSrv
        .getOngoingExamsCreatedByTeacher()
        .subscribe(
          (response: Subject_Exam[]) => {
            this.dataSource = response.map((subjectExam: Subject_Exam, index: number)
            : OngoingSubjectExamReMap => {
              const {
                Id,
                DateCreated,
                SelectedDateTime,
                TotalExpectedScore,
                SchoolSession,
                ExamType,
                Subject
              } = subjectExam;

              return {
                TotalExpectedScore,
                Subject: Subject.Name,
                SchoolSession: SchoolSession.Name,
                SerialNumber: index + 1,
                SelectedDateTime,
                DateCreated,
                ExamType,
                Id
              };
            });
          }
        );

    this.subscriptionList.push(getOnGoingExams);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
