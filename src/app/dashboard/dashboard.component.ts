import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import {FormsModule, NgModel, NgForm} from '@angular/forms';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url: string;
   img: string[] = [];
    desc: string[] = [];
  username = localStorage.getItem('username');
  constructor(private router: Router, public progressService: NgProgress, private http: Http) { }

  ngOnInit() {
    this.progressService.start();
    if (!localStorage.getItem('username') && !localStorage.getItem('id')) {
      this.router.navigate(['/']);
    } else {
      this.url = '/posts';
      this.http.get(this.url).subscribe((res: Response) => {
        const user = res.json();
        for (let i = 0; i < user.length; i++) {
          this.img[i] = user[i].img;
          this.desc[i] = user[i].desc;
        }
      } );
    }
    this.progressService.done();
  }

}
