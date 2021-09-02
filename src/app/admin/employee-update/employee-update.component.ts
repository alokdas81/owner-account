import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, EmployeeForAdd } from 'src/app/employeedetails';
import { Location } from '@angular/common';
import { Supervisor, Colleague } from './../../employeedetails';

interface supers {
  value: string;
  viewValue: string;
}

interface role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit {
  // public errorMessage: string = '';
  public employee!: Employee;
  public employeeForm!: FormGroup;
  Supervisors!: Supervisor[];

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employee_id:new FormControl(''),
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
      password: new FormControl('', [Validators.maxLength(100)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      role: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      sup_id: new FormControl('', [Validators.maxLength(60)]),
      supervisor_name: new FormControl(''),
    });
    this.getSupervisor();
    this.getEmployeeById();
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
        //error massage
      }
    );
  };

  public onCancel = () => {
    this.location.back();
  };

  public pushValue() {
    this.super.unshift({ value: '', viewValue: 'None' });
    this.Supervisors.forEach((item) => {
      this.super.push({
        viewValue: item.f_name,
        value: item.emp_id.toString(),
      });
    });
    console.log(this.super);
  }

  isdisable(){
    if(this.employeeForm.value.role===1){
       this.clearSupervisor()
     return true
    }
    (this.employeeForm.get('sup_id')as FormControl).enable();
    return false
  }
  clearSupervisor(){
    (this.employeeForm.get('sup_id')as FormControl).reset();
    (this.employeeForm.get('sup_id')as FormControl).disable();
  }
  private getEmployeeById = () => {
    let employeeId: string = this.activeRoute.snapshot.params['emp_id'];
    let employeeByIdUrl: string = `details/${employeeId}`;
    this.repository.getData(employeeByIdUrl).subscribe(
      (res) => {
        console.log('res', res);
        this.employee = res as Employee;
        this.employeeForm.patchValue({
          ...this.employee,
          sup_id: this.employee.sup_id,
          role: this.employee.role,
          supervisor_name: this.employee.supervisor_name,
        });
        this.employeeForm.updateValueAndValidity();
        console.log('this.employeeForm', this.employeeForm.value);
        console.log(this.employee.supervisor_name);
      },
      (_error) => {
        //error massage
      }
    );
  };

  public compareItems(id1: any, id2: any) {
    return id1.id === id2.id;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  public redirectToEmployeeList = () => {
    this.router.navigate(['/admin']);
  };

  public updateemployee = (employeeFormValue: any) => {
    //  console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      this.executeEmployeeUpdate(employeeFormValue);
    }
  };
  // put value into form
  private executeEmployeeUpdate = (employeeFormValue: {
    employee_id:string;
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    phone: number;
    role: number;
    sup_id: number;
  }) => {
    (this.employee.employee_id=employeeFormValue.employee_id),
    (this.employee.f_name = employeeFormValue.f_name),
      (this.employee.l_name = employeeFormValue.l_name),
      (this.employee.email = employeeFormValue.email),
      (this.employee.password = employeeFormValue.password),
      (this.employee.phone = employeeFormValue.phone),
      (this.employee.role = employeeFormValue.role),
      (this.employee.sup_id = employeeFormValue.sup_id);

    let apiUrl = `update/${this.employee.emp_id}`;
    this.repository.update(apiUrl, this.employee).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['admin/dashboard']);
      },
      (error) => {
        /* this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;*/
      }
    );
  };

  super: supers[] = [];

  employee_role: role[] = [
    { value: 0, viewValue: 'Supervisor' },
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Employee' },
  ];
}
