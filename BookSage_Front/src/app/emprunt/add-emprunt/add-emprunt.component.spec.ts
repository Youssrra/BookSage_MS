import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpruntComponent } from './add-emprunt.component';

describe('AddEmpruntComponent', () => {
  let component: AddEmpruntComponent;
  let fixture: ComponentFixture<AddEmpruntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmpruntComponent]
    });
    fixture = TestBed.createComponent(AddEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
