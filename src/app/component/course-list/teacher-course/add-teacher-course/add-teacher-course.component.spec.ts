import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherCourseComponent } from './add-teacher-course.component';

describe('AddTeacherCourseComponent', () => {
  let component: AddTeacherCourseComponent;
  let fixture: ComponentFixture<AddTeacherCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeacherCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
