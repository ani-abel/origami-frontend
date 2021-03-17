import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GradeSubmissionComponent } from '../grade-submission/grade-submission.component';
import { AssignmentSubmissionsReMap } from 'src/app/types/internal-types.type';
import { TeacherService } from '../teacher.service';
import { Subject_Assignment_Submission } from 'src/app/services/origamiGraphql.service';
import { Purpose } from '../../types/internal-types.type';
import { UpdateGradeSubmissionComponent } from '../update-grade-submission/update-grade-submission.component';

@Component({
  selector: 'app-view-assigment-submissions',
  templateUrl: './view-assigment-submissions.component.html',
  styleUrls: ['./view-assigment-submissions.component.css']
})
export class ViewAssigmentSubmissionsComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = ["S/N", "StudentName", "Subject","DateSubmitted" ,"Actions"];
  dataSource: AssignmentSubmissionsReMap[] = [];
  assignmentId: string;
  subscriptionList: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly teacherSrv: TeacherService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const getAssignmentId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (response: string) => {
            this.assignmentId = response;

            const getAssignmentSubmissions: Subscription =
            this.teacherSrv
                .getAssignmentSubmissionList(this.assignmentId)
                .subscribe(
                  (response: Subject_Assignment_Submission[]) => {
                    this.dataSource = response.map((assignmentSubmission: Subject_Assignment_Submission, index: number) => {
                      const { Id, DateCreated, SubjectAssignment, Student, SubjectAssignmentScoreList } = assignmentSubmission;
                      return {
                        Id,
                        SerialNumber: index + 1,
                        IsSubmitted: SubjectAssignmentScoreList?.length > 0 ? true : false,
                        TotalExpectedScoreFromAssignment: SubjectAssignment.TotalExpectedScore,
                        DateCreated,
                        Subject: SubjectAssignment.Subject.Name,
                        StudentName: `${Student.Person.FirstName} ${Student.Person.LastName}`
                      }
                    });
                  },
                  (error) => {
                    this.router.navigate(["/teacher", "manage-assignment", "view-assignments"]);
                  }
                );

            this.subscriptionList.push(getAssignmentSubmissions);

          }
        );

    this.subscriptionList.push(getAssignmentId);
  }

  openDialog(assignSubmissionId: string, totalExpectedScore: number) {
    this.dialog.open(GradeSubmissionComponent, {
      data: {
        submissionId: assignSubmissionId,
        totalExpectedScore,
        purpose: Purpose.ASSIGNMENT
      }
    });
  }

  //Fix Up Later
  openUpdateDialog(assignSubmissionId: string, totalExpectedScore: number) {
    this.dialog.open(UpdateGradeSubmissionComponent, {
      data: {
        submissionId: assignSubmissionId,
        totalExpectedScore,
        purpose: Purpose.ASSIGNMENT
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}

