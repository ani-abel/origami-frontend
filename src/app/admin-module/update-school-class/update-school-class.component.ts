import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ApolloError } from 'apollo-client';
import { AdminService } from '../admin.service';
import { School_Class } from '../../services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';

@Component({
  selector: 'app-update-school-class',
  templateUrl: './update-school-class.component.html',
  styleUrls: ['./update-school-class.component.css']
})
export class UpdateSchoolClassComponent implements OnInit {
  classCategorySL$: Observable<any>;
  updateSchoolClassForm: FormGroup;
  classId: string;

  constructor(
    private readonly adminSrv: AdminService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  ngOnInit(): void {
    //Initialize the form
    this.initForm();

    //Get the retrived School_Class
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        ).subscribe((res: string) => {
          this.classId = res;

          //Get the Class details From the backend
          this.adminSrv
              .getAClassById(res)
              .subscribe(
                (response: School_Class) => {
                  const { Name, ClassCategory } = response;

                  //Patch the Expected values back into the form for pre-populating the fields
                  this.updateSchoolClassForm.patchValue({
                    className: Name,
                    classCategory: ClassCategory
                  });

                  //Bring in the DROP DOWN List details from  graphQL
                  this.classCategorySL$ = this.adminSrv.getClassCategories();
              },
              (error: ApolloError) => {
                this.sharedUtilitySrv.returnErrorMessage("Data Could not be fetched at this time");
                this.router.navigate(["/admin", "school-class"]);
              }
            );
        });
  }

  initForm(): void {
    //RegExp for checking the format of class names
    //[a-zA-Z0-9]{1,}\-[a-zA-Z0-9]{1,}
    this.updateSchoolClassForm = new FormGroup({
      "className": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.minLength(3)
                                      ])),
      "classCategory": new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.updateSchoolClassForm.invalid) {
      return;
    }
    const { className, classCategory } = this.updateSchoolClassForm.value;
    this.adminSrv.updateSchoolClass(this.classId, className, classCategory);
  }

}
