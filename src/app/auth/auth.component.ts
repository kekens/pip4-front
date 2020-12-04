import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public constructor(private titleService: Title) {
    this.titleService.setTitle('Authentication');
  }

  ngOnInit(): void {
    const signUpButton = document.getElementById('sign-up-transition');
    const signInButton = document.getElementById('sign-in-transition');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
    signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));
  }

}
