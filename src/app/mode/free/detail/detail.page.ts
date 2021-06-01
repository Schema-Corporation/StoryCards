import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, AfterViewInit {

  public mainImg = true;
  public idCard = 0;
  public card;
  public cards: any;
  public description;
  public cardToggle
  public flip
  public rotate;
  public shouldBeRotate: number;
  public rotat;
  public process;

  public showRight: boolean = false;
  public showLeft: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public location: Location
  ) { }

  showInfo(){
    this.flip = document.querySelector("[name='flip']");
    this.flip.classList.toggle("flipped")
  }

  showRotate() {
    this.rotat = document.querySelector("[name='rotat']");
    this.rotat.classList.toggle("rotated");
  }

  showCardRight(){
    if (this.idCard >= 0 && this.idCard < (this.cards.length - 2)) {
      this.idCard +=1;
      this.card = this.cards[this.idCard].imgCard;
      this.showSequence();
    }
  }

  showCardLeft(){
    if (this.idCard > 0) {
      this.idCard -=1;
      this.card = this.cards[this.idCard].imgCard;
      this.showSequence();
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.card = params["card"];
      this.description = params["description"];
      this.rotate = params["rotate"];
      this.shouldBeRotate = params["rotated"];
      this.process = params["process"];
      this.cards = JSON.parse(params["cards"]);
    });
    this.location.replaceState('/free/detail');
  }

  ngAfterViewInit() {

    if (this.shouldBeRotate == 1) {
      this.showRotate();
    }

    if (this.process == 1) {
      this.card = this.cards[this.idCard].imgCard;
      this.showSequence();
    }
    
  }

  showSequence() {
    this.showRight = (this.idCard >= 0 && this.idCard < (this.cards.length - 2));
    this.showLeft = (this.idCard > 0);
  }
}
