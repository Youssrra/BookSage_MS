import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAuthorsComponent } from './display-authors.component';

describe('DisplayAuthorsComponent', () => {
  let component: DisplayAuthorsComponent;
  let fixture: ComponentFixture<DisplayAuthorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayAuthorsComponent]
    });
    fixture = TestBed.createComponent(DisplayAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
