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
import { AddOwnKpiComponent } from './add-own-kpi/add-own-kpi.component';
import { OwnKpiDetailsComponent } from './own-kpi-details/own-kpi-details.component';
import { AuthGuard } from 'src/app/auth.guard';
import { OwnDetailsComponent } from './own-details/own-details.component';




const routes: Routes = [

  {path:'dashboard/:id',component:DashboardComponent},
  { path: 'kpi/:id', component: AddKpiComponent},
  {path:'kpi_details/:emp_id',component:EmployeeKpiDetailsComponent},
  {path:'add/:id',canActivate:[AuthGuard],component:AddOwnKpiComponent},
  {path:'ownKpiDetails/:emp_id',canActivate:[AuthGuard],component:OwnKpiDetailsComponent},
  {path:'ownDetails/:emp_id',canActivate:[AuthGuard],component:OwnDetailsComponent},
];

@NgModule({
  declarations: [
    EmployeeUnderComponent,
    DashboardComponent,
    AddKpiComponent,
    EmployeeKpiDetailsComponent,
    AddOwnKpiComponent,
    OwnKpiDetailsComponent,
    OwnDetailsComponent
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
