import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChapterComponent } from './category-chapter.component';

describe('CategoryChapterComponent', () => {
  let component: CategoryChapterComponent;
  let fixture: ComponentFixture<CategoryChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
