import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,) { }

  ngOnInit(): void {}

  logout(){
    this.localStorage.remove('logged-in');
    this.router.navigate(['/sign-in']);
  }
}
