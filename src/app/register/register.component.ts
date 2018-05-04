import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import {Http, Response} from '@angular/http';
import {FormsModule, NgModel, NgForm} from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  url: string;
  err: string;
  isValid = false;
  userValid = false;
  url1: string;
  url2: string;
    constructor(public progressService: NgProgress, private http: Http, private router: Router) {
  }
  reg(regForm: NgForm) {
    this.progressService.start();
    this.url1 = '/createuser?username=';
    this.url1 = this.url1 + regForm.value.username;

    this.url2 = this.url1 + '&password=' + regForm.value.password;
    if ( regForm.value.password === regForm.value.password1) {
    this.http.get(this.url2).subscribe((res: Response) => {
      this.progressService.done();
      this.progressService.done();
      this.isValid = true;
      const user = res.json();
      console.log(user[0].usercreation);
      if ( user[0].usercreation === 'done') {
        this.isValid = true;
setTimeout((router: Router) => {
  this.router.navigate(['/']);
}, 5000);
      } else {
        this.isValid = false;
        this.userValid = true;
        this.err = user[0].usercreation;
      }
      });
    } else {
      this.userValid = true;
this.err = 'Confirm password not match';
    }
  }
  ngOnInit() {
    if (localStorage.getItem('username') && localStorage.getItem('id')) {
      this.router.navigate(['/dashboard']);
    }
  }

}
