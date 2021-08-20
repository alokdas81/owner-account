import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageKpiComponent } from './average-kpi.component';

describe('AverageKpiComponent', () => {
  let component: AverageKpiComponent;
  let fixture: ComponentFixture<AverageKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
