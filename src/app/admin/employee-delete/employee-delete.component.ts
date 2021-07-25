import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employeedetails';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
 
  public employee!: Employee;
  constructor(private repository: RepositoryService, private router: Router,private location: Location,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeById();
  }

  
private getEmployeeById = () => {
  const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
  const employeeByIdUrl: string = `details/${employeeId}`;
  this.repository.getData(employeeByIdUrl)
    .subscribe(res => {
      this.employee = res as Employee;
    },
    (error) => {
      //this.errorHandler.handleError(error);
      //this.errorMessage = this.errorHandler.errorMessage;
    })
}
public redirectToEmployeeList = () => {
  this.router.navigate(['/admin/list']);
}


public deleteEmployee = () => {
  const deleteUrl: string = `details/${this.employee.emp_id}`;
  this.repository.delete(deleteUrl)
    .subscribe(res => {
      console.log(res);
     // $('#successModal').modal();
    },
    (error) => {
      //this.errorHandler.handleError(error);
      //this.errorMessage = this.errorHandler.errorMessage;
    })
}


public onCancle = () => {
  this.location.back();
}

}
