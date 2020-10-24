import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCanvasPage } from './add-canvas.page';

describe('AddCanvasPage', () => {
  let component: AddCanvasPage;
  let fixture: ComponentFixture<AddCanvasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCanvasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCanvasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
