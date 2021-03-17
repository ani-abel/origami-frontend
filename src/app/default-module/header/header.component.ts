import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-module/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}
