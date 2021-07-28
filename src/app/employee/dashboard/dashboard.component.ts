import { Employee } from 'src/app/employeedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import { Colleague } from './../../employeedetails';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

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
    'Kpi_details',
  ];

  public colleague = new MatTableDataSource<Colleague>();

   _name=JSON.parse(localStorage.getItem("employee") as string);

  emp_fname=this._name.f_name;
  emp_lname=this._name.l_name;
  emp_email=this._name.email;
  emp_phone=this._name.phone;

  constructor(
    private repoService: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees = () => {
    this.repoService.getColleagues('colleagues/').subscribe((res) => {
      console.warn(res);
      this.colleague.data = res as Colleague[];
    });
  };

  redirectToKpi(emp_id: string) {
    let url: string = `/employee/kpi/${emp_id}`;
    this.router.navigate([url]);
  }
  applyFilter(event: any) {
    const filterQuery = event.target.value.trim().toLowerCase();
    this.colleague.filter = filterQuery;
  }



}
