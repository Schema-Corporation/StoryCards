import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingGuestPage } from './waiting-guest.page';

describe('WaitingGuestPage', () => {
  let component: WaitingGuestPage;
  let fixture: ComponentFixture<WaitingGuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingGuestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingGuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
