import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterSubchapterCreateComponent } from './course-chapter-subchapter-create.component';

describe('CourseChapterSubchapterCreateComponent', () => {
  let component: CourseChapterSubchapterCreateComponent;
  let fixture: ComponentFixture<CourseChapterSubchapterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterSubchapterCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterSubchapterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
