import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectExamParticipationReMap } from 'src/app/types/internal-types.type';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { map } from 'rxjs/operators';
import { Subject_Ca_Participation } from 'src/app/services/origamiGraphql.service';
import { ApolloError } from 'apollo-client';

@Component({
  selector: 'app-track-test-participant',
  templateUrl: './track-test-participant.component.html',
  styleUrls: ['./track-test-participant.component.css']
})
export class TrackTestParticipantComponent implements OnInit,
OnDestroy {
  displayedColumns: string[] = [
    "S/N",
    "Name",
    "StartCATest",
    "Session",
    "Subject",
    "Actions"
  ];
  dataSource: SubjectExamParticipationReMap[] = [];
  subscriptionList: Subscription[] = [];
  caId: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly teacherSrv: TeacherService
  ) { }

  ngOnInit(): void {
    const getCAId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.caId = res;

            //make a call for CA test Participation
            const caParticipation: Subscription =
            this.teacherSrv
                .getCAParticipation(this.caId)
                .subscribe(
                  (response: Subject_Ca_Participation[]) => {
                    this.dataSource =
                    response.map((subjectCaParticipation: Subject_Ca_Participation, index: number) => {
                      const {
                        DateCreated,
                        Id,
                        Person,
                        SubjectCA
                      } = subjectCaParticipation;

                      return {
                        Id,
                        SerialNumber: index + 1,
                        ExamStartDate: DateCreated,
                        Name: `${Person.FirstName} ${Person.LastName}`,
                        Session: SubjectCA.SchoolSession.Name,
                        Subject: SubjectCA.Subject.Name
                      };
                    });
                  },
                  (error: ApolloError) => {
                    this.router.navigate(["/teacher", "manage-test", "view-tests"]);
                  }
                );
            this.subscriptionList.push(caParticipation);
          }
        );

    this.subscriptionList.push(getCAId);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
