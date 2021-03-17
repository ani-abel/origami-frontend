import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  Subscription,
  BehaviorSubject,
  Observable,
  Observer
} from 'rxjs';
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { AnonymousRoutesService } from '../services/anonymous-routes.service';
import { AuthServiceService } from '../../auth-module/auth-service.service';
import { UserJoinsRoomPayload, ChatCategory, ChatMessageReMap } from 'src/app/types/internal-types.type';
import { ChatPayload, ChatMessageReMapAndRoomName } from '../../types/internal-types.type';

@Component({
  selector: 'app-chat-by-subject',
  templateUrl: './chat-by-subject.component.html',
  styleUrls: ['./chat-by-subject.component.css']
})
export class ChatBySubjectComponent implements
OnInit,
AfterViewInit,
OnDestroy {
  @ViewChild("messageContainer", { read: ElementRef }) messageContainer: ElementRef;
  subscriptionList: Subscription[] = [];
  sendMessageForm: FormGroup;
  userId: string;
  subjectId: string;
  payload: UserJoinsRoomPayload;
  messages: ChatMessageReMap[] = [];
  temporaryMessage: string;
  chatType: ChatCategory;
  messagesAsync$: BehaviorSubject<ChatMessageReMap[]> = new BehaviorSubject<ChatMessageReMap[]>([]);
  roomNameAsync$: Observable<string>;
  toggleSidebar: boolean = false;

  constructor(
    public dialog: MatDialog,
    private readonly anonymousRouteSrv: AnonymousRoutesService,
    private readonly authSrv: AuthServiceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  handleSidebarToggle(event: Event): void {
    this.toggleSidebar = false;
  }

  openSidebar(): void {
    this.toggleSidebar = true;
  }

  initForm(): void {
    this.sendMessageForm = new FormGroup({
      message: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.authSrv.getUserId();
    //get the chatTypeQueryParam
    const getChatType: Subscription =
    this.activatedRoute
        .queryParams
        .pipe(
          map(res => res.chatType)
        )
        .subscribe(
          (res: string) => {
            this.chatType = res === 'subject' ? ChatCategory.SUBJECT_CHAT : ChatCategory.CLASS_CHAT;

            //Get the RoomId, which could either be subjectId or ClassId
            const getSocketId: Subscription =
            this.activatedRoute
                .params
                .pipe(
                  map(res => res.id)
                )
                .subscribe(
                  (res: string) => {
                    this.subjectId = res;
                    this.payload = {
                      SubjectId: this.subjectId,
                      UserId: this.userId,
                      ChatType:  this.chatType
                    };
                  }
                );
              this.subscriptionList.push(getSocketId);

              //Get all the messages when the user joins the room
              this.anonymousRouteSrv.userJoinsRoom(this.payload, (message: ChatMessageReMapAndRoomName) => {
              this.messages = message.Messages;
              this.messagesAsync$.next(this.messages);
              //Extract the Room name and save in an observable
              this.roomNameAsync$ = Observable.create((observer: Observer<string>) => {
                observer.next(message.RoomName);
                observer.complete();
              });
            });
          },
          (error) => {
            this.router.navigate(["/login"]);
          }
        );
    this.subscriptionList.push(getChatType);
  }

  ngAfterViewInit(): void {
    this.messageContainer.nativeElement?.scrollTo(0, this.messageContainer.nativeElement.scrollHeight);
  }

  handleInput(): void {
    this.anonymousRouteSrv.userIsTyping(this.payload, (data: string) => {
      this.temporaryMessage = data;
    });
    setTimeout(() => this.temporaryMessage = null, 10000);
  }

  submitForm(): void {
    if(this.sendMessageForm.invalid) {
      return;
    }
    const { message } = this.sendMessageForm.value;
    const chatPayload: ChatPayload = {
      ChatType: this.chatType,
      SocketId: this.subjectId,
      UserId: this.userId,
      Message: message
    };

    this.anonymousRouteSrv.sendMessage(chatPayload, (data: ChatMessageReMap) => {
      this.messages.push(data);
      this.messagesAsync$.next(this.messages);
      //Clear out the form for a new message
      this.sendMessageForm.reset();
      this.sendMessageForm.markAsPristine();
      //Play chime sound
      this.playAudio();
    });
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/piece-of-cake.mp3";
    audio.load();
    audio.play();
  }

  returnBgImage(url): string {
    return `background-image: url(${url})`;
  }

  ngOnDestroy(): void {
    this.anonymousRouteSrv.userLeftRoom(this.payload, (data: string) => {
      this.temporaryMessage = data;
    });
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
