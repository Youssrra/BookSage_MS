import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEmpruntComponent } from './display-emprunt.component';

describe('DisplayEmpruntComponent', () => {
  let component: DisplayEmpruntComponent;
  let fixture: ComponentFixture<DisplayEmpruntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayEmpruntComponent]
    });
    fixture = TestBed.createComponent(DisplayEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
