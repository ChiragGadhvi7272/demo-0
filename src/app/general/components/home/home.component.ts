import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public router: Router) {}
  faCopyright = faCopyright;
  sideNavStatus: boolean = false;
  ngOnInit(): void {}
  copyrights: string = `${environment.copyrights}`;
}
