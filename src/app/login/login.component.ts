import { Component, OnInit } from '@angular/core';
import {FormsModule, NgModel, NgForm} from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';
import {Http, Response} from '@angular/http';
import { Routes, RouterModule, Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '';
  data: any[];
  url: string;

pass = '';

isValid = false;
constructor(public progressService: NgProgress, private http: Http, private router: Router) {
}
login(userForm: NgForm) {
  this.progressService.start();
    this.isValid = false;
  this.url = '/login?username=';
  this.url = this.url + userForm.value.name + '&password=' + userForm.value.pass;
  this.http.get(this.url).subscribe((res: Response) => {
    this.progressService.done();
    console.log(res);
  const user = res.json();
  if (user[0].username !== 'error' ) {
    localStorage.setItem('username', user[0].username);
    localStorage.setItem('id', user[0].uid);
    this.router.navigate(['/dashboard']);
  } else {
    this.isValid = true;
  }
  }    );
  }
  ngOnInit() {
  }

}
