import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { AnonymousRoutesService } from '../services/anonymous-routes.service';
import { Person, ChatCategory } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-chat-participant-sidebar',
  templateUrl: './chat-participant-sidebar.component.html',
  styleUrls: ['./chat-participant-sidebar.component.css']
})
export class ChatParticipantSidebarComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() chatType: ChatCategory;
  @Input() roomId: string;
  roomMembers$: Observable<Person[]>;
  activeUsersAsync$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private readonly anonymousRouteService: AnonymousRoutesService) { }

  ngOnInit(): void {
    //run this functions at intervals
    this.anonymousRouteService.getActiveUsers((data: string[]) => {
      this.activeUsersAsync$.next(data);
    });

    this.roomMembers$ = this.anonymousRouteService.getChatRoomParticipants(this.roomId, this.chatType);
  }

  closeSidebar(): void {
    this.toggleSidebar.emit(false);
  }
}
