import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { SupGivenKpi } from './../../employeedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-sup-given-kpi',
  templateUrl: './sup-given-kpi.component.html',
  styleUrls: ['./sup-given-kpi.component.css']
})
export class SupGivenKpiComponent implements OnInit {

  public employee: SupGivenKpi | undefined;
  public showKpiDetails: any;

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private location:Location, private toastr:ToastrService) { }

  ngOnInit(): void {
  this.getKpiById();
  }

private getKpiById = () => {
  const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
  const employeeByIdUrl: string = `sup_given_kpi_details/${employeeId}`;
  this.repository.supGivenKpiById(employeeByIdUrl)
    .subscribe(res => {
      this.employee = res as SupGivenKpi;
    },
    (error) => {
    this.toastr.error("Invalid employee!","Check again!");
    })
  }
    onBack(){
      this.location.back();
    }


}
