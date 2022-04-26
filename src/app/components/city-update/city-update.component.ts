import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/_services/city.service';

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

  constructor(private cityService: CityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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
