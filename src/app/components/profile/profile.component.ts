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

  constructor(private roleService: RoleService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    console.log(user);
    this.storedUser.roleByRoleId = user.roleByRoleId[0];
    this.roleLocal = this.roleService.getLocalRoleName(user.roleByRoleId[0]);
    this.storedUser.login = user.userName;
    this.storedUser.email = user.email;
    this.storedUser.lastName = user.lastName;
    this.storedUser.firstName = user.firstName;
    this.storedUser.surName = user.surName;
    this.storedUser.phone = user.phone;
  }
}
