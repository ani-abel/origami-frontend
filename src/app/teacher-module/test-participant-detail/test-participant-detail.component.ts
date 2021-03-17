import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ImagePreviewDialogComponent } from 'src/app/shared-module/image-preview-dialog/image-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-test-participant-detail',
  templateUrl: './test-participant-detail.component.html',
  styleUrls: ['./test-participant-detail.component.css']
})
export class TestParticipantDetailComponent implements OnInit,
OnDestroy,
DoCheck {
  caParticipationId: string;
  imageUrlList$: Observable<any>;
  subscriptionList: Subscription[] = [];
  time: number = 1000;

  constructor(
    public dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly teacherSrv: TeacherService
  ) {}

  ngOnInit(): void {
    const getCaParticipationId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.caParticipationId = res;
            this.imageUrlList$ = this.teacherSrv.getCAParticipationScreenshots(this.caParticipationId);

            //Look for new uploaded images every 25 seconds
            const timerSubsciption: Subscription =
            interval(25000)//25 seconds
            .pipe(take(this.time))
            .subscribe(ellapsedCycles => {
              this.imageUrlList$ = this.teacherSrv.getCAParticipationScreenshots(this.caParticipationId);
            });
            this.subscriptionList.push(timerSubsciption);
          }
        );

    this.subscriptionList.push(getCaParticipationId);
  }

  openImageDialog(imageURL: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: {
        imageURL
      }
    });
  }

  ngDoCheck(): void {
    if(this.caParticipationId) {
      this.imageUrlList$ = this.teacherSrv.getExamParticipationScreenshots(this.caParticipationId);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
