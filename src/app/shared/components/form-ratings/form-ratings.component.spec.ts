import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRatingsComponent } from './form-ratings.component';

describe('FormRatingsComponent', () => {
  let component: FormRatingsComponent;
  let fixture: ComponentFixture<FormRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRatingsComponent]
    });
    fixture = TestBed.createComponent(FormRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
