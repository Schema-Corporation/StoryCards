import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AudiencePage } from './audience.page';

describe('AudiencePage', () => {
  let component: AudiencePage;
  let fixture: ComponentFixture<AudiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AudiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
