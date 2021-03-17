import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AdminService } from '../admin.service';
import { Subject } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {
  updateSubjectForm: FormGroup;
  classCategorySL$: Observable<any>;
  subjectId: string;
  regExpPattern: string = "([a-zA-Z\d]{1,}\-[a-zA-Z\d]{1,}|[a-zA-Z\d]{1,} ?[a-zA-Z\d]{1,}\-[a-zA-Z\d]{1,}|[a-zA-Z\d]{1,} ?[a-zA-Z\d]{1,} ?[a-zA-Z\d]{1,}\-[a-zA-Z0-9]{1,})";

  constructor(
    private readonly adminSrv: AdminService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.classCategorySL$ = this.adminSrv.getClassCategories();
    this.initForm();

    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(
         res => {
           this.subjectId = res;
         }
        );

    this.adminSrv
        .getSubjectById(this.subjectId)
        .subscribe(
          (response: Subject) => {
            const { Name, ClassCategory } = response;
            this.updateSubjectForm.patchValue({
              subjectName: Name,
              classCategory: ClassCategory
            });
          },
          (error) => {
            throw error;
          }
        );
  }

  initForm(): void {
    this.updateSubjectForm = new FormGroup({
      "subjectName": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.minLength(3)
                                      ])),
      "classCategory": new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.updateSubjectForm.invalid) {
      return;
    }

    const { subjectName, classCategory } = this.updateSubjectForm.value;
    this.adminSrv.updateSubject(this.subjectId, subjectName, classCategory);
  }

}
