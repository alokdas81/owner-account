import { ToastrService } from 'ngx-toastr';
import { Supervisor } from './../../employeedetails';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/service/repo.service';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { EmployeeForAdd } from 'src/app/employeedetails';


interface supers {
  value: string;
  viewValue: string;
}

interface role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  public showPassword: boolean | undefined;
  count:any;

  public employeeForm!: FormGroup;

  Supervisors!: Supervisor[];

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employee_id:new FormControl('',Validators.required),
      f_name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(60),
      ]),
      l_name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(60),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._]+(@gmail.com)$'),
        Validators.maxLength(100),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      role: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
      ]),
      sup_name: new FormControl('', [
        Validators.maxLength(60),
      ]),
    });
    this.getSupervisor();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

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
        this.toastr.error('Supervisor name is not available', 'Check again!');
      }
    );
  };

  public onCancel = () => {
    this.location.back();
  };

  public pushValue() {
    this.Supervisors.forEach((item) => {
      this.super.push({
        viewValue: item.f_name,
        value: item.emp_id.toString(),
      });
    });
  }

  public addemployee = (employeeFormValue: any) => {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this.executeEmployeeAdd(employeeFormValue);
    }
  };

  isdisable(){
    if(this.employeeForm.value.role===1){
      this.clearSupervisor()
     return true
    }
    return false
  }
  clearSupervisor(){
    (this.employeeForm.get('sup_name')as FormControl).reset()
  }
  // Logic for employee add method value get
  private executeEmployeeAdd = (employeeFormValue: {
    employee_id:string;
    f_name: string;
    l_name: string;
    email: string;
    phone: number;
    role: number;
    password: string;
    sup_name: string;
  }) => {
    let employee: EmployeeForAdd = {
      employee_id:employeeFormValue.employee_id,
      f_name: employeeFormValue.f_name,
      l_name: employeeFormValue.l_name,
      email: employeeFormValue.email,
      phone: employeeFormValue.phone,
      role: employeeFormValue.role,
      password: employeeFormValue.password,
      sup_id: Number(employeeFormValue.sup_name),
    };

    let emailCheck= 'emailValidation/';
    this.repository.emailCheck(emailCheck, {"email":employee.email}).subscribe(
      (res) => {
        this.count = res;
        if(this.count.cnt>0){
          this.toastr.error('Wrong input!', 'Email is already exists!');
        }
        else{
          let apiUrl = 'create/';
          this.repository.create(apiUrl, employee).subscribe(
            (res) => {
              if (res) console.log(res);
              this.location.back();
            },
            (error) => {
              this.toastr.error('Wrong input!', 'Email is already exists!');
              //this.location.back();
            });
      }
          
        
      })
 
    }


  super: supers[] = [];

  employee: role[] = [
    { value: 0, viewValue: 'Supervisor' },
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Employee' },
  ];
}
