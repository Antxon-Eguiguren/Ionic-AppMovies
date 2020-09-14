import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlideShowParesComponent } from './slide-show-pares.component';

describe('SlideShowParesComponent', () => {
  let component: SlideShowParesComponent;
  let fixture: ComponentFixture<SlideShowParesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideShowParesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideShowParesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
