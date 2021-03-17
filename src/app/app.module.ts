import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModuleModule } from './admin-module/admin-module.module';
import { StudentModuleModule } from './student-module/student-module.module';
import { TeacherModuleModule } from './teacher-module/teacher-module.module';
import { DefaultModuleModule } from './default-module/default-module.module';
import { LoginComponent } from './login/login.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { AuthModule } from './auth-module/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptor } from './auth.interceptor';
import { environment } from '../environments/environment';

export const HTTP_INTERCEPTORS_LIST = [
  /**
     * Import the http interceptors needed for
     * 1. Attaching Token to http Request
     */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    AdminModuleModule,
    StudentModuleModule,
    TeacherModuleModule,
    DefaultModuleModule,
    AuthModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    HTTP_INTERCEPTORS_LIST
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
