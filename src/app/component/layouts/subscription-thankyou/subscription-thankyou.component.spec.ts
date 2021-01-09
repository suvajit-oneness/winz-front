import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionThankyouComponent } from './subscription-thankyou.component';

describe('SubscriptionThankyouComponent', () => {
  let component: SubscriptionThankyouComponent;
  let fixture: ComponentFixture<SubscriptionThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
