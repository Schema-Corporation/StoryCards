import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApproveChallengesPage } from './approve-challenges.page';

describe('ApproveChallengesPage', () => {
  let component: ApproveChallengesPage;
  let fixture: ComponentFixture<ApproveChallengesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveChallengesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveChallengesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
