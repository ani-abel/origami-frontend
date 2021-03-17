import { Component, OnInit, OnDestroy } from '@angular/core';
import { ELEMENT_DATA } from 'src/app/admin-module/view-all-subjects/view-all-subjects.component';
import { OngoingSubjectExamReMap, OngoingSubjectCAReMap } from 'src/app/types/internal-types.type';
import { Subscription } from 'rxjs';
import { TeacherService } from '../teacher.service';
import { Subject_Exam, Subject_Ca } from 'src/app/services/origamiGraphql.service';
import { ContinousAssesmentType } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-ongoing-tests',
  templateUrl: './view-ongoing-tests.component.html',
  styleUrls: ['./view-ongoing-tests.component.css']
})
export class ViewOngoingTestsComponent implements OnInit,
OnDestroy {
  displayedColumns: string[] = [
    "S/N",
    "Subject",
    "CAType",
    "DateOfCATest",
    "TotalMarksExpected",
    "DateCreated",
    "Actions"
  ];
  dataSource: OngoingSubjectCAReMap[] = [];
  subscriptionList: Subscription[] = [];

  constructor(
    private readonly teacherSrv: TeacherService
  ) { }

  ngOnInit(): void {
    const getOnGoingCATests: Subscription =
    this.teacherSrv
        .getOngoingCATestsCreatedByTeacher()
        .subscribe(
          (response: Subject_Ca[]) => {
            this.dataSource = response.map((subjectCA: Subject_Ca, index: number)
            : OngoingSubjectCAReMap => {
              const {
                Id,
                DateCreated,
                SelectedDateTime,
                TotalExpectedScore,
                SchoolSession,
                ContinousAssesmentType,
                Subject
              } = subjectCA;

              return {
                TotalExpectedScore,
                Subject: Subject.Name,
                SchoolSession: SchoolSession.Name,
                SerialNumber: index + 1,
                SelectedDateTime,
                DateCreated,
                CAType: ContinousAssesmentType,
                Id
              };
            });
          }
        );

    this.subscriptionList.push(getOnGoingCATests);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}

