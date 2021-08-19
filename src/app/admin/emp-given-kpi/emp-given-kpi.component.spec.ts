import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpGivenKpiComponent } from './emp-given-kpi.component';

describe('EmpGivenKpiComponent', () => {
  let component: EmpGivenKpiComponent;
  let fixture: ComponentFixture<EmpGivenKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpGivenKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpGivenKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
