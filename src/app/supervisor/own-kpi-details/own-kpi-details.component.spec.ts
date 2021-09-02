import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnKpiDetailsComponent } from './own-kpi-details.component';

describe('OwnKpiDetailsComponent', () => {
  let component: OwnKpiDetailsComponent;
  let fixture: ComponentFixture<OwnKpiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnKpiDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnKpiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
