import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(public progressService: NgProgress) {
	this.progressService.done();
}
ngOnInit() {
	 this.progressService.start();
  }
}
