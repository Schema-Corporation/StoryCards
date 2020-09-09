import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {

  public step:number = 1;

  constructor() { }

  ngOnInit() {
  }
  addStep(){
    this.step++
    
  }

}
