import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeKpiDetailsComponent } from './employee-kpi-details.component';

describe('EmployeeKpiDetailsComponent', () => {
  let component: EmployeeKpiDetailsComponent;
  let fixture: ComponentFixture<EmployeeKpiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeKpiDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeKpiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
