import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthServiceService } from '../auth-module/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly authService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm();
    this.authService.loginUserAsync();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.email
                                      ])),
      "password": new FormControl(null, Validators.compose([
                                            Validators.required,
                                            Validators.minLength(5),
                                      ]))
    });
  }

  submitLoginForm(): void {
    if(this.loginForm.invalid){
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.loginUser(username, password);
  }

}

