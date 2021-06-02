import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryChapterComponent } from './edit-category-chapter.component';

describe('EditCategoryChapterComponent', () => {
  let component: EditCategoryChapterComponent;
  let fixture: ComponentFixture<EditCategoryChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
