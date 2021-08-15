import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/storage.service';
import { IuserInfo } from '../../interfaces/iuserInfo';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  users?: {[key: string] : IuserInfo};
  submitted: boolean = false;
  errMsg: string = '';
  successMsg: string = '';

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {  
    const users = this.localStorage.get('users'); 
    const logedInUser = this.localStorage.get('logged-user-email');

    if (!logedInUser) {
      if (users) {
        this.users = JSON.parse(users);
      }else{
        this.router.navigate(['/sign-up'])
      }
    }else {
      this.router.navigate(['/home'])
    }
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      this.errMsg = "Please fill all fields!";
      setTimeout(() => {
        this.errMsg = '';
        this.submitted = false;
      }, 2500);
      return;
    }

    const userInfo = this.form.value;

    if (this.users) {
      if (this.users[userInfo.email] && this.users[userInfo.email].password === userInfo.password){
        this.localStorage.set('logged-user-email', JSON.stringify(userInfo.email));
        this.router.navigate(['/home']);
      }else{
        this.errMsg = "Please sign up at first!";
        setTimeout(() => {
          this.errMsg = '';
          this.submitted = false;
        }, 2500);
      }
    }else{
      this.errMsg = "Something went wrong!";
    }   
  }
}
