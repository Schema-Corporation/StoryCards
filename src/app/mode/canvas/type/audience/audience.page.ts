import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.page.html',
  styleUrls: ['./audience.page.scss'],
})
export class AudiencePage implements OnInit {

  public step: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
