import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnKpiComponent } from './add-own-kpi.component';

describe('AddOwnKpiComponent', () => {
  let component: AddOwnKpiComponent;
  let fixture: ComponentFixture<AddOwnKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOwnKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOwnKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
