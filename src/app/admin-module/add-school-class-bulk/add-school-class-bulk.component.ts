import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-add-school-class-bulk',
  templateUrl: './add-school-class-bulk.component.html',
  styleUrls: ['./add-school-class-bulk.component.css']
})
export class AddSchoolClassBulkComponent implements OnInit {
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
    formData.append("ClassList", uploadedFile, uploadedFile.name);
    this.sharedUtilitySrv.uploadClassBulkList(formData);
  }

}
