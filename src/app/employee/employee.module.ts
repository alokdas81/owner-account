import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeKpiComponent } from './employee-kpi/employee-kpi.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {FontAwesomeModule}from '@fortawesome/angular-fontawesome';
import { KpiDetailsComponent } from './kpi-details/kpi-details.component';

import { FlexLayoutModule } from '@angular/flex-layout';




const routes: Routes = [
  { path: 'dashboard/:id', component: DashboardComponent },
];

@NgModule({
  declarations: [DashboardComponent, EmployeeKpiComponent, LoginComponent, KpiDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FlexLayoutModule


  ],
  exports: [RouterModule],
})
export class EmployeeModule {}
