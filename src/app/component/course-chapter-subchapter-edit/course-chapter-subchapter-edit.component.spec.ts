import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterSubchapterEditComponent } from './course-chapter-subchapter-edit.component';

describe('CourseChapterSubchapterEditComponent', () => {
  let component: CourseChapterSubchapterEditComponent;
  let fixture: ComponentFixture<CourseChapterSubchapterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterSubchapterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterSubchapterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
