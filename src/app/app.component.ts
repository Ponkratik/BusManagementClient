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

  /*storedUser: User = {
    login: '',
    email: '',
    lastName: '',
    firstName: '',
    surName: '',
    phone: '',
    roleByRoleId: {
      roleId: 0,
      roleName: ''
    }
  }*/

  storedUser: User = new User();

  showTransportManagementPage = false;
  showRouteManagementPage = false;
  showUserManagementPage = false;
  showDriverPage = false;


  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.storedUser.roleByRoleId.roleName = user.roles[0];
      this.storedUser.login = user.userName;
      this.storedUser.email = user.email;
      this.storedUser.lastName = user.lastName;
      this.storedUser.firstName = user.firstName;
      this.storedUser.surName = user.surName;
      this.storedUser.phone = user.phone;

      this.showDriverPage = this.storedUser.roleByRoleId.roleName == ('ROLE_DRIVER');
      this.showRouteManagementPage = this.storedUser.roleByRoleId.roleName == ('ROLE_DISPATCHER');
      this.showUserManagementPage = this.storedUser.roleByRoleId.roleName == ('ROLE_SYSADMIN');
      this.showTransportManagementPage = this.storedUser.roleByRoleId.roleName == ('ROLE_GARAGEMANAGER');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload;
  }
}
