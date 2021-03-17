import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoMessageDialogData } from 'src/app/types/internal-types.type';

@Component({
  selector: 'app-meesage-dialog',
  templateUrl: './meesage-dialog.component.html',
  styleUrls: ['./meesage-dialog.component.css']
})
export class MeesageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoMessageDialogData) {}

  ngOnInit(): void {
  }

}
