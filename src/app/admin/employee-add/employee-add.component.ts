import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/service/repo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
 
  public employeeForm!: FormGroup;

 
  

  constructor(private location: Location, private repository: RepositoryService) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      f_name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      l_name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      sup_id: new FormControl('', [Validators.required, Validators.maxLength(20)]),
     
    });
  }
  
  public hasError = (controlName: string, errorName: string) =>{
    return this.employeeForm.controls[controlName].hasError(errorName);
  }
  
  public onCancel = () => {
   /* var r =  [{id:1, name:""}, {id:2,name:""}]
    r.forEach(item => {
      this.super.push({viewValue: item.name, value:item.id})
    })*/
    this.location.back();
  }

  public addemployee = (employeeFormValue: any) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeAdd(employeeFormValue);
      
    }
  }
  
  // Logic for employee add method value get 
  private executeEmployeeAdd = (employeeFormValue: { f_name: string,l_name:string, email:any,phone:number,sup_id:number }) => {
    let employee: EmployeeForAdd = {
      f_name: employeeFormValue.f_name,
      l_name: employeeFormValue.l_name,     
      email: employeeFormValue.email,
      phone:employeeFormValue.phone,
      sup_id:employeeFormValue.sup_id,

    }

    let apiUrl = 'create/';
    this.repository.create(apiUrl, employee)
      .subscribe(res => {
        //this is temporary, until we create our dialogs
        this.location.back();
      },
      (error => {
        //temporary as well
        this.location.back();
      })
    )
  }

  super: supers[] = [
    {value: 'steak-0', viewValue: 'Amar Baneerjee'},
    {value: 'pizza-1', viewValue: 'Alok Das'},
   
  ];

}
