import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../service/repo.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { Employee } from 'src/app/employeedetails';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  images: any;

  employee!: Employee;
 url:any;


  faEnvelope = faEnvelope;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faDatabase = faDatabase;

  _name = JSON.parse(localStorage.getItem('data') as string);
  admin_emp_id = this._name.emp_id;
  admin_fname = this._name.f_name;
  admin_lname = this._name.l_name;
  admin_email = this._name.email;
  admin_phone = this._name.phone;

  constructor(
    private http: HttpClient,
    private form: FormBuilder,
    private repoService: RepositoryService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmployeeById();
  }

  // admin_image=this.employee.image;



  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      const formData = new FormData();
      formData.append('file', this.images);
      let apiUrl = `upload-image/${this.employee.emp_id}`;
      this.repoService.upload(apiUrl, formData).subscribe((res) => {
        // console.log(res);
        this.getEmployeeById();
      });
    }
  }

  private getEmployeeById = () => {
    const employeeId: string = this.admin_emp_id;
    const employeeByIdUrl: string = `own-details/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res) => {
        this.employee = res as Employee;
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

//   onSubmit(){
//     const formData= new FormData();
//     formData.append('file',this.images);
//     let apiUrl = `upload-image/${this.admin_emp_id}`
//     this.repoService.upload(apiUrl,formData).subscribe((res) => {
//       console.log(res);
//    })
//   }
// }
