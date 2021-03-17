import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upcoming-event-date',
  templateUrl: './upcoming-event-date.component.html',
  styleUrls: ['./upcoming-event-date.component.css']
})
export class UpcomingEventDateComponent implements OnInit {
  @Input() eventStartDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
