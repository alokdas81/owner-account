import { SigninComponent } from './../auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import {HomeComponent}from '../home/home.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'signin', component: SigninComponent},
  { path: '', redirectTo: '/signin', pathMatch: 'full' },

  { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'employee', loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule) },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },

  
  


  
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404', pathMatch: 'full'}

  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
