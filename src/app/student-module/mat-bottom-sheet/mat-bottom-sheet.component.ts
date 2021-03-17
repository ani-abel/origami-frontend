import { BottomSheetData } from '../../types/internal-types.type';
import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-mat-bottom-sheet',
  templateUrl: './mat-bottom-sheet.component.html',
  styleUrls: ['./mat-bottom-sheet.component.css']
})
export class MatBottomSheetComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData,
    private _bottomSheetRef: MatBottomSheetRef<MatBottomSheetComponent>
  ) {}

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }

  ngOnInit(): void { }

}
