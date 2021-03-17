import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloError } from 'apollo-client';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { SubmissionsReMap, Purpose } from 'src/app/types/internal-types.type';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject_Ca_Submission } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-view-test-submissions',
  templateUrl: './view-test-submissions.component.html',
  styleUrls: ['./view-test-submissions.component.css']
})
export class ViewTestSubmissionsComponent implements OnInit,
OnDestroy {
  displayedColumns: string[] = ["S/N", "Name", "DateSubmitted", "Actions"];
  dataSource: SubmissionsReMap[] = [];
  caId: string;
  subscriptionList: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly teacherSrv: TeacherService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const getCAId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (response: string) => {
            this.caId = response;


            const getCaTestSubmission: Subscription =
            this.teacherSrv
                .getCASubmissions(this.caId)
                .subscribe(
                  (response: Subject_Ca_Submission[]) => {
                    this.dataSource = response.map((subjectExamSubmission: Subject_Ca_Submission, index: number): SubmissionsReMap => {
                      const {
                        DateCreated,
                        Id,
                        Student,
                        SubjectCA
                      } = subjectExamSubmission;

                      return {
                        SerialNumber: index + 1,
                        TotalExpectedScoreFromExam: SubjectCA.TotalExpectedScore,
                        DateSubmitted: DateCreated,
                        Id,
                        Name: `${Student.Person.FirstName} ${Student.Person.LastName}`
                      };
                    });
                  },
                  (error: ApolloError) => {
                    this.router.navigate(["/teacher", "manage-test", "view-tests"]);
                  }
                );
            this.subscriptionList.push(getCaTestSubmission);
          }
        );

    this.subscriptionList.push(getCAId);
  }

  openDialog(submissionId: string, totalExpectedScore: number) {
    this.dialog.open(GradeSubmissionComponent, {
      data: {
        submissionId: submissionId,
        totalExpectedScore,
        purpose: Purpose.CA_TEST
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
