import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponce, EmpResponce, LogInResponce } from './employeedetails';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email!: AuthResponce;
  password!: AuthResponce;
  role!: AuthResponce;

  emp_email!: EmpResponce;
  emp_password!: EmpResponce;

  private _loginUrl = 'http://localhost:3000/signIn';

  constructor(private httpclient: HttpClient, private routes: Router) {}

  // public signIn = (email: string, password: string): Observable<any> => {
  //   return this.httpclient.post(environment.endPoints.auth.signIn, {
  //     email: email,
  //     password: password,
  //   });
  // };

  public master = (
    email: string,
    password: string,
    // role: number
  ): Observable<any> => {
    return this.httpclient.post<LogInResponce>(environment.endPoints.auth.master, {
      email: email,
      password: password,
      // role: role,
    });
  };

  public logIn = (emp_email: string, emp_password: string): Observable<any> => {
    return this.httpclient.post<EmpResponce>(
      environment.endPoints.employee.loginEmoployee,
      { email: emp_email, password: emp_password }
    );
  };


  masterLoggedIn() {
    return !!localStorage.getItem('data');
  }

  admin(){
    var isAdmin=false;
  var data:any= localStorage.getItem('data');
  if(data){
    data=JSON.parse(data) as any;
    if(data.role==1){
      isAdmin=true;
    }
  }
  return isAdmin;
  }
  // adminLoggedIn() {
  //   return !!localStorage.getItem('admin');
  // }
  // employeeLogggedIn() {
  //   return !!localStorage.getItem('employee');
  // }

  getToken() {
    return localStorage.getItem('token');
  }

  //    adminLogout() {
  //    this.routes.navigate(['/']);
  //    return localStorage.removeItem('admin');
  // }

  masterLogout() {
    this.routes.navigate(['/signin']);
    return localStorage.removeItem('data');
  }

  // supervisorLogout() {
  //   this.routes.navigate(['/']);
  //   return localStorage.removeItem('supervisor');
  // }
  // logout() {
  //   this.routes.navigate(['/']);
  //   return localStorage.removeItem('employee');
  // }
}
