import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainLocationComponent } from './main-location.component';

describe('MainLocationComponent', () => {
  let component: MainLocationComponent;
  let fixture: ComponentFixture<MainLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLocationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
