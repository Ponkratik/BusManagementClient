import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/_services/city.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.sass']
})
export class CityAddComponent implements OnInit {
  city: City = new City();

  isSuccessful = false;
  errorMessage = '';

  constructor(private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.save();
  }

  save() {
    this.cityService.add(this.city).subscribe({
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
    this.router.navigate(['citymanagement']);
  }

}
