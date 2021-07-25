import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponce,EmpResponce } from './employeedetails';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  email!:AuthResponce;
  password!:AuthResponce;
  roll!:AuthResponce;

  emp_email!:EmpResponce;
  emp_password!:EmpResponce;

  private _loginUrl="http://localhost:3000/signIn";

  constructor(private httpclient:HttpClient, private routes:Router) { }


  public signIn = (email: string, password:string):Observable<any> => {
  return this.httpclient.post(environment.endPoints.auth.signIn,{email:email,password:password});
  }

  public logIn=(emp_email:string, emp_password: string): Observable<any>=>{
    return this.httpclient.post<EmpResponce>(environment.endPoints.employee.loginEmoployee,{email:emp_email,password:emp_password});
  }



adminLoggedIn(){
  return !!localStorage.getItem('token')
}
employeeLogggedIn(){
  return !!localStorage.getItem('token')
}

getToken(){
  return localStorage.getItem('token')
}

adminLogout(){
  return localStorage.removeItem('token')
  this.routes.navigate(['/home']);
}
logout(){
  return localStorage.removeItem('token')
}
}
  


