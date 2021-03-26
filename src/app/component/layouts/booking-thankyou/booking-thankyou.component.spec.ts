import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingThankyouComponent } from './booking-thankyou.component';

describe('BookingThankyouComponent', () => {
  let component: BookingThankyouComponent;
  let fixture: ComponentFixture<BookingThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
