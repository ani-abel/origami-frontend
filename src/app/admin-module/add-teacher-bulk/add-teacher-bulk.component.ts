import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedUtilityService } from 'src/app/shared-module/services/shared-utility.service';

@Component({
  selector: 'app-add-teacher-bulk',
  templateUrl: './add-teacher-bulk.component.html',
  styleUrls: ['./add-teacher-bulk.component.css']
})
export class AddTeacherBulkComponent implements OnInit {
  @ViewChild("excelFileUpload", { read: ElementRef }) uploadButton: ElementRef;

  constructor(private readonly sharedUtilitySrv: SharedUtilityService) { }

  ngOnInit(): void {
  }

  uploadFile(): void {
    if(this.uploadButton.nativeElement.files?.length < 1) {
      return;
    }

    const uploadedFile: File = (this.uploadButton.nativeElement.files[0] as File);
    const formData: FormData = new FormData();
    formData.append("TeacherList", uploadedFile, uploadedFile.name);
    this.sharedUtilitySrv.uploadTeacherBulkList(formData);
  }

}
