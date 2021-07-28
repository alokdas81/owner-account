import { Component, OnInit } from '@angular/core';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  faEnvelope=faEnvelope;
  faMapMarkedAlt=faMapMarkedAlt;
  faPhone=faPhone;
  faDatabase=faDatabase;


  _name=JSON.parse(localStorage.getItem("admin") as string);

  admin_fname=this._name.f_name;
  admin_lname=this._name.l_name;
  admin_email=this._name.email;
  admin_phone=this._name.phone;

  constructor() { }



  ngOnInit(): void {
  }

}
