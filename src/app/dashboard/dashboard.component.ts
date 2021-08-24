import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';
import { IuserInfo } from '../interfaces/iuserInfo';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!:IuserInfo;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,) { }

  ngOnInit(): void {
    let users:any = this.localStorage.get('users');
    let email:any = this.localStorage.get('logged-user-email');
    if (users !== null && email !== null) {
      users = JSON.parse(users);
      email = JSON.parse(email);

      this.user = users[email]
    }
  }

  logout(){
    this.localStorage.remove('logged-user-email');
    this.router.navigate(['/sign-in']);
  }
}
