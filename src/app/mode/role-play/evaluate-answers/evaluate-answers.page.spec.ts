import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvaluateAnswersPage } from './evaluate-answers.page';

describe('EvaluateAnswersPage', () => {
  let component: EvaluateAnswersPage;
  let fixture: ComponentFixture<EvaluateAnswersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateAnswersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluateAnswersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
