import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
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

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");
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
