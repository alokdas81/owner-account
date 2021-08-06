import { Component, OnInit } from '@angular/core';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons"


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  faEnvelope=faEnvelope;
  faMapMarkedAlt=faMapMarkedAlt;
  faPhone=faPhone;
  faDatabase=faDatabase;


  _name=JSON.parse(localStorage.getItem("data") as string);

  emp_fname=this._name.f_name;
  emp_lname=this._name.l_name;
  emp_email=this._name.email;
  emp_phone=this._name.phone;
  constructor() { }

  ngOnInit(): void {
  }


}
