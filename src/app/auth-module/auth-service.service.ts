import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ApolloError } from 'apollo-client';
import { MutationBaseService } from '../mutation-base.service';
import { AuthData } from '../types/internal-types.type';
import { AuthResponse, OrigamiRole } from '../services/origamiGraphql.service';
import { SharedUtilityService } from '../shared-module/services/shared-utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userId: string;
  private token: string;

  constructor(
    private router: Router,
    private mutationSrv: MutationBaseService,
    private readonly sharedUtilityService: SharedUtilityService
  ) { }

  //Login USER
  loginUser(username: string, password: string): void {
    try {
      this.mutationSrv
          .login(username, password)
          .subscribe((response: AuthResponse) => {
            const { Role, Token, UserId, TokenExpiryDate, Username } = response;
            const authData: AuthData = {
              username: Username,
              role: Role,
              token: Token,
              tokenExpiryDate: TokenExpiryDate,
              userId: UserId
            };

            //Set the AuthData gotten globally
            this.userId = UserId;
            this.token = Token;

            //Save AuthData to localStorage
            this.saveAuthData(authData);

            //navigate the required URL
            this.navigateByRole(Role);
          },
          (error: ApolloError) => {
            const { message } = error[0].message;
            this.sharedUtilityService.returnErrorMessage(message);
          }
        );
    }
    catch(ex) {
      console.error(ex);
      throw ex;
    }
  }

  //Navigate by role
  private navigateByRole(role: OrigamiRole): void {
    switch(role) {
      case OrigamiRole.Admin:
        this.router.navigate(["/admin"]);
        break;
      case OrigamiRole.Student:
          this.router.navigate(["/student"]);
        break;
      case OrigamiRole.Teacher:
          this.router.navigate(["/teacher"]);
        break;
      default:
          this.router.navigate(["/login"]);
        break;
    }
  }

  //Return the AuthToken to be used by interceptors
  getToken(): string {
    const authData: AuthData = this.getAuthData();
    if(authData) {
      const { token } = authData;
      return token;
    }
  }

  //Get the userId//Return the AuthToken to be used by interceptors
  getUserId(): string {
    const authData: AuthData = this.getAuthData();
    if(authData) {
      const { userId } = authData;
      return userId;
    }
  }

  //Return the Role of the User
  getRole(): string {
    const authData: AuthData = this.getAuthData();
    if(authData) {
      const { role } = authData;
      return role;
    }
  }
  //Check to see if the user is using an expired token
  private hasTokenExpired(tokenExpiry: number): boolean {
    let tokenIsValid: boolean = false;
    const today: number = Date.now();
    if((tokenExpiry * 1000) > today) {
      tokenIsValid = true;
    }

    return tokenIsValid;
  }

  navigateAfterTokenExpiry(): void {
    const authData: AuthData = this.getAuthData();
    if(authData) {
      const { tokenExpiryDate } = authData;
      if(!this.hasTokenExpired(tokenExpiryDate)) {
        this.clearAuthData();
        this.router.navigate(["/login"]);
      }
    }
  }

  isUserAuthenticated(): boolean {
    let isAuthenticated: boolean = false;
    const authData: AuthData = this.getAuthData();

    if(authData) {
      const { token, tokenExpiryDate } = authData;
      if(token && this.hasTokenExpired(tokenExpiryDate)) {
        isAuthenticated = true;
      }
    }

    return isAuthenticated;
  }

  isUserAStudent(): boolean {
    let isUserStudent: boolean = false;

    if(this.isUserAuthenticated()) {
      const authData: AuthData = this.getAuthData();
      if(authData) {
        const { role } = authData;
        if(role === OrigamiRole.Student) {
          isUserStudent = true;
        }
      }
    }

    return isUserStudent;
  }

  isUserATeacher(): boolean {
    let isUserTeacher: boolean = false;

    if(this.isUserAuthenticated()) {
      const authData: AuthData = this.getAuthData();
      if(authData) {
        const { role } = authData;
        if(role === OrigamiRole.Teacher) {
          isUserTeacher = true;
        }
      }
    }

    return isUserTeacher;
  }

  isUserAnAdmin(): boolean {
    let isUserAdmin: boolean = false;

    if(this.isUserAuthenticated()) {
      const authData: AuthData = this.getAuthData();
      if(authData) {
        const { role } = authData;
        if(role === OrigamiRole.Admin) {
          isUserAdmin = true;
        }
      }
    }

    return isUserAdmin;
  }

  //Login USER ASYNCRONIOUSLY
  loginUserAsync(): void {
   try {
    const authData: AuthData = this.getAuthData();

    if(authData) {
      const { role, token, userId, tokenExpiryDate } = authData;

      if(this.hasTokenExpired(tokenExpiryDate)) {
        this.token = token;
        this.userId = userId;

        //Navigate user by their roles
        this.navigateByRole(role);
      }
    }
   }
   catch(ex) {
     console.error(ex);
     throw ex;
   }
  }

  //Storing the token details in localStorage
  private saveAuthData(authData: AuthData) {
    localStorage.setItem("origami-login", JSON.stringify(authData));
  }

  private getAuthData(): AuthData {
    return JSON.parse(localStorage.getItem("origami-login"));
  }

  private clearAuthData(): void {
    localStorage.removeItem("origami-login");
  }

  //Logout
  logout(): void {
    this.token = null;
    this.userId = null;

    //Clear token from localstorage
    this.clearAuthData();

    //Navigate back to the login Area
    this.router.navigate(["/login"]);
  }

}
