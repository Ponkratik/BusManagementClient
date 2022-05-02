import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { BusstopService } from 'src/app/_services/busstop.service';
import { CityService } from 'src/app/_services/city.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-busstop-add',
  templateUrl: './busstop-add.component.html',
  styleUrls: ['./busstop-add.component.sass']
})
export class BusstopAddComponent implements OnInit {
  form: any = {
    stopName: '',
    intermediate: false,
    latitude: '',
    longitude: '',
    cityByCityId: null
  };

  cities?: City[];

  isSuccessful = false;
  errorMessage = '';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private busstopService: BusstopService, private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_DISPATCHER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.cityService.getAll().subscribe({
      next: data => {
        this.cities = data;        
      }
    });
  }

  onSubmit(event: any) {
    this.form.cityByCityId = this.cities!.filter((city: City) => city.cityName.includes(event.target.cityByCityId.value))[0];  
    this.save();
  }

  save() {
    this.busstopService.add(this.form).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });
  }

  navigateToList() {
    this.router.navigate(['busstopmanagement']);
  }

}
