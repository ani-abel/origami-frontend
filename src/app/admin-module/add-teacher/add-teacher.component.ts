import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from '../admin.service';
import { OrigamiRole } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacherRegistrationForm: FormGroup;

  constructor(private readonly adminSrv: AdminService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.teacherRegistrationForm = new FormGroup({
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
    if(this.teacherRegistrationForm.invalid) {
      return;
    }

    const { email, firstName, lastName } = this.teacherRegistrationForm.value;
    this.adminSrv.registerOrigamiUser(firstName, lastName, email, OrigamiRole.Teacher);

    //Clear up the form's data
    this.teacherRegistrationForm.reset();
    this.teacherRegistrationForm.markAsPristine();
  }

}
