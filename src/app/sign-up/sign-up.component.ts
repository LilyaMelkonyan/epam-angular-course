import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';
import { UUID } from 'angular2-uuid';
import { IuserInfo } from '../interfaces/iuserInfo';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  user?: IuserInfo;
  submitted: boolean = false;
  errMsg: string = '';
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const logedInUser = this.localStorage.get('logged-in');
    if (logedInUser) {
      this.router.navigate(['/home']);
    }
    this.buildForm()
  }

  buildForm(){
    this.form = this.fb.group({
            id: [`usr:${UUID.UUID()}`],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() { return this.form.controls } //access to form fields

  onSubmit() {
    console.log(this.form);
    this.submitted = true;
    const signUpUsers = this.localStorage.get('users');
    this.user = this.form.value;
    if (!this.user) {
      return;
    }
    
    if (!signUpUsers) {
      this.localStorage.set('users', JSON.stringify({[this.user.email]: this.user}));
    }else{
      const users = JSON.parse(signUpUsers);
      if (users[this.user.email]) {
        this.errMsg = "This email already taken!";
        setTimeout(() => {
          this.errMsg = '';
          this.submitted = false;
        }, 2500);
        return;
      }
      users[this.user.email] = this.user;
      this.localStorage.set('users', JSON.stringify(users));
    } 
    this.successMsg = 'Congratulations, your account has been successfully created.';
    setTimeout(() => this.router.navigate(['/sign-in']), 2000);
  }
}
