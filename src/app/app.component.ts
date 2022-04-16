import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'BusManagementClient';
  private roles: string[] = [];
  isLoggedIn = false;
  login?: string;
  email?: string;
  lastName?: string;
  firstName?: string;
  surName?: string;
  phone?: string;

  showTransportManagementPage = false;
  showRouteManagementPage = false;
  showUserManagementPage = false;
  showDriverPage = false;


  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;
      this.login = user.login;
      this.email = user.email;
      this.lastName = user.lastName;
      this.firstName = user.firstName;
      this.surName = user.surName;
      this.phone = user.phone;

      this.showDriverPage = this.roles.includes('ROLE_DRIVER');
      this.showRouteManagementPage = this.roles.includes('ROLE_DISPATCHER');
      this.showUserManagementPage = this.roles.includes('ROLE_SYSADMIN');
      this.showTransportManagementPage = this.roles.includes('ROLE_GARAGEMANAGER');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload;
  }
}
