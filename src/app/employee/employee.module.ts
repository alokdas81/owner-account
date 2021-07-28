import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeKpiComponent } from './employee-kpi/employee-kpi.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {FontAwesomeModule}from '@fortawesome/angular-fontawesome';



const routes: Routes = [
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'kpi/:id', component: EmployeeKpiComponent },
  {path:'login',component:LoginComponent}
];

@NgModule({
  declarations: [DashboardComponent, EmployeeKpiComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,


  ],
  exports: [RouterModule],
})
export class EmployeeModule {}
