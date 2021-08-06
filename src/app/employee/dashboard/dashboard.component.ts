
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import {employee_under} from './../../employeedetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons"
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

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
    'kpi_details',
  ];

  public colleague = new MatTableDataSource<employee_under>();

   _name=JSON.parse(localStorage.getItem("data") as string);

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

  }


}
