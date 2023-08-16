import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarDetailsComponent]
    });
    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
