import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { CsvexportService } from 'src/app/_services/csvexport.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { TripService } from 'src/app/_services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.sass']
})
export class TripListComponent implements OnInit {
  trips?: Trip[];
  allTrips?: Trip[];
  
  sortDir?: boolean[] = [true, true, true, true, true, true];

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private tripService: TripService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_DISPATCHER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.getAll()
  }

  private getAll() {
    this.tripService.getAll().subscribe({
      next: data => {
        this.allTrips = data;
        this.trips = this.allTrips;
      },
      error: error => {

      }
    });
  }

  saveTable() {
    this.csvExportService.downloadFile(this.trips!, 'tripsList', Object.getOwnPropertyNames(this.trips![0]));
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.trips = this.allTrips;
    } else {
      this.trips = this.allTrips?.filter((trip: Trip) =>{
        for (var property in trip) {
          const value = trip[property as keyof Trip];
          if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
            return true;
          }

          if (typeof value === "object" && value === filterValueLower) {
            return true;
          }
        }

        return false;
      });
    }
  }

  applySortTest(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.trips![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.trips = this.trips!.sort((trip1: Trip, trip2: Trip) => {
        const key1 = trip1[sortKey as keyof Trip];
        const key2 = trip2[sortKey as keyof Trip];

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        if (typeof key1 === "object" && typeof key2 === "object") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.trips = this.trips!.sort((trip1: Trip, trip2: Trip) => {
        const key1 = trip1[sortKey as keyof Trip];
        const key2 = trip2[sortKey as keyof Trip];

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! < key2! ? 1 : -1;
        }

        if (typeof key1 === "object" && typeof key2 === "object") {
          return key1! < key2! ? 1 : -1;
        }

        return 0;
      });
    }
  }

  navigateAdd() {
    this.router.navigate(['tripmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['tripmanagement/update', id])
  }
}
