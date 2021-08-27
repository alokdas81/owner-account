import { Component, Input, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employeedetails';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  public employee!: Employee;
  constructor(private repository: RepositoryService, private router: Router,private location: Location,
    private activeRoute: ActivatedRoute,private active:NgbActiveModal) { }


    @Input() title: string | undefined;
    @Input() message: string | undefined;
    @Input() btnOkText: string | undefined;
    @Input() btnCancelText: string | undefined;


  ngOnInit(): void {
  // this.getEmployeeById();
  }


//  private getEmployeeById = () => {
//    const employeeId: string = this.activeRoute.snapshot.params['emp_id'];
//    const employeeByIdUrl: string = `details/${employeeId}`;
//    this.repository.getData(employeeByIdUrl)
//      .subscribe(res => {
//        this.employee = res as Employee;
//        console.log(this.employee)
//      },
//      (error) => {
//        //this.errorHandler.handleError(error);
//        //this.errorMessage = this.errorHandler.errorMessage;
//      })
//  }

public redirectToEmployeeList = () => {
  this.router.navigate(['/admin/dashboard']);
}


 public deleteEmployee(){
   console.log('52')
  //  const deleteUrl: string = `delete/${this.employee.emp_id}`;
  //  this.repository.delete(deleteUrl)
  //    .subscribe(res => {
  //      console.log(res);
  //     // this.getEmployeeById();
  //    },
  //    (error) => {
  //      // this.errorHandler.handleError(error);
  //      // this.errorMessage = this.errorHandler.errorMessage;
  //    })
   this.active.close(true)
  //return '64'
 }


public onCancle = () => {
   this.active.close(false);
 // return '70'
}

}
