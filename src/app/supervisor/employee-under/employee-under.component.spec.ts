import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUnderComponent } from './employee-under.component';

describe('EmployeeUnderComponent', () => {
  let component: EmployeeUnderComponent;
  let fixture: ComponentFixture<EmployeeUnderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUnderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUnderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
