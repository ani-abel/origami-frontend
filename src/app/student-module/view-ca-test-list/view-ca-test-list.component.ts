import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA } from 'src/app/admin-module/view-all-subjects/view-all-subjects.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewScoreDialogComponent } from '../view-score-dialog/view-score-dialog.component';
import { Purpose } from 'src/app/types/internal-types.type';

@Component({
  selector: 'app-view-ca-test-list',
  templateUrl: './view-ca-test-list.component.html',
  styleUrls: ['./view-ca-test-list.component.css']
})
export class ViewCaTestListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(assignmentId: string, score: number): void {
    this.dialog.open(ViewScoreDialogComponent, {
      data: {
        assignmentId: assignmentId,
        totalExpectedScore: 30,
        score,
        purpose: Purpose.CA_TEST
      }
    });
  }
}
