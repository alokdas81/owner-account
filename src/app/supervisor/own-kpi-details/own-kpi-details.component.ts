import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Kpi } from './../../employeedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-own-kpi-details',
  templateUrl: './own-kpi-details.component.html',
  styleUrls: ['./own-kpi-details.component.css']
})
export class OwnKpiDetailsComponent implements OnInit {

 
  public employee: Kpi | undefined;
  public showKpiDetails: any;

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private location:Location, private toastr:ToastrService) { }

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
    this.toastr.error("Invalid employee!","Check again!");
    })
  }
    onBack(){
      this.location.back();
    }

}
