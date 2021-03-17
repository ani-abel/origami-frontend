import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainAuthGuard } from './auth-module/guards/main-auth-guard.guard';
import { AdminAuthGuard } from './auth-module/guards/admin-auth-guard.guard';
import { StudentAuthGuard } from './auth-module/guards/student-auth-guard.guard';
import { TeacherAuthGuard } from './auth-module/guards/teacher-auth-guard.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },

  //Routes for Admin-section
  {
    path: "admin",
    canActivate: [
      MainAuthGuard,
      AdminAuthGuard
    ],
    loadChildren: () => import('./admin-module/admin-module.module').then(m => m.AdminModuleModule)
  },

  //Routes for Student-section
  {
    path: "student",
    canActivate: [
      MainAuthGuard,
      StudentAuthGuard
    ],
    loadChildren: () => import('./student-module/student-module.module').then(m => m.StudentModuleModule)
  },

  //Routes for Teacher-section
  {
    path: "teacher",
    canActivate: [
      MainAuthGuard,
      TeacherAuthGuard
    ],
    loadChildren: () => import('./teacher-module/teacher-module.module').then(m => m.TeacherModuleModule)
  },
  //Anonymous routes I.E update profile
  {
    path: "anonymous",
    canActivate: [
      MainAuthGuard
    ],
    loadChildren: () => import('./anonymous-routes/anonymous-routes.module').then(m => m.AnonymousRoutesModule)
  },

  //Default 404 route
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
