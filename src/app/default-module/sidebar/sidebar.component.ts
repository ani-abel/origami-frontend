import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { AdminService } from '../../admin-module/admin.service';
import { Person } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  userId: string;
  profileImageURL: string;
  firstName: string;
  lastName: string;
  fullName: string;

  constructor(
    public readonly authSrv: AuthServiceService,
    private readonly adminSrv: AdminService
  ) { }

  ngOnInit(): void {
    this.userId = this.authSrv.getUserId();
    //get the profile Image
    this.adminSrv
        .getProfileImage(this.userId)
        .subscribe(
          (response: Person) => {
            const { PassportUrl, FirstName, LastName } = response;
            this.profileImageURL = PassportUrl;
            this.firstName = FirstName;
            this.lastName = LastName;
            this.fullName = `${this.firstName?.toUpperCase()} ${this.lastName?.toUpperCase()}`;
          },
          (error) => {
            throw error;
          }
        )
  }

}
