import { Component, OnInit, DoCheck } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';

@Component({
  selector: 'app-default-component',
  templateUrl: './default-component.component.html',
  styleUrls: ['./default-component.component.css']
})
export class DefaultComponent implements
OnInit,
DoCheck {
  sidebarOpen: boolean = false;
  hideSpinner: boolean = false;

  constructor(
    private readonly authSrv: AuthServiceService,
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly connectionSrv: ConnectionService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.hideSpinner = true, 3000);
  }

  ngDoCheck(): void {
    //If token has expired Navigate away
    this.authSrv.navigateAfterTokenExpiry();

    //Check for internet connectivity
    this.connectionSrv.monitor().subscribe(isConnected => {
      if (!isConnected) {
        const message: string = "You're not connected, Check your internet connection";
        this.sharedUtilitySrv.returnErrorMessage(message);
      }
    });
  }

  sidebarToggler(event: Event): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
