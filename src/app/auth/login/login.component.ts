import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AuthModel} from '../auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authModel: AuthModel;
  isInvalid: boolean;
  isUserExist: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('^[a-z]+$') ]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[^а-я]+') ]]
    });

    this.authModel = {
      username: '',
      password: ''
    };
  }

  setValid(): boolean {
    this.isInvalid = (this.loginForm.controls['username'].invalid && this.loginForm.controls['username'].touched) ||
                    (this.loginForm.controls['password'].invalid && this.loginForm.controls['password'].touched);
    return this.isInvalid;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authModel.username = this.loginForm.get('username').value;
      this.authModel.password = this.loginForm.get('password').value;

      this.authService.login(this.authModel).subscribe(data => {
        if (data) {
          console.log("login successful");
          this.router.navigateByUrl('/main');
        } else {
          this.isUserExist = false;
          this.loginForm.controls['username'].setErrors({ 'invalid': true });
          this.loginForm.controls['username'].markAsUntouched();
          this.loginForm.controls['password'].markAsUntouched();
          console.log("login failed");
        }
      });
    } else {
      console.log('invalid form');
      this.isInvalid = true;
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    const signUpButton = document.getElementById('sign-up-transition');
    const signInButton = document.getElementById('sign-in-transition');
    const container = document.getElementById('container-sign-in');

    signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
    signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));
  }

}
