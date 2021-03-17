import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ImagePreviewDialogComponent } from '../../shared-module/image-preview-dialog/image-preview-dialog.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-exam-participant-detail',
  templateUrl: './exam-participant-detail.component.html',
  styleUrls: ['./exam-participant-detail.component.css']
})
export class ExamParticipantDetailComponent implements
OnInit,
OnDestroy {
  examParticipationId: string;
  imageUrlList$: Observable<any>;
  subscriptionList: Subscription[] = [];
  time: number = 1000;

  constructor(
    public dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    const getExamParticipationId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.examParticipationId = res;
            this.imageUrlList$ = this.teacherSrv.getExamParticipationScreenshots(this.examParticipationId);

            //Look for new uploaded images every 25 seconds
            const timerSubsciption: Subscription =
            interval(25000)//25 seconds
            .pipe(take(this.time))
            .subscribe(ellapsedCycles => {
              this.imageUrlList$ = this.teacherSrv.getExamParticipationScreenshots(this.examParticipationId);
            });
            this.subscriptionList.push(timerSubsciption);
          }
        );
    this.subscriptionList.push(getExamParticipationId);
  }

  openImageDialog(imageURL: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: {
        imageURL
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
