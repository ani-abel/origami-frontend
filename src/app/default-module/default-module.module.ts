import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DefaultComponent } from './default-component/default-component.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AuthModule } from '../auth-module/auth.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModuleModule,
    AuthModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DefaultComponent
  ]
})
export class DefaultModuleModule { }
