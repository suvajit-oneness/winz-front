import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMemberShipComponent } from './user-member-ship.component';

describe('UserMemberShipComponent', () => {
  let component: UserMemberShipComponent;
  let fixture: ComponentFixture<UserMemberShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMemberShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMemberShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
