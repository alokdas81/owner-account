import { Location } from '@angular/common';
import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Employee } from './../../../employeedetails';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  
  @Input() public employee: Employee | undefined;

  @Output() selectEmitt = new EventEmitter();

  constructor(private location:Location) { }

  ngOnInit(): void {
  }

  public onChange = (event: { value: any; }) => {
    this.selectEmitt.emit(event.value);
  }

  
onBack(){
  this.location.back();
}
}
