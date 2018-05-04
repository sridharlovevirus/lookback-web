import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {Http, Response} from '@angular/http';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    const url = '/signout';
    if (localStorage.getItem('username') && localStorage.getItem('id')) {
      localStorage.removeItem('username');
      localStorage.removeItem('id');
        }
      this.http.get(url).subscribe((res: Response) => {
        this.router.navigate(['/']);
      });
  }
  }


