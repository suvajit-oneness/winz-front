import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterBookingThankyouComponent } from './chapter-booking-thankyou.component';

describe('ChapterBookingThankyouComponent', () => {
  let component: ChapterBookingThankyouComponent;
  let fixture: ComponentFixture<ChapterBookingThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterBookingThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterBookingThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
