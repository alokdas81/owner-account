import { ToastrService } from 'ngx-toastr';
import { Supervisor } from './../../employeedetails';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/service/repo.service';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { EmployeeForAdd } from 'src/app/employeedetails';






interface supers{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  [x: string]: any;

  public employeeForm!: FormGroup;

  Supervisors!:Supervisor[];



  constructor(private location: Location, private repository: RepositoryService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      f_name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      l_name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      status:new FormControl('', [Validators.required, Validators.maxLength(1)]),
      sup_name:new FormControl('',[Validators.required,Validators.maxLength(60)])
    });
    this.getSupervisor();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.employeeForm.controls[controlName].hasError(errorName);

  }



  private getSupervisor = () => {
   // let employeeId: string = this.activeRoute.snapshot.params['emp_id'];
    let employeeByIdUrl: string = `supervisor/`;

    this.repository.getSupervisors(employeeByIdUrl).subscribe(
      (res) => {
        this.Supervisors = res as Supervisor[];
        this.employeeForm.patchValue(this.employee);
        this.pushValue();
      },
      (_error) => {
        this.toastr.error("Supervisor name is not available","Check again!")
      }
    );
  };

  public onCancel = () => {
    this.location.back();
  }

  public pushValue(){
    this.Supervisors.forEach(item => {
      this.super.push({viewValue: item.f_name, value:item.emp_id.toString()})
    })
  }

  public addemployee = (employeeFormValue: any) => {
    if (this.employeeForm.valid) {
     console.log(this.employeeForm.value)
      this.executeEmployeeAdd(employeeFormValue);

    }
  }

  // Logic for employee add method value get
  private executeEmployeeAdd = (employeeFormValue: { f_name: string,l_name:string, email:any,phone:number,status:string,sup_name:string }) => {
    let employee: EmployeeForAdd = {
      f_name: employeeFormValue.f_name,
      l_name: employeeFormValue.l_name,
      email: employeeFormValue.email,
      phone: employeeFormValue.phone,
      status:employeeFormValue.status,
      sup_id:Number(employeeFormValue.sup_name),

    }

    let apiUrl = 'create/';
    this.repository.create(apiUrl, employee)
      .subscribe(res => {
        //this is temporary, until we create our dialogs
        this.location.back();
      },
      (error => {
       this.toastr.error("Wrong input!","Check again!")
        //this.location.back();
      })
    )
  }

  super: supers[] = [


  ];

}
