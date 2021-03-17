import { Component, OnInit } from '@angular/core';
import { LoginGQL } from './services/origamiGraphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hideSpinner: boolean = false;
  title = 'origami-frontend';

  constructor(private loginService: LoginGQL){ }

  ngOnInit() {
    setTimeout(() => this.hideSpinner = true, 3000);
  }
}
