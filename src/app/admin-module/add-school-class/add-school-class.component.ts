import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-school-class',
  templateUrl: './add-school-class.component.html',
  styleUrls: ['./add-school-class.component.css']
})
export class AddSchoolClassComponent implements OnInit {
  classCategorySL$: Observable<any>;
  createSchoolClassForm: FormGroup;

  constructor(
    private readonly adminSrv: AdminService
  ) { }

  ngOnInit(): void {
    //Bring in the DROP DOWN List details from  graphQL
    this.classCategorySL$ = this.adminSrv.getClassCategories();
    this.initForm();
  }

  initForm(): void {
    //RegExp for checking the format of class names
    //[a-zA-Z0-9]{1,}\-[a-zA-Z0-9]{1,}
    this.createSchoolClassForm = new FormGroup({
      "className": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.minLength(3)
                                      ])),
      "classCategory": new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.createSchoolClassForm.invalid) {
      return;
    }

    const { className, classCategory } = this.createSchoolClassForm.value;
    this.adminSrv.createSchoolClass(className, classCategory);
    //Clear out the form, waiting for new data
    this.createSchoolClassForm.reset();
    this.createSchoolClassForm.markAsPristine();
  }
}
