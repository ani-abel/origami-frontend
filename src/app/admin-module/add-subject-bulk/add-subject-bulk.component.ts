import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedUtilityService } from 'src/app/shared-module/services/shared-utility.service';

@Component({
  selector: 'app-add-subject-bulk',
  templateUrl: './add-subject-bulk.component.html',
  styleUrls: ['./add-subject-bulk.component.css']
})
export class AddSubjectBulkComponent implements OnInit {
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
    formData.append("SubjectList", uploadedFile, uploadedFile.name);
    this.sharedUtilitySrv.uploadSubjectBulkList(formData);
  }

}
