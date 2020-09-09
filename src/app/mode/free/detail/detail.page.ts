import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public mainImg = true;
  public idCard
  public card
  public description
  public cardToggle
  public flip
  constructor(
    private route: ActivatedRoute
  ) { }

  showInfo(){
    this.flip = document.querySelector("[name='flip']");
    this.flip.classList.toggle("flipped")
    
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.card = params["card"];
      this.description = params["description"];
      console.log(this.description)
  });
  }
}
