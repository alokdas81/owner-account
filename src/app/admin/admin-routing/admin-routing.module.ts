import { EmployeeDeleteComponent } from './../employee-delete/employee-delete.component';
import { EmployeeUpdateComponent } from './../employee-update/employee-update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { AuthGuard } from 'src/app/auth.guard';
import { EmployeeKpiDetailsComponent } from '../employee-kpi-details/employee-kpi-details.component';


const routes: Routes = [
  { path: 'admin',canActivate:[AuthGuard], component: EmployeeListComponent },
  { path: 'details/:emp_id',canActivate:[AuthGuard], component: EmployeeDetailsComponent },
  { path: 'kpi_details/:emp_id',canActivate:[AuthGuard], component: EmployeeKpiDetailsComponent },
  { path: 'delete/:emp_id',canActivate:[AuthGuard], component: EmployeeDeleteComponent },
  { path: 'add',canActivate:[AuthGuard], component: EmployeeAddComponent },
  {
    path: 'update/:emp_id',
    canActivate:[AuthGuard],

    component: EmployeeUpdateComponent,
  },
  {
    path: 'delete/:emp_id',
    canActivate:[AuthGuard],

    component: EmployeeDeleteComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AdminRoutingModule {}
