import { Component } from '@angular/core';
import { User } from './models/user.model';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'BusManagementClient';
  isLoggedIn = false;

  storedUser: User = {
    login: '',
    email: '',
    lastName: '',
    firstName: '',
    surName: '',
    phone: '',
    role: ''
  }

  showTransportManagementPage = false;
  showRouteManagementPage = false;
  showUserManagementPage = false;
  showDriverPage = false;


  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.storedUser.role = user.roles[0];
      this.storedUser.login = user.login;
      this.storedUser.email = user.email;
      this.storedUser.lastName = user.lastName;
      this.storedUser.firstName = user.firstName;
      this.storedUser.surName = user.surName;
      this.storedUser.phone = user.phone;

      this.showDriverPage = this.storedUser.role == ('ROLE_DRIVER');
      this.showRouteManagementPage = this.storedUser.role == ('ROLE_DISPATCHER');
      this.showUserManagementPage = this.storedUser.role == ('ROLE_SYSADMIN');
      this.showTransportManagementPage = this.storedUser.role == ('ROLE_GARAGEMANAGER');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload;
  }
}
