import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AdminService } from '../admin.service';
import { Person } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {
  updateTeacherForm: FormGroup;
  teacherId: string;

  constructor(
    private readonly adminSrv: AdminService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute
        .params
        .pipe(
          map(res => res.id)
        )
        .subscribe(res => {
          this.teacherId = res;
        });

    //populate the Form Inputs
    this.adminSrv
        .getUserById(this.teacherId)
        .subscribe(
          (response: Person) => {
            const { FirstName, LastName, Username } = response;
            //Patch the values back into the form
            this.updateTeacherForm.patchValue({
              firstName: FirstName,
              lastName: LastName,
              email: Username
            });
          },
          (error) => {
            console.error(error);
            this.router.navigate(["/admin", "manage-teachers"]);
          }
        )
  }

  initForm(): void {
    this.updateTeacherForm = new FormGroup({
      "firstName": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.minLength(3)
                                      ])),
       "lastName": new FormControl(null, Validators.compose([
                                        Validators.required,
                                        Validators.minLength(3)
                                    ])),
        "email": new FormControl(null, Validators.compose([
                                          Validators.email,
                                          Validators.required
        ]))
    });
  }

  submitForm(): void {
    if(this.updateTeacherForm.invalid) {
      return;
    }

    const { email, lastName, firstName } = this.updateTeacherForm.value;
    this.adminSrv.updateOrigamiUser(this.teacherId, email, firstName, lastName);
  }

}
