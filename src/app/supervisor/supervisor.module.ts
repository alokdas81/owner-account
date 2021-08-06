import { EmployeeKpiDetailsComponent } from './employee-kpi-details/employee-kpi-details.component';
import { AddKpiComponent } from './add-kpi/add-kpi.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {FontAwesomeModule}from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeUnderComponent } from './employee-under/employee-under.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [

  {path:'dashboard/:id',component:DashboardComponent},
  { path: 'kpi/:id', component: AddKpiComponent},
  {path:'kpi_details/:emp_id',component:EmployeeKpiDetailsComponent}
];

@NgModule({
  declarations: [
    EmployeeUnderComponent,
    DashboardComponent,
    AddKpiComponent,
    EmployeeKpiDetailsComponent
  ],
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
export class SupervisorModule { }
