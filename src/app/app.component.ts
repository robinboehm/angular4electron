import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String;

  constructor() {
    var app = electron.remote.app;
    this.title = app.getAppPath();
    console.log(app.beiDerMachtVon());
    var platform = require('os').platform();
    console.log(platform);
  }
}