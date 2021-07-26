import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

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
      email: new FormControl(' ', Validators.required),
      password: new FormControl(' ', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  handlrmsg(){
    if (this.winMassage) {
      this.toastr.success(this.winMassage);
    }
    if(this.error){
      this.toastr.error(this.error);
    }
  }

  signIn() {
    if (this.Form.valid) {
      const email = this.Form.value.email;
      const password = this.Form.value.password;

      if (this.loginMode) {
        this._authservice.signIn(email, password).subscribe(
          (res) => {
            localStorage.clear();
            this.winMassage = 'Login Successfully!';
            console.log(res);
            if(res.admin){
              localStorage.setItem('admin', JSON.stringify(res.admin));
              localStorage.setItem('token', res.token);
              this.routes.navigate(['/admin/admin']);
            }

          },

          (err) => {
            this.error = 'Check Email and Password!';
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
}
