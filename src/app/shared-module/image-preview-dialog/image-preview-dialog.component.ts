import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImageDialogData {
  imageURL: string;
}

@Component({
  selector: 'app-image-preview-dialog',
  templateUrl: './image-preview-dialog.component.html',
  styleUrls: ['./image-preview-dialog.component.css']
})
export class ImagePreviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {}

  ngOnInit(): void {
  }

}
