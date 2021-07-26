import { Employee } from './../../employeedetails';
import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Form!: FormGroup;
  loginMode: boolean = true;
  error: any;
name:any | undefined;

  loginData!: {};
  constructor(private _authService: AuthService, private routes: Router) {}

  ngOnInit(): void {
    this.Form = new FormGroup({
      email: new FormControl(' ', Validators.required),
      password: new FormControl(' ', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  logIn() {
    if (this.Form.valid) {
      const email = this.Form.value.email;
      const password = this.Form.value.password;

      if (this.loginMode) {
        this._authService.logIn(email, password).subscribe(
          (res) => {
            localStorage.clear();
            localStorage.setItem('employee', JSON.stringify(res.employee));
            console.log(res);
            localStorage.setItem('token', res.token);

            this.routes.navigate([`/employee/dashboard/${res.employee.emp_id}`]);
          },
          (err) => {
            this.error = err.error.error.message;
            console.log(err);
            this.routes.navigate(['/login']);
          }
        );
      } else {
        this.routes.navigate(['/login']);
      }
    }
  }

  onmodeSwitch() {
    this.loginMode = !this.loginMode;
  }
}
