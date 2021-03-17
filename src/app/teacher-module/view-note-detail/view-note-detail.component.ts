import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Subject_Note } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-note-detail',
  templateUrl: './view-note-detail.component.html',
  styleUrls: ['./view-note-detail.component.css']
})
export class ViewNoteDetailComponent implements
OnInit,
OnDestroy {
  subscriptionList: Subscription[] = [];
  noteId: string;
  attachedFileUrl: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  ngOnInit(): void {
    const getNoteId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
          (res: string) => {
            this.noteId = res;

            const getAttachedFile: Subscription =
            this.sharedUtilitySrv
                .getNoteById(this.noteId)
                .subscribe(
                  (response: Subject_Note) => this.attachedFileUrl = response.AttachedFile
                );

            this.subscriptionList.push(getAttachedFile);
          }
        );

    this.subscriptionList.push(getNoteId);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
