import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

interface role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  Form!: FormGroup;
  loginMode: boolean = true;

  loginData!: {};

  winMassage: string = ' ';
  error: string = ' ';

  constructor(
    private _authservice: AuthService,
    private routes: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.Form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      role: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  handlrmsg() {
    if (this.winMassage) {
      this.toastr.success(this.winMassage);
    }
    if (this.error) {
      this.toastr.error(this.error);
    }
  }

  signIn() {
    if (this.Form.valid) {
      const email = this.Form.value.email;
      const password = this.Form.value.password;
      const role = this.Form.value.role;
      if (this.loginMode) {
        this._authservice.master(email, password, role).subscribe(
          (res) => {
            localStorage.clear();
            console.log(res);
            if (res.data.role == role) {
              if (role == 1) {
                this.toastr.success('You have successfully login!', 'Welcome');
                localStorage.setItem('data', JSON.stringify(res.data));
                localStorage.setItem('token', res.token);
                this.routes.navigate(['admin/dashboard']);
              } else if (role == 0) {
                this.toastr.success('You have successfully login!', 'Welcome');
                localStorage.setItem('data', JSON.stringify(res.data));
                localStorage.setItem('token', res.token);
                this.routes.navigate([
                  `/supervisor/dashboard/${res.data.emp_id}`,
                ]);
              } else if (role == 2) {
                this.toastr.success('You have successfully login!', 'Welcome');
                localStorage.setItem('data', JSON.stringify(res.data));
                console.log(res);
                localStorage.setItem('token', res.token);
                this.routes.navigate([
                  `/employee/dashboard/${res.data.emp_id}`,
                ]);
              } else {
                this.toastr.error('Please cheack email and password!', 'Opps!');
              }
            }
          },
          (err) => {
            this.toastr.error('Please cheack email and password!', 'Opps!');
            console.log(err);
            this.routes.navigate(['/signin']);
          }
        );
      }
      this.routes.navigate(['/signin']);
    }
  }

  onmodeSwitch() {
    this.loginMode = !this.loginMode;
  }

  employee: role[] = [
    { value: 0, viewValue: 'Supervisor' },
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Employee' },
  ];
}
