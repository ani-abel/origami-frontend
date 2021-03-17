import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloError } from 'apollo-client';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { TeacherService } from '../teacher.service';
import { SubmissionsReMap, Purpose } from 'src/app/types/internal-types.type';
import { Subject_Exam_Submission } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-exam-submissions',
  templateUrl: './view-exam-submissions.component.html',
  styleUrls: ['./view-exam-submissions.component.css']
})
export class ViewExamSubmissionsComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = ["S/N", "Name", "DateSubmitted", "Actions"];
  dataSource: SubmissionsReMap[] = [];
  examId: string;
  subscriptionList: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly teacherSrv: TeacherService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const getExamId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (response: string) => {
            this.examId = response;

            const getExamSubmission: Subscription =
            this.teacherSrv
                .getExamSubmissions(this.examId)
                .subscribe(
                  (response: Subject_Exam_Submission[]) => {
                    this.dataSource = response.map((subjectExamSubmission: Subject_Exam_Submission, index: number): SubmissionsReMap => {
                      const {
                        DateCreated,
                        Id,
                        Student,
                        SubjectExam
                      } = subjectExamSubmission;

                      return {
                        SerialNumber: index + 1,
                        TotalExpectedScoreFromExam: SubjectExam.TotalExpectedScore,
                        DateSubmitted: DateCreated,
                        Id,
                        Name: `${Student.Person.FirstName} ${Student.Person.LastName}`
                      };
                    });
                  },
                  (error: ApolloError) => {
                    this.router.navigate(["/teacher", "manage-exam", "view-exams"]);
                  }
                );
            this.subscriptionList.push(getExamSubmission);
          }
        );

    this.subscriptionList.push(getExamId);
  }

  openDialog(submissionId: string, totalExpectedScore: number) {
    this.dialog.open(GradeSubmissionComponent, {
      data: {
        submissionId: submissionId,
        totalExpectedScore,
        purpose: Purpose.EXAM
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
