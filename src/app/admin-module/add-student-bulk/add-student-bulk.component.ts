import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';

@Component({
  selector: 'app-add-student-bulk',
  templateUrl: './add-student-bulk.component.html',
  styleUrls: ['./add-student-bulk.component.css']
})
export class AddStudentBulkComponent implements OnInit {
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
    formData.append("StudentList", uploadedFile);
    this.sharedUtilitySrv.uploadStudentBulkList(formData);
  }

}
