import { AuthGuard } from 'src/app/auth.guard';
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
import { OwnDetailsComponent } from './own-details/own-details.component';




const routes: Routes = [
  { path: 'dashboard/:id',canActivate:[AuthGuard], component: DashboardComponent },
  {path:'add/:id',canActivate:[AuthGuard],component:EmployeeKpiComponent},
  {path:'ownDetails/:emp_id',canActivate:[AuthGuard],component:OwnDetailsComponent}
];

@NgModule({
  declarations: [DashboardComponent, EmployeeKpiComponent, LoginComponent, KpiDetailsComponent, OwnDetailsComponent],
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
