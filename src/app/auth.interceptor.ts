import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from "./auth-module/auth-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthServiceService) {  }

    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<unknown>>  {
      const token: string = this.authService.getToken();

      const authRequest = req.clone({
        headers: req.headers.set("Authorization", `Origami ${token}`)
      });
      return next.handle(authRequest);
    }
}
