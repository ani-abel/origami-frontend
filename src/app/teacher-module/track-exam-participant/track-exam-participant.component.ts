import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloError } from 'apollo-client';
import { Subject_Exam_Participation } from '../../services/origamiGraphql.service';
import { TeacherService } from '../teacher.service';
import { SubjectExamParticipationReMap } from 'src/app/types/internal-types.type';

@Component({
  selector: 'app-track-exam-participant',
  templateUrl: './track-exam-participant.component.html',
  styleUrls: ['./track-exam-participant.component.css']
})
export class TrackExamParticipantComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = [
    "S/N",
    "Name",
    "StartExam",
    "Session",
    "Subject",
    "Actions"
  ];
  dataSource: SubjectExamParticipationReMap[] = [];
  subscriptionList: Subscription[] = [];
  examId: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly teacherSrv: TeacherService
  ) { }

  ngOnInit(): void {
    const getExamId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.examId = res;

            //make a call for exam Participation
            const examParticipation: Subscription =
            this.teacherSrv
                .getExamParticipationList(this.examId)
                .subscribe(
                  (response: Subject_Exam_Participation[]) => {
                    this.dataSource =
                    response.map((subjectExamParticipation: Subject_Exam_Participation, index: number) => {
                      const {
                        Id,
                        Person,
                        SubjectExam
                      } = subjectExamParticipation;

                      return {
                        Id,
                        SerialNumber: index + 1,
                        ExamStartDate: SubjectExam.SelectedDateTime,
                        Name: `${Person.FirstName} ${Person.LastName}`,
                        Session: SubjectExam.SchoolSession.Name,
                        Subject: SubjectExam.Subject.Name
                      };
                    });
                  },
                  (error: ApolloError) => {
                    this.router.navigate(["/teacher", "manage-exam", "view-exams"]);
                  }
                );
            this.subscriptionList.push(examParticipation);
          }
        );

    this.subscriptionList.push(getExamId);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
