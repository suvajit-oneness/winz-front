import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipBookingThankyouComponent } from './member-ship-booking-thankyou.component';

describe('MemberShipBookingThankyouComponent', () => {
  let component: MemberShipBookingThankyouComponent;
  let fixture: ComponentFixture<MemberShipBookingThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberShipBookingThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberShipBookingThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
