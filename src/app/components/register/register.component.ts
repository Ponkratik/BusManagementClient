import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form: User = new User();

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { login, password, email, lastName, firstName, surName, phone, roleByRoleId } = this.form;
    this.authService.register(login!, password!, email!, lastName!, firstName!, surName!, phone!, roleByRoleId.roleName!).subscribe({
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

  
  navigateToList() {
    this.router.navigate(['usermanagement']);
  }
}
