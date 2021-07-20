import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterSubchapterListComponent } from './course-chapter-subchapter-list.component';

describe('CourseChapterSubchapterListComponent', () => {
  let component: CourseChapterSubchapterListComponent;
  let fixture: ComponentFixture<CourseChapterSubchapterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterSubchapterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterSubchapterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
