import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedCourseComponent } from './subscribed-course.component';

describe('SubscribedCourseComponent', () => {
  let component: SubscribedCourseComponent;
  let fixture: ComponentFixture<SubscribedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
