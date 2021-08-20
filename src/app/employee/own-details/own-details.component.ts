import { Location } from '@angular/common';
import { Employee } from './../../employeedetails';
import { RepositoryService } from './../../service/repo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-own-details',
  templateUrl: './own-details.component.html',
  styleUrls: ['./own-details.component.css'],
})
export class OwnDetailsComponent implements OnInit {
  public employee!: Employee ;
  public showDetails: any;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getownDetailsById();
  }

  private getownDetailsById = () => {
    const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
    console.log(this.activeRoute.snapshot);
    const employeeByIdUrl: string = `ownDetails/${employeeId}`;
    this.repository.getownDetailsById(employeeByIdUrl).subscribe(
      (res) => {
        this.employee = res as Employee;

      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };
  onBack(){
    this.location.back();
  }

}
