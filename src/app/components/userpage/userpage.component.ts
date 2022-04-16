import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.sass']
})
export class UserpageComponent implements OnInit {
  users?: User[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers() {
      this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  registerUser() {
    this.router.navigate(['signup']);
  }

  updateUser(id: number) {
    this.router.navigate(['usermanagement/update', id]);
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(
      data => {
        this.getAllUsers();
      }
    )
  }

}
