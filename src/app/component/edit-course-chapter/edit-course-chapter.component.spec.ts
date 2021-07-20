import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseChapterComponent } from './edit-course-chapter.component';

describe('EditCourseChapterComponent', () => {
  let component: EditCourseChapterComponent;
  let fixture: ComponentFixture<EditCourseChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
