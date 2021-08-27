import { Kpi } from './../../employeedetails';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.css']
})
export class AddKpiComponent implements OnInit {

  public employeeForm!: FormGroup;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private activateRoute:ActivatedRoute,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      availability: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      ontime: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      punctuality: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      regularity: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      timetorepair: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      criticalproblemsolving: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      clienthandling: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      innovative: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      teamPlayer: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      dependibility: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });
  }

  public addKpi =() => {
    if (this.employeeForm.valid) {
      this.executeKpiAdd(this.employeeForm.value);
    }
  };

  // Logic for employee add method value get
  private executeKpiAdd = (employeeFormValue: {
    availability: number;
    ontime: number;
    punctuality: number;
    regularity: number;
    timetorepair: number;
    criticalproblemsolving: number;
    clienthandling: number;
    innovative: number;
    teamPlayer: number;
    dependibility: number;
  }) => {
    const _employee= JSON.parse(localStorage.getItem("data") as string);
    let employee: Kpi = {
      sup_id: _employee.emp_id,
      feedback_emp_id: _employee.emp_id,
      availability: employeeFormValue.availability,
      ontime: employeeFormValue.ontime,
      punctuality: employeeFormValue.punctuality,
      regularity: employeeFormValue.regularity,
      timetorepair: employeeFormValue.timetorepair,
      criticalproblemsolving: employeeFormValue.criticalproblemsolving,
      clienthandling: employeeFormValue.clienthandling,
      innovative: employeeFormValue.innovative,
      teamPlayer: employeeFormValue.teamPlayer,
      dependibility: employeeFormValue.dependibility,
    };

    console.log(employee)
    const empId=this.activateRoute.snapshot.params.id;
    let apiUrl = `add/${empId}`;
    this.repository.addKpi(apiUrl, employee).subscribe(
      (res) => {
        this.location.back();
        console.log(res);

      },
      (error) => {
        this.toastr.error("Please check again!",error.message)
        // this.location.back();
      }
    );
  };

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  onCancel() {
    this.location.back();
  }

}
