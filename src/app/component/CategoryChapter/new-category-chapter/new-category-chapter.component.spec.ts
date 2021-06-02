import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryChapterComponent } from './new-category-chapter.component';

describe('NewCategoryChapterComponent', () => {
  let component: NewCategoryChapterComponent;
  let fixture: ComponentFixture<NewCategoryChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategoryChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoryChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
