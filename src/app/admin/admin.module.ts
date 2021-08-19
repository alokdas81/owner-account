import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeInfoComponent } from './employee-details/employee-info/employee-info.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeKpiDetailsComponent } from './employee-kpi-details/employee-kpi-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {FontAwesomeModule}from '@fortawesome/angular-fontawesome';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { SupGivenKpiComponent } from './sup-given-kpi/sup-given-kpi.component';
import { EmpGivenKpiComponent } from './emp-given-kpi/emp-given-kpi.component';


export interface Admin {
  emp_id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  status: string;
  sup_id: number;
  roll: number;
}

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeInfoComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    EmployeeDeleteComponent,
    EmployeeKpiDetailsComponent,
    AdminDashboardComponent,
    SupGivenKpiComponent,
    EmpGivenKpiComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ShowHidePasswordModule

  ],
  exports: [EmployeeListComponent, EmployeeDetailsComponent],
})
export class AdminModule {}
