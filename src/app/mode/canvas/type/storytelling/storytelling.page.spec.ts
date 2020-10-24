import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StorytellingPage } from './storytelling.page';

describe('StorytellingPage', () => {
  let component: StorytellingPage;
  let fixture: ComponentFixture<StorytellingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorytellingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StorytellingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
