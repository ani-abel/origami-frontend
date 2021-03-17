import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AnonymousRoutingModule } from './anonymous-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ChatBySubjectComponent } from './chat-by-subject/chat-by-subject.component';
import { AnonymousRoutesService } from './services/anonymous-routes.service';
import { ChatParticipantSidebarComponent } from './chat-participant-sidebar/chat-participant-sidebar.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.messageChatRoot, options: {} };

@NgModule({
  declarations: [
    UpdateProfileComponent,
    ChatBySubjectComponent,
    ChatParticipantSidebarComponent,
    ChatRoomListComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    AnonymousRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AnonymousRoutesService
  ]
})
export class AnonymousRoutesModule { }
