
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/service/repo.service';
import {Employee, employee_under, Self} from './../../employeedetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons";
import { MatPaginator } from '@angular/material/paginator';
import { Addkpi } from './../../employeedetails';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employee!:any

 interface!:Employee

 url:any

  Addkpi!: Addkpi;
  images:any;
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
  emp_image=this._name.image;


  constructor(
    private repoService: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getownDetailsById()
    this.owndetailsById();

  }


  private getownDetailsById = () => {
    const employeeId: string = this.activatedRoute.snapshot.params['id'];
    console.log(this.activatedRoute.snapshot);
    const employeeByIdUrl: string = `employeeOwn/${employeeId}`;
    this.repoService.employeeGetOwnKpi(employeeByIdUrl).subscribe(
      (res:any) => {
        this.employee = res;
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };



  private owndetailsById = () => {
    const employeeId: string = this.emp_empId;
    const employeeByIdUrl: string = `own-details/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res) => {
        this.interface = res as Employee;
        this.url =`${environment.baseImageUrl}/${this.employee?.image}`
        //console.log(this.employee);
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };



 isSubmited(){
  if(this.employee?.[0].feedback_emp_id){
    return true;
  }
  return false;
 }

  public redirectToDetails = (emp_empId: string) => {
    let url: string = `/employee/ownDetails/${emp_empId}`;
    this.router.navigate([url]);

  }

  public redirectToAddKpi=(emp_empId:string)=>{
    let kpiurl: string = `/employee/add/${emp_empId}`;
    this.router.navigate([kpiurl]);
  }



 // url=`http://localhost:3000/${this.emp_image}`;


  onSelectFile(event: any){
    if(event.target.files.length>0){
      const file=event.target.files[0]
      this.images=file;
      const formData= new FormData();
      formData.append('file',this.images);
      let apiUrl = `upload-image/${this.emp_empId}`
      this.repoService.upload(apiUrl,formData).subscribe((res) => {
        this.owndetailsById()
        //console.log(res);
     })
    }

}

}
