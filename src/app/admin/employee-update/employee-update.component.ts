import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, EmployeeForAdd } from 'src/app/employeedetails';
import { Location } from '@angular/common';
import { Supervisor } from './../../employeedetails';

interface supers {
  value: string;
  viewValue: string;
}

interface status {
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
      f_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      l_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      sup_id: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      status: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      sup_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
    });
    this.getSupervisor();
    this.getEmployeeById();

    /* let employeeId: string = this.activeRoute.snapshot.params['emp_id'];
    let employeeByIdUrl: string = `details/${employeeId}`;
    this.repository.getEmpById(employeeByIdUrl)
    .subscribe(res => {
      this.employee = res as Employee;

      console.log(res);

    })*/
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
    this.Supervisors.forEach((item) => {
      this.super.push({
        viewValue: item.f_name,
        value: item.emp_id.toString(),
      });
    });
  }
  public compareItems(i1: any, i2: any) {
    return i1 && i2 && i1.id === i2.id;
  }

  private getEmployeeById = () => {
    let employeeId: string = this.activeRoute.snapshot.params['emp_id'];
    let employeeByIdUrl: string = `details/${employeeId}`;

    this.repository.getData(employeeByIdUrl).subscribe(
      (res) => {
        this.employee = res as Employee;
        this.employeeForm.patchValue({
          ...this.employee,
          sup_name: this.employee.sup_id,
          status:this.employee.status

        });
      },
      (_error) => {
        //error massage
      }
    );
  };

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
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    phone: number;
    status: number;
    sup_id: number;
  }) => {
    (this.employee.f_name = employeeFormValue.f_name),
      (this.employee.l_name = employeeFormValue.l_name),
      (this.employee.email = employeeFormValue.email),
      (this.employee.password = employeeFormValue.password),
      (this.employee.phone = employeeFormValue.phone),
      (this.employee.status = employeeFormValue.status),
      (this.employee.sup_id = employeeFormValue.sup_id);

    let apiUrl = `update/${this.employee.emp_id}`;
    this.repository.update(apiUrl, this.employee).subscribe(
      (res) => {
        this.router.navigate(['admin/dashboard']);
      },
      (error) => {
        /* this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;*/
      }
    );
  };

  super: supers[] = [];

  employee_status: status[] = [
    { value: 1, viewValue: 'Supervisor' },
    { value: 0, viewValue: 'Employee' },
  ];
}
