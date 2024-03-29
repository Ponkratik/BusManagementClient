import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-userpage-update',
  templateUrl: './userpage-update.component.html',
  styleUrls: ['./userpage-update.component.sass']
})
export class UserpageUpdateComponent implements OnInit {

  id!: number;
  user: User = new User();

  isSuccessful = false;
  errorMessage = '';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.id = this.route.snapshot.params['id'];

    this.userService.getById(this.id).subscribe(
      data => {
        this.user = data;
    },
    error => {
      console.log(error);
    })
  }

  onSubmit() {
    this.userService.update(this.id, this.user).subscribe(
      data => {
        this.isSuccessful = true;
        this.goToUsersList();
      },
      error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
        console.log(error);
      }
    )
  }

  goToUsersList() {
    this.router.navigate(['/usermanagement']);
  }

}
