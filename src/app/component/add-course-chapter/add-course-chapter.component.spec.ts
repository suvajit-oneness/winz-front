import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseChapterComponent } from './add-course-chapter.component';

describe('AddCourseChapterComponent', () => {
  let component: AddCourseChapterComponent;
  let fixture: ComponentFixture<AddCourseChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
