import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingGamePage } from './waiting-game.page';

describe('WaitingGamePage', () => {
  let component: WaitingGamePage;
  let fixture: ComponentFixture<WaitingGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
