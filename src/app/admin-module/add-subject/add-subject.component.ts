import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  classCategorySL$: Observable<any>;
  createSubjectForm: FormGroup;
  regExpPattern: string = "([a-zA-Z\d]{1,}\-[a-zA-Z\d]{1,}|[a-zA-Z\d]{1,} ?[a-zA-Z\d]{1,}\-[a-zA-Z\d]{1,}|[a-zA-Z\d]{1,} ?[a-zA-Z\d]{1,} ?[a-zA-Z\d]{1,}\-[a-zA-Z0-9]{1,})";

  constructor(
    private readonly adminSrv: AdminService
  ) { }

  ngOnInit(): void {
    //Bring in the DROP DOWN List details from  graphQL
    this.classCategorySL$ = this.adminSrv.getClassCategories();
    this.initForm();
  }

  initForm(): void {
    this.createSubjectForm = new FormGroup({
      "subjectName": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.minLength(3)
                                      ])),
      "classCategory": new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.createSubjectForm.invalid) {
      return;
    }

    const { subjectName, classCategory } = this.createSubjectForm.value;
    this.adminSrv.createNewSubject(subjectName, classCategory);
    this.createSubjectForm.reset();
    this.createSubjectForm.markAsPristine();
  }

}
