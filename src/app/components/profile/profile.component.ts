import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/_services/role.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  storedUser: User = new User();
  roleLocal = '';
  isLoggedIn = false;

  constructor(private roleService: RoleService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    const user = this.tokenStorageService.getUser();
    this.storedUser.roleByRoleId = user.roleByRoleId[0];
    this.roleLocal = this.roleService.getLocalRoleName(this.storedUser.roleByRoleId.roleName!);
    this.storedUser.login = user.userName;
    this.storedUser.email = user.email;
    this.storedUser.lastName = user.lastName;
    this.storedUser.firstName = user.firstName;
    this.storedUser.surName = user.surName;
    this.storedUser.phone = user.phone;
  }
}
