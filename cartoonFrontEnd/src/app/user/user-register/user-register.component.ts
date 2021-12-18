import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map, first } from 'rxjs';
import { EmailCode } from '../email.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  checkNumTrue = false;
  content = '欢迎您来到Cartoon的世界。';
  step1 = '请填写您的相关信息';
  step2 = '进行邮箱验证';
  user = new User('', '', '');
  passwordFormGroup: FormGroup;
  emailCodeFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.passwordFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)], this.userNameValidators],
      userPrePassword: ['', [Validators.required, Validators.minLength(6)]],
      userPostPassword: ['', [Validators.required, this.passwordValidators]],
    });
    this.emailCodeFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      checkCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  passwordValidators: ValidatorFn = (control: AbstractControl) => {
    const userPostPassword = control.value
    const userPrePassword = control.parent?.value.userPrePassword;
    return userPrePassword != userPostPassword ? {isNotSame: true} : null;
  }

  userNameValidators: AsyncValidatorFn = (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => {
        return this.userService.checkName(control.value);
      }),
      map(result => result ? {isSame: true}: null),
      first(),
    )
  }
  
  checkCode() {
    const emailAddress = this.emailCodeFormGroup.get('email')?.value;
    const emailCheckCode = this.emailCodeFormGroup.get('checkCode')?.value;
    const emailCode = new EmailCode(emailAddress, emailCheckCode);
    this.userService.checkEmailCode(emailCode).subscribe(
      result => this.checkNumTrue = result
    )
  }

  emailSend(){
    let emailAddress = this.emailCodeFormGroup.get('email')?.value;

    this.userService.email(emailAddress).subscribe();
  }

  formSubmit1() {
    if(this.passwordFormGroup.valid) {
      this.user.userName = this.passwordFormGroup.get('userName')?.value;
      this.user.userPassword = this.passwordFormGroup.get('userPrePassword')?.value;
    }   
  }

  addUser() {
    this.user.userEmail = this.emailCodeFormGroup.get('email')?.value;
    this.userService.addUser(this.user).subscribe();
  }
}
