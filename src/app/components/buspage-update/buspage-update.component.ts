import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/_services/bus.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-buspage-update',
  templateUrl: './buspage-update.component.html',
  styleUrls: ['./buspage-update.component.sass']
})
export class BuspageUpdateComponent implements OnInit {

  id!: number;
  bus: Bus = new Bus();

  isSuccessful = false;
  errorMessage = '';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private busService: BusService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_GARAGEMANAGER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.id = this.route.snapshot.params['id'];

    this.busService.getById(this.id).subscribe({
      next: data => {
        this.bus = data;
      },
      error: error => {

      }
    });
  }

  onSubmit() {
    this.save();
  }

  save() {
    this.busService.update(this.id, this.bus).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        console.log(error);
        this.isSuccessful = false;
        this.errorMessage = error.message;
      }
    });
  }

  delete() {
    this.busService.delete(this.id).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        console.log(error);
        this.isSuccessful = false;
        this.errorMessage = error.message;
      }
    });
  }

  navigateToList() {
    this.router.navigate(['busmanagement']);
  }

}
