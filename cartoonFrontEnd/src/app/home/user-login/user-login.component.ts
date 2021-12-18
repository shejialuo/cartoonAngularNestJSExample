import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isLogin = false;
  isNotError = true;
  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.sessionLogin().subscribe(
      result => {
        if(result) {
          this.isLogin = true;
        }
      }
    )
  }

  login() {
    if(this.loginFormGroup.valid) {
      const userName = this.loginFormGroup.get('userName')?.value;
      const userPassword = this.loginFormGroup.get('userPassword')?.value;
      this.loginFormGroup.get('userName')?.setValue('');
      this.loginFormGroup.get('userPassword')?.setValue('');
      this.authService.login(userName, userPassword).subscribe(
        result => {
          if(result.success) {
            this.authService.setSession(
              result.jwtToken
            );
            this.isLogin = true;
          } else {
            this.isLogin = false;
            this.isNotError = false;
          }
        }
      );
    }
  }

  logOut() {
    this.authService.logout();
    this.isLogin = false;
    this.isNotError = true;
  }
}
