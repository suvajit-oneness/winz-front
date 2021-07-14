import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherCourseComponent } from './edit-teacher-course.component';

describe('EditTeacherCourseComponent', () => {
  let component: EditTeacherCourseComponent;
  let fixture: ComponentFixture<EditTeacherCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeacherCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
