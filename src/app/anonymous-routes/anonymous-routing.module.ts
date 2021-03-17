import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../default-module/default-component/default-component.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChatBySubjectComponent } from './chat-by-subject/chat-by-subject.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';

const routes: Routes = [
  { path: "", component: DefaultComponent, children: [
    { path: "", pathMatch: "full", redirectTo: "update-profile" },
    { path: "update-profile", component: UpdateProfileComponent },
    { path: "chat-by-subject/:id", component: ChatBySubjectComponent },
    { path: "chat-rooms", component: ChatRoomListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonymousRoutingModule { }
