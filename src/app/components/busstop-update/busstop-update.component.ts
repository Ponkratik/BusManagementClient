import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { BusstopService } from 'src/app/_services/busstop.service';
import { CityService } from 'src/app/_services/city.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-busstop-update',
  templateUrl: './busstop-update.component.html',
  styleUrls: ['./busstop-update.component.sass']
})
export class BusstopUpdateComponent implements OnInit {
  form: any = {
    stopName: '',
    intermediate: false,
    latitude: '',
    longitude: '',
    cityByCityId: null
  };

  id!: number;

  cityStr?: string;
  cities?: City[];

  isSuccessful = false;
  errorMessage = '';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private busstopService: BusstopService, private cityService: CityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_DISPATCHER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.cityService.getAll().subscribe({
      next: data => {
        this.cities = data;        
      }
    });

    this.id = this.route.snapshot.params['id'];
    this.busstopService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
        this.cityStr = this.form.cityByCityId.cityName;
      }
    });
  }

  onSubmit(event: any) {
    this.form.cityByCityId = this.cities!.filter((city: City) => city.cityName.includes(event.target.cityByCityId.value))[0];
    this.save();
  }

  private save() {
    this.busstopService.update(this.id, this.form).subscribe({
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

  delete() {
    this.busstopService.delete(this.id).subscribe({
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
