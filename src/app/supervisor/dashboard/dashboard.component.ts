import { Router, ActivatedRoute } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { RepositoryService } from './../../service/repo.service';
import { Component, OnInit } from '@angular/core';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons";
import { Employee } from 'src/app/employeedetails';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  images:any;
  faEnvelope=faEnvelope;
  faMapMarkedAlt=faMapMarkedAlt;
  faPhone=faPhone;
  faDatabase=faDatabase;

  interface!:any;

  employee!:Employee;

  url:any;

  _name=JSON.parse(localStorage.getItem("data") as string);
  emp_emp_id=this._name.emp_id;
  emp_fname=this._name.f_name;
  emp_lname=this._name.l_name;
  emp_email=this._name.email;
  emp_phone=this._name.phone;
  emp_image=this._name.image;
  constructor(private repoService:RepositoryService,private http:HttpClientModule,
    private Routerer: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getownDetailsById();
    this.getEmployeeById();
  }


  // isSubmited(){
  //   if(this.employee?.[0].feedback_emp_id){
  //     return true;
  //   }
  //   return false;
  //  }
  
    public redirectToDetails = (emp_emp_id: string) => {
      let url: string = `/supervisor/ownKpiDetails/${emp_emp_id}`;
      this.Routerer.navigate([url]);
  
    }
  
    public redirectToAddKpi=(emp_emp_id:string)=>{
      let kpiurl: string = `/supervisor/add/${emp_emp_id}`;
      this.Routerer.navigate([kpiurl]);
    }
  

    public redirectToOwnDetails = (emp_emp_id: string) => {
      let url: string = `/supervisor/ownDetails/${emp_emp_id}`;
      this.Routerer.navigate([url]);
  
    }
  

    isSubmited(){
      if(this.interface?.[0].feedback_emp_id){
        return true;
      }
      return false;
     }
    


  onSelectFile(event: any){
    if(event.target.files.length>0){
      const file=event.target.files[0]
      this.images=file;
      const formData= new FormData();
      formData.append('file',this.images);
      let apiUrl = `upload-image/${this.employee.emp_id}`
      this.repoService.upload(apiUrl,formData).subscribe((res) => {
        this.getEmployeeById();
       // console.log(res);
     })
    }

  }

  
  private getownDetailsById = () => {
    const employeeId: string = this.activeRoute.snapshot.params['id'];
    console.log(this.activeRoute.snapshot);
    const employeeByIdUrl: string = `employeeOwn/${employeeId}`;
    this.repoService.employeeGetOwnKpi(employeeByIdUrl).subscribe(
      (res:any) => {
        this.interface = res;
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };



  private getEmployeeById = () => {
    const employeeId: string = this.emp_emp_id;
    const employeeByIdUrl: string = `own-details/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res) => {
        this.employee= res as Employee;
        this.url =`${environment.baseImageUrl}/${this.employee?.image}`

        //console.log(this.employee);
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };
}
