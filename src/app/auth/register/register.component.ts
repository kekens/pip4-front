import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '../auth.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  authModel: AuthModel;
  isInvalid: boolean;
  isUsernameFree: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {

    this.registerForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('^[a-z]+$') ]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[^а-я]+') ]]
    });

    this.authModel = {
      username: '',
      password: ''
    };
  }

  setValid(): boolean {
    this.isInvalid = (this.registerForm.controls['username'].invalid && this.registerForm.controls['username'].touched) ||
      (this.registerForm.controls['password'].invalid && this.registerForm.controls['password'].touched);
    return this.isInvalid;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authModel.username = this.registerForm.get('username').value;
      this.authModel.password = this.registerForm.get('password').value;

      this.authService.register(this.authModel).subscribe(data => {
        console.log("register success");
        window.location.reload();
      }, error => {
        this.isUsernameFree = false;
        this.registerForm.controls['username'].setErrors({ 'invalid': true });
        this.registerForm.controls['username'].markAsUntouched();
        this.registerForm.controls['password'].markAsUntouched();
        console.log(error)
        console.log("register failed")
      });
    } else {
      console.log('invalid form');
      this.isInvalid = true;
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    const signUpButton = document.getElementById('sign-up-transition');
    const signInButton = document.getElementById('sign-in-transition');
    const container = document.getElementById('container-sign-up');

    signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
    signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));
  }

}
