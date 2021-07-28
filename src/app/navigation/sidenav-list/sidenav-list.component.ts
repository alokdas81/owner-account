import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() public sidenavclose=new EventEmitter();
  constructor(public _authService:AuthService) { }

  ngOnInit(): void {
  }

  public onSidenavClose=()=>{
    this.sidenavclose.emit();
  }
}
