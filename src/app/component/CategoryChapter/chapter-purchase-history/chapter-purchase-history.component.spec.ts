import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterPurchaseHistoryComponent } from './chapter-purchase-history.component';

describe('ChapterPurchaseHistoryComponent', () => {
  let component: ChapterPurchaseHistoryComponent;
  let fixture: ComponentFixture<ChapterPurchaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterPurchaseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
