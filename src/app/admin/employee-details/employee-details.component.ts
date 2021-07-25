import { Employee } from './../../employeedetails';
import { RepositoryService } from './../../service/repo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public employee: Employee | undefined;
  public showDetails: any;

  constructor(private repository: RepositoryService, private router: Router, 
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

}
