import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { School_Class, OrigamiRole } from 'src/app/services/origamiGraphql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  activeClassesSL$: Observable<School_Class[]>;
  studentRegistrationForm: FormGroup;

  constructor(private readonly adminSrv: AdminService) { }

  ngOnInit(): void {
    this.activeClassesSL$ = this.adminSrv.getActiveClassesForSL();
    this.initForm();
  }

  initForm(): void {
    this.studentRegistrationForm = new FormGroup({
      "firstName": new FormControl(null, Validators.compose([
                                          Validators.required
                                      ])),
       "lastName": new FormControl(null, Validators.compose([
                                        Validators.required
                                    ])),
        "email": new FormControl(null, Validators.compose([
                                          Validators.email,
                                          Validators.required
        ])),
        "schoolClass": new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    if(this.studentRegistrationForm.invalid) {
      return;
    }

    const { email, firstName, lastName, schoolClass } = this.studentRegistrationForm.value;
    this.adminSrv.registerOrigamiUser(firstName, lastName, email, OrigamiRole.Student, schoolClass);

    //Clear up the form's data
    this.studentRegistrationForm.reset();
    this.studentRegistrationForm.markAsPristine();
  }
}
