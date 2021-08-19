
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import {Self} from './../../employeedetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons"
import { MatPaginator } from '@angular/material/paginator';
import { Addkpi } from './../../employeedetails';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  Addkpi!: Addkpi;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  faEnvelope=faEnvelope;
  faMapMarkedAlt=faMapMarkedAlt;
  faPhone=faPhone;
  faDatabase=faDatabase;
  public displayedColumns = [
    'emp_id',
    'f_name',
    'l_name',
    'email',
    'phone',
    'sup_id',
    'Kpi_Add',
    'role'
  ];

  public Self = new MatTableDataSource<Self>();

   _name=JSON.parse(localStorage.getItem("data") as string);
  emp_empId=this._name.emp_id;
  emp_fname=this._name.f_name;
  emp_lname=this._name.l_name;
  emp_email=this._name.email;
  emp_phone=this._name.phone;
  emp_sup=this._name.sup_id;
  emp_role=this._name.role;

  constructor(
    private repoService: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

  }


  public redirectToDetails = (emp_empId: string) => {
    let url: string = `/employee/ownDetails/${emp_empId}`;
    this.router.navigate([url]);

  }

  public redirectToAddKpi=(emp_empId:string)=>{
    let kpiurl: string = `/employee/add/${emp_empId}`;
    this.router.navigate([kpiurl]);
  }


}
