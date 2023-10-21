import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMyReviewsComponent } from './display-my-reviews.component';

describe('DisplayMyReviewsComponent', () => {
  let component: DisplayMyReviewsComponent;
  let fixture: ComponentFixture<DisplayMyReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMyReviewsComponent]
    });
    fixture = TestBed.createComponent(DisplayMyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
