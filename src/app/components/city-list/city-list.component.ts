import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/_services/city.service';
import { CsvexportService } from 'src/app/_services/csvexport.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.sass']
})
export class CityListComponent implements OnInit {
  cities?: City[];
  allCities?: City[];
  
  sortDir?: boolean[] = [true, true];

  constructor(private cityService: CityService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.getAll()
  }

  private getAll() {
    this.cityService.getAll().subscribe({
      next: data => {
        this.allCities = data;
        this.cities = this.allCities;
      },
      error: error => {

      }
    })
  }

  saveTable() {
    this.csvExportService.downloadFile(this.cities!, 'citiesList', Object.getOwnPropertyNames(this.cities![0]));
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    console.log(filterValueLower);
    if (event.target.value === '') {
      this.cities = this.allCities;
    } else {
      this.cities = this.cities?.filter((city: City) =>{
        for (var property in city) {
          const value = city[property as keyof City];
          if (typeof value === "string" && value.toLowerCase().includes(filterValueLower)) {
            return true;
          }

          if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
            return true;
          }
        }

        return false;
      });
  }
}

  applySortTest(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.cities![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.cities = this.cities!.sort((city1: City, city2: City) => {
        const key1 = city1[sortKey as keyof City];
        const key2 = city2[sortKey as keyof City];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.cities = this.cities!.sort((city1: City, city2: City) => {
        const key1 = city1[sortKey as keyof City];
        const key2 = city2[sortKey as keyof City];

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

  navigateAdd() {
    this.router.navigate(['citymanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['citymanagement/update', id])
  }
}
