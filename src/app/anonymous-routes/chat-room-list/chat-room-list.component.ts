import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { ChatRoomList, OrigamiRole } from '../../services/origamiGraphql.service';
import { AnonymousRoutesService } from '../services/anonymous-routes.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {
  chatRoomList$: Observable<ChatRoomList>;
  userId: string;
  role: OrigamiRole;

  constructor(
    private readonly authSrv: AuthServiceService,
    private readonly anonymousRouteSrv: AnonymousRoutesService
  ) { }

  ngOnInit(): void {
    this.userId = this.authSrv.getUserId();
    this.role = (this.authSrv.getRole() as OrigamiRole);
    this.chatRoomList$ = this.anonymousRouteSrv.getChatRooms(this.userId, this.role);
  }

}
