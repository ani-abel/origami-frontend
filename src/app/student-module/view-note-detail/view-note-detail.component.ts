import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { BottomSheetData } from '../../types/internal-types.type';
import { MatBottomSheetComponent } from '../mat-bottom-sheet/mat-bottom-sheet.component';
import { StudentService } from '../student.service';
import { Subject_Note } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-note-detail',
  templateUrl: './view-note-detail.component.html',
  styleUrls: ['./view-note-detail.component.css']
})
export class ViewNoteDetailComponent implements
OnInit,
OnDestroy {
  bottomSheetData: BottomSheetData;
  attachedFileURL: string;
  subscriptionList: Subscription[] = [];
  noteId: string;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private readonly studentSrv: StudentService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const getNoteId: Subscription =
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id),
        )
        .subscribe(
          (res => {
            this.noteId = res;

            //get the note
            const getNote: Subscription =
            this.studentSrv
                .getNoteForStudent(this.noteId)
                .subscribe(
                  (response: Subject_Note) => {
                    const { Person, DateCreated, AttachedFile } = response;
                    this.attachedFileURL = AttachedFile;
                    this.bottomSheetData = {
                      GivenDate: DateCreated,
                      TeacherName: `${Person.FirstName} ${Person.LastName}`
                    };
                  }
                );
            this.subscriptionList.push(getNote);
          })
        );

    this.subscriptionList.push(getNoteId);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(MatBottomSheetComponent, {
      data: {
        GivenDate: this.bottomSheetData.GivenDate,
        TeacherName: this.bottomSheetData.TeacherName
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
