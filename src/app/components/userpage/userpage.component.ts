import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Busstop } from 'src/app/models/busstop.model';
import { User } from 'src/app/models/user.model';
import { CsvexportService } from 'src/app/_services/csvexport.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.sass']
})
export class UserpageComponent implements OnInit {
  users?: User[];
  allUsers?: User[];

  sortDir?: boolean[] = [true, true, true, true, true, true, true, true, true, true];

  constructor(private userService: UserService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers() {
      this.userService.getAll().subscribe(data => {
      this.allUsers = data;
      this.users = this.allUsers;
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

  saveTable() {
    this.csvExportService.downloadFile(this.users!, 'usersList', Object.getOwnPropertyNames(this.users![0]));
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.users = this.allUsers;
    } else {
      this.users = this.allUsers?.filter((user: User) =>{
        for (var property in user) {
          const value = user[property as keyof User];
          if (typeof value === "string" && value.toLowerCase().includes(filterValueLower)) {
            return true;
          }

          if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
            return true;
          }

          if (typeof value === "boolean" && value === filterValueLower) {
            return true;
          }

          if (typeof value === "object" && value.roleName === filterValueLower) {
            return true;
          }
        }

        return false;
      });
    }
  }

  applySortTest(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.users![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.users = this.users!.sort((user1: User, user2: User) => {
        const key1 = user1[sortKey as keyof User];
        const key2 = user2[sortKey as keyof User];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.users = this.users!.sort((user1: User, user2: User) => {
        const key1 = user1[sortKey as keyof User];
        const key2 = user2[sortKey as keyof User];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() < key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! < key2! ? 1 : -1;
        }

        return 0;
      });
    }
  }

}
