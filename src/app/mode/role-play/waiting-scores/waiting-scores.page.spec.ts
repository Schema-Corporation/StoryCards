import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingScoresPage } from './waiting-scores.page';

describe('WaitingScoresPage', () => {
  let component: WaitingScoresPage;
  let fixture: ComponentFixture<WaitingScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingScoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
