import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnDetailsComponent } from './own-details.component';

describe('OwnDetailsComponent', () => {
  let component: OwnDetailsComponent;
  let fixture: ComponentFixture<OwnDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
