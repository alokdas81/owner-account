import { Location } from '@angular/common';
import { Kpi } from './../../employeedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employeedetails';

@Component({
  selector: 'app-employee-kpi-details',
  templateUrl: './employee-kpi-details.component.html',
  styleUrls: ['./employee-kpi-details.component.css']
})
export class EmployeeKpiDetailsComponent implements OnInit {

  public employee: Kpi | undefined;
  public showKpiDetails: any;

  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute, private location:Location) { }

  ngOnInit(): void {
  this.getKpiById();
  }

    
private getKpiById = () => {
  const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
  const employeeByIdUrl: string = `kpi_details/${employeeId}`;
  this.repository.getEmpById(employeeByIdUrl)
    .subscribe(res => {
      this.employee = res as Kpi;
    },
    (error) => {
      //this.errorHandler.handleError(error);
      //this.errorMessage = this.errorHandler.errorMessage;
    })
  }
    onBack(){
      this.location.back();
    }

}
