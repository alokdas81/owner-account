import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import {employee_under} from './../../employeedetails';
import { MatTableDataSource } from '@angular/material/table';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons"
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-under',
  templateUrl: './employee-under.component.html',
  styleUrls: ['./employee-under.component.css']
})
export class EmployeeUnderComponent implements OnInit {

flag=true;

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
    'Kpi_Add',
    'kpi_details',
  ];
  public employee_under = new MatTableDataSource<employee_under>();

  _name=JSON.parse(localStorage.getItem("data") as string);

  emp_id=this._name.emp_id;
  emp_fname=this._name.f_name;
  emp_lname=this._name.l_name;
  emp_email=this._name.email;
  emp_phone=this._name.phone;
  emp_sup_id=this._name.sup_id

  constructor(
    private repoService: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees()
  }

  public getAllEmployees = () => {
    this.repoService.getEmployeeUnder('employees/').subscribe((res) => {
      this.employee_under.data = res  as employee_under[];
      localStorage.setItem('element', JSON.stringify(res));

    });
  };

  _get=JSON.parse(localStorage.getItem("element") as string);



 isSubmited(element:any){
  if(element.feedback_emp_id===this.emp_id){
    return true;
  }
  return false;
 }

  redirectToKpi(emp_id: string) {
      let url: string = `/supervisor/kpi/${emp_id}`;
      this.router.navigate([url]);

  }



  public redirectToKpiDetails=(emp_id:string)=>{
      let kpiurl: string = `/supervisor/kpi_details/${emp_id}`;
      this.router.navigate([kpiurl]);
  }
  applyFilter(event: any) {
    const filterQuery = event.target.value.trim().toLowerCase();
    this.employee_under.filter = filterQuery;
  }

  ngAfterViewInit(): void {
    this.employee_under.paginator = this.paginator;
  }


}
