import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  form: any = {
    login: null,
    password: null,
    email: null,
    lastName: null,
    firstName: null,
    surName: null,
    phone: null,
    role: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { login, password, email, lastName, firstName, surName, phone, role } = this.form;
    this.authService.register(login, password, email, lastName, firstName, surName, phone, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }, 
      error: err => {
        console.log(err);
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.errorMessage = err.error.error;
      }
    });
  }
}
