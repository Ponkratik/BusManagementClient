import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/_services/city.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.sass']
})
export class CityUpdateComponent implements OnInit {

  id!: number;
  city: City = new City();

  isSuccessful = false;
  errorMessage = '';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private cityService: CityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_DISPATCHER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.id = this.route.snapshot.params['id'];

    this.cityService.getById(this.id).subscribe({
      next: data => {
        this.city = data;
      },
      error: error => {

      }
    });
  }

  onSubmit() {
    this.save();
  }

  save() {
    this.cityService.update(this.id, this.city).subscribe({
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
    this.cityService.delete(this.id).subscribe({
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
    this.router.navigate(['citymanagement']);
  }

}
