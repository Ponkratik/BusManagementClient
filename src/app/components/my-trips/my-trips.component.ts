import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { CsvexportService } from 'src/app/_services/csvexport.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { TripService } from 'src/app/_services/trip.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.sass']
})
export class MyTripsComponent implements OnInit {
  trips?: Trip[] = [];
  allTrips?: Trip[] = [];

  form1: any = {
    dateStr: ''
  };

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private tripService: TripService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form1.dateStr = new Date(Date.now()).toISOString().split('T')[0];

    if (this.isLoggedIn) {
      this.getAll();
    }
  }

  private getAll() {
    this.tripService.getByDriver(this.tokenStorageService.getUser().userId).subscribe({
      next: data => {
        this.allTrips = data;
        this.applyFilter();
      },
      error: error => {

      }
    });
  }

  applyFilter() {
    this.trips = this.allTrips!.filter((trip: Trip) => {
      return trip.depTime.toString().includes(this.form1.dateStr);
    })
  }

  saveTable() {
    this.csvExportService.downloadFile(this.trips!, 'tripsList', Object.getOwnPropertyNames(this.trips![0]));
  }

}
