import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Options } from 'ng5-slider';
import {trigger, state, style, transition, animate, group, query, animateChild, sequence} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DotModel } from './dot.model';
import {DotService} from './dot.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('dotResultRowAnim', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-350px)', 'box-shadow': 'none' }),
        sequence([
          animate('0.25s ease', style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate('0.25s ease', style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ]),
    trigger('dotAnim', [
      transition('void => *', [
        style( { height: '*', opacity: '0'}),
        sequence([
          animate('0.25s ease', style( { height: '*', opacity: 1 }))
        ])
      ])
    ])
  ]
})
export class MainComponent implements OnInit {

  dotForm: FormGroup;
  dotModel: DotModel;
  dots: DotModel[];

  @ViewChild('svg') elementSvg: ElementRef;

  public constructor(private titleService: Title, private formBuilder: FormBuilder,
                     private dotService: DotService, private router: Router, private authService: AuthService)
  {
    this.titleService.setTitle('Main');
    this.dotForm = this.formBuilder.group({
      x: [0, [ Validators.required ]],
      y: [0, [ Validators.required ]],
      r: [0.5, [ Validators.required ]]
    });

    this.dotModel = {
      x: 0,
      y: 0,
      r: 0,
      result: false,
      time: ''
    }
  }

  ngOnInit() {
    this.dotService.getAllDots().subscribe(dotArray => {
      this.dots = dotArray;
    });
  }

  addDot() {
    this.dotModel.x = this.dotForm.get('x').value;
    this.dotModel.y = this.dotForm.get('y').value;
    this.dotModel.r = this.dotForm.get('r').value;

    this.dotService.addDot(this.dotModel).subscribe( data => {
      console.log("Dot added");
      this.dots.push(data);
    }, error => {
      console.log("Failure! Dot wasn't added");
    });
  }

  clickDot(event: MouseEvent) {
    let width = this.elementSvg.nativeElement.offsetWidth;

    let x = event.offsetX;
    let y = event.offsetY;
    let r = this.dotForm.get('r').value;

    this.dotModel.x = (x - width / 2) / (width * 0.35) * r;
    this.dotModel.y = -1 * (y - width / 2) / (width * 0.35) * r;
    this.dotModel.r = r;

    console.log('x ' + this.dotModel.x);
    console.log('y ' + this.dotModel.y);

    this.dotService.addDot(this.dotModel).subscribe( data => {
      console.log("Dot added");
      this.dots.push(data);
    }, error => {
      console.log("Failure! Dot wasn't added");
    });
  }

  logout() {
    this.authService.logout();
    console.log("User logout");
    this.router.navigateByUrl("/auth")
  }

  // Options for sliders
  optionsXY: Options = {
    showTicks: true,
    floor: -4,
    ceil: 4,
    step: 0.5
  };

  optionsR: Options = {
    showTicks: true,
    floor: 0.5,
    ceil: 3,
    step: 0.5
  };

}
