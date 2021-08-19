import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { EmpGivenKpi } from './../../employeedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-emp-given-kpi',
  templateUrl: './emp-given-kpi.component.html',
  styleUrls: ['./emp-given-kpi.component.css']
})
export class EmpGivenKpiComponent implements OnInit {

  public employee: EmpGivenKpi | undefined;
  public showKpiDetails: any;

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private location:Location, private toastr:ToastrService) { }

  ngOnInit(): void {
  this.getKpiById();
  }

private getKpiById = () => {
  const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
  const employeeByIdUrl: string = `emp_given_kpi_details/${employeeId}`;
  this.repository.empGivenKpiById(employeeByIdUrl)
    .subscribe(res => {
      this.employee = res as EmpGivenKpi;
    },
    (error) => {
    this.toastr.error("Invalid employee!","Check again!");
    })
  }
    onBack(){
      this.location.back();
    }

}
