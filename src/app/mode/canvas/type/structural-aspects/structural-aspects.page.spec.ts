import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StructuralAspectsPage } from './structural-aspects.page';

describe('StructuralAspectsPage', () => {
  let component: StructuralAspectsPage;
  let fixture: ComponentFixture<StructuralAspectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuralAspectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StructuralAspectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
