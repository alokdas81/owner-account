import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeKpiComponent } from './employee-kpi.component';

describe('EmployeeKpiComponent', () => {
  let component: EmployeeKpiComponent;
  let fixture: ComponentFixture<EmployeeKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
