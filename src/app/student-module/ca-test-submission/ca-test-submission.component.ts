import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit
} from '@angular/core';
import {
  Subscription,
  interval,
  timer
} from "rxjs";
import { take } from "rxjs/operators";
import {
  AllocatedTimeInterval,
  Subject_Ca_Participation_Screenshot,
  Subject_Ca_Participation
} from '../../services/origamiGraphql.service';
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-ca-test-submission',
  templateUrl: './ca-test-submission.component.html',
  styleUrls: ['./ca-test-submission.component.css']
})
export class CaTestSubmissionComponent implements
OnInit,
AfterViewInit {
  @Input() caTestId: string;
  @Input() allocatedTime: AllocatedTimeInterval | string;
  @Output() caTestSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("submitBtn", { read: ElementRef }) submitBtn: ElementRef;
  @ViewChild("videoPlayer", { read: ElementRef }) videoPlayer: ElementRef;
  time: number;
  formattedTime: string;
  subscriptionList: Subscription[] = [];
  writeUp: any;
  localStream: any;
  caTestParticipationId: string;
  noOfTimesUserLeftPage: number = 0;

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly studentSrv: StudentService
  ) { }

  ngOnInit(): void {
    //Get the student Participation Record
    const getCATestParticipation: Subscription =
    this.studentSrv
        .getMyCATestParticipation(this.caTestId)
        .subscribe(
          (response: Subject_Ca_Participation) => {
            this.caTestParticipationId = response.Id;
          },
          (error) => {
            //If no record was found
            //Register Student Participation in the Exam
            const registerCATestParticipation: Subscription =
            this.studentSrv
                .registerCATestParticipation(this.caTestId)
                .subscribe(
                  (participationResponse: Subject_Ca_Participation) => {
                    this.caTestParticipationId = participationResponse.Id;
                  }
                );

                this.subscriptionList.push(registerCATestParticipation);
          }
        );
        this.subscriptionList.push(getCATestParticipation);
  }

  async ngAfterViewInit(): Promise<void> {
    //Startup WebRTC
    await this.startUpWebRTC();

    this.time = this.sharedUtilitySrv.convertAllocatedTimeIntervalsToSeconds(this.allocatedTime);
    //Start up the countdown timer
    const timerSubsciption: Subscription =
    timer(0, this.time).subscribe(ellapsedCycles => {
      this.time--;
      if(this.time >= 0) {
        this.formattedTime = this.sharedUtilitySrv.convertToTimeString(this.time);
      }
      else {
        //Trigger Submit when time is up
        this.submitBtn.nativeElement.click();
      }
    });
    this.subscriptionList.push(timerSubsciption);

    const twentyFiveSecondInterval: Subscription =
    interval(25000)//25 seconds
      .pipe(take(this.time))
      .subscribe(response => {
        //Take Images here
        const dataURI: string = this.takePictureFromWebRTCStream();

        //Send the dataURL to the backend
        const sendScreenShot: Subscription =
        this.studentSrv
            .saveScreenshotFromCATest(dataURI, this.caTestParticipationId)
            .subscribe(
              (screenshotResponse: Subject_Ca_Participation_Screenshot) => {
                //console.log(screenshotResponse.Url);
              }
            );
        this.subscriptionList.push(sendScreenShot);
      });

    this.subscriptionList.push(twentyFiveSecondInterval);
  }

  async startUpWebRTC(): Promise<void> {
    //Get the media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    this.videoPlayer.nativeElement.srcObject = stream;
    this.videoPlayer.nativeElement.play();
    this.localStream = stream;
  }

  handleInput(event: Event) {
    this.writeUp = event;
  }

  submitForm(): void {
    if(!this.writeUp) {
      this.writeUp = "NO SUBMISSION";
    }
    this.studentSrv
        .submitCaTest(this.writeUp, this.caTestId)
        .subscribe(
          (response: boolean) => {
            if(response) {
              this.caTestSubmitted.emit(null);
            }
          }
        );
  }

  takePictureFromWebRTCStream(): string {
    const canvasElement: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);
    const context = canvasElement.getContext("2d");

    //set the width and height of the canvas
    if(context) {
      canvasElement.width =  600;
      canvasElement.height = 400;

      //draw an image of the video in the canvas
      //This line basically sets the canvas to the exact moment in the video stram when the photo was taken
      context.drawImage(this.videoPlayer.nativeElement, 0, 0, canvasElement.width, canvasElement.height);

      //create an image from the canvas: <img src="" /> fits the moment captured by the context.drawImage()
      const imageUrl = canvasElement.toDataURL("image/png");

      return imageUrl;
    }
  }

  @HostListener("document:visibilitychange", ["$event"])
  visibilitychange(): void {
    if (document.hidden){
      this.noOfTimesUserLeftPage++;
    }
    if(this.noOfTimesUserLeftPage === 1) {
      const message: string = "If you leave the page one more time, You'll forfeit the exam";
      this.sharedUtilitySrv.returnErrorMessage(message);
    }
    if(this.noOfTimesUserLeftPage >= 2) {
      //Submit the exam
      this.submitForm();
    }
  }

  ngOnDestroy(): void {
    //Stop WebRTC
    this.localStream.getTracks()[0].stop();
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
