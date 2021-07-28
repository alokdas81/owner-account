import { TokenIntercepterService } from './auth/token-intercepter.service';
import { AuthGuard } from 'src/app/auth.guard';
import { PipesModule } from './pipes.module';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { EmployeeModule } from './employee/employee.module';
import { ToastrModule } from 'ngx-toastr';
import {FontAwesomeModule}from '@fortawesome/angular-fontawesome'





@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,



  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    FontAwesomeModule,
    // AdminModule,
    EmployeeModule,
    ToastrModule.forRoot(),


  ],
  exports: [FontAwesomeModule],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenIntercepterService,
    multi:true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
