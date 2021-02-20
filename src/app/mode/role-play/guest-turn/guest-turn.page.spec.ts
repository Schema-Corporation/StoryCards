import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestTurnPage } from './guest-turn.page';

describe('GuestTurnPage', () => {
  let component: GuestTurnPage;
  let fixture: ComponentFixture<GuestTurnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTurnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestTurnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
