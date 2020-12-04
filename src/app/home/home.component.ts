import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public constructor(private titleService: Title, private authService: AuthService, private router: Router) {
    this.titleService.setTitle('Home');
  }

  time = new Date();
  timer;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.time = null;
    this.timer = null;
  }

  navigate() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/main");
    } else {
      this.router.navigateByUrl("/auth");
    }
  }

}


