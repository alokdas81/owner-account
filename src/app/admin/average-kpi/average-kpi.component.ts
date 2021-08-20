import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Avg } from './../../employeedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-average-kpi',
  templateUrl: './average-kpi.component.html',
  styleUrls: ['./average-kpi.component.css']
})
export class AverageKpiComponent implements OnInit {

  public employee: Avg | undefined;
  public showKpiDetails: any;

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private location:Location, private toastr:ToastrService) { }

  ngOnInit(): void {
  this.getKpiById();
  }

private getKpiById = () => {
  const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
  const employeeByIdUrl: string = `avgKpi/${employeeId}`;
  this.repository.avgKpi(employeeByIdUrl)
    .subscribe(res => {
      this.employee = res as Avg;
    },
    (error) => {
    this.toastr.error("Invalid employee!","Check again!");
    })
  }
    onBack(){
      this.location.back();
    }



}
