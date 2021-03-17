import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { QueryBaseService } from '../../query-base.service';
import { MutationBaseService } from '../../mutation-base.service';
import { ChatCategory, OrigamiRole } from '../../services/origamiGraphql.service';
import { Observable } from 'rxjs';
import {
  ChatPayload,
  WebSocketEventType,
  UserJoinsRoomPayload,
  ChatMessageReMap,
  ChatMessageReMapAndRoomName
} from '../../types/internal-types.type';
import { map } from 'rxjs/operators';

@Injectable()
export class AnonymousRoutesService {

  constructor(
    private socket: Socket,
    private readonly querySrv: QueryBaseService,
    private readonly mutationSrv: MutationBaseService
  ) { }

  sendMessage(payload: ChatPayload, callback: Function) {
    this.socket.emit(WebSocketEventType.USER_SENT_MESSAGE, payload, (data: ChatMessageReMap) => {
      callback(data);
      return;
    });
  }

  userJoinsRoom(payload: UserJoinsRoomPayload, callback: Function) {
    this.socket.emit(WebSocketEventType.USER_JOINED, payload, (data: ChatMessageReMapAndRoomName) => {
      callback(data);
      return;
    });
  }

  userIsTyping(payload: UserJoinsRoomPayload, callback: Function) {
    this.socket.emit(WebSocketEventType.USER_IS_TYPING, payload, (data: string) =>  {
      callback(data);
      return;
    });
  }

  userLeftRoom(payload: UserJoinsRoomPayload, callback: Function) {
    this.socket.emit(WebSocketEventType.USER_LEFT, payload, (data: string) => {
      callback(data);
      return;
    });
  }

  getActiveUsers(callback: Function): void {
    this.socket.emit(WebSocketEventType.GET_ACTIVE_USERS, null, (data) => {
      callback(data);
      return;
    })
  }

  userIsTypingConfirmation(callback: Function): void {
    this.socket.on(WebSocketEventType.USER_IS_TYPING_CONFIRMATION, (data: string) => {
      callback(data);
      return;
    })
  }

  //get the lost of participants how are eligible to chat on this chatRoom
  getChatRoomParticipants(roomId: string, chatType: ChatCategory)
  : Observable<any> {
    return this.querySrv.getChatRoomParticipants(roomId, chatType);
  }

  getChatRooms(userId: string, role: OrigamiRole)
  : Observable<any> {
    return this.querySrv.getChatRooms(userId, role);
  }

}
