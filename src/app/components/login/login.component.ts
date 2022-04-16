import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  /*form: User = {
    login: '',
    password: '',
    roleByRoleId: {
      roleId: 0,
      roleName: ''
    }
  };*/

  form: User = new User();

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.form.roleByRoleId = this.tokenStorage.getUser().roleByRoleId[0];
    }
  }

  onSubmit(): void {
    const { login, password } = this.form;
    this.authService.login(login!, password!).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(data);
        this.form.roleByRoleId = this.tokenStorage.getUser().roleByRoleId[0];
        this.redirectToHomePage();
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirectToHomePage(): void {
    this.router.navigate(['home']);
  }
}
