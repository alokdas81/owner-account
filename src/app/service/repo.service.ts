import { employee_under } from './../employeedetails';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private http: HttpClient) {}

  public getKpidata = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public getEmployeeUnder = (route: string): Observable<employee_under[]> => {
    const user = JSON.parse(localStorage.getItem('data') as string);
    return this.http.post<employee_under[]>(
      this.createCompleteRoute(route, environment.urlAddress),
      { email: user.email }
    );
  };

  public getSupervisors = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public getData = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public getDownload = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress),
      {
        responseType: 'blob',
        observe: 'response',
      }
    );
  };

  public getownDetailsById = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public employeeGetOwnKpi = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public create = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  };

  public upload = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body
    );
  };

  public addKpi = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  };

  public update = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  };

  public getEmpById = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public getEmpKpiById = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public supGivenKpiById = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public avgKpi = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public empGivenKpiById = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public delete = (route: string) => {
    return this.http.delete(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
}
