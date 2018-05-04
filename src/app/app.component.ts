import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(public progressService: NgProgress) {
setTimeout((pro: NgProgress) => {
  this.pro.done();
}, 3000);
}
ngOnInit() {
	 this.progressService.start();
  }
}
