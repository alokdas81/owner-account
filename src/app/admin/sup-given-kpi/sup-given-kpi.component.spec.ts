import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupGivenKpiComponent } from './sup-given-kpi.component';

describe('SupGivenKpiComponent', () => {
  let component: SupGivenKpiComponent;
  let fixture: ComponentFixture<SupGivenKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupGivenKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupGivenKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
