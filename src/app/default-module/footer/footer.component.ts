import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <mat-divider></mat-divider>
    <footer>&copy; All rights reserved {{ today | date : 'y' }}</footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
