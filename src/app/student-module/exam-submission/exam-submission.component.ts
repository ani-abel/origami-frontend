import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
  HostListener
} from '@angular/core';
import { timer, Subscription, interval } from "rxjs";
import { take } from"rxjs/operators";
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { StudentService } from '../student.service';
import {
  Subject_Exam_Participation,
  Subject_Exam_Participation_Screenshot
} from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-exam-submission',
  templateUrl: './exam-submission.component.html',
  styleUrls: ['./exam-submission.component.css']
})
export class ExamSubmissionComponent implements
OnInit,
AfterViewInit,
OnDestroy {
  @Input() examId: string;
  @Input() allocatedTime: string;
  @ViewChild("submitBtn", { read: ElementRef }) submitBtn: ElementRef;
  @ViewChild("videoPlayer", { read: ElementRef }) videoPlayer: ElementRef;
  @Output() examSubmitted: EventEmitter<any> = new EventEmitter<any>();
  time: number;
  formattedTime: string;
  subscriptionList: Subscription[] = [];
  writeUp: any;
  localStream: any;
  examParticipationId: string;
  noOfTimesUserLeftPage: number = 0;

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService,
    private readonly studentSrv: StudentService
  ) { }

  ngOnInit(): void {
    //Get the student Participation Record
    const getExamParticipation: Subscription =
    this.studentSrv
        .getMyExamParticipation(this.examId)
        .subscribe(
          (response: Subject_Exam_Participation) => {
            this.examParticipationId = response.Id;
          },
          (error) => {
            //If no record was found
            //Register Student Participation in the Exam
            const registerExamParticipation: Subscription =
            this.studentSrv
                .registerExamParticipation(this.examId)
                .subscribe(
                  (participationResponse: Subject_Exam_Participation) => {
                    this.examParticipationId = participationResponse.Id;
                  }
                );

                this.subscriptionList.push(registerExamParticipation);
          }
        );
        this.subscriptionList.push(getExamParticipation);
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
            .saveScreenshotFromExam(dataURI, this.examParticipationId)
            .subscribe(
              (screenshotResponse: Subject_Exam_Participation_Screenshot) => {
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
        .submitExam(this.writeUp, this.examId)
        .subscribe(
          (response: boolean) => {
            if(response) {
              this.examSubmitted.emit(null);
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
