import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/_services/bus.service';
import { CsvexportService } from 'src/app/_services/csvexport.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-buspage',
  templateUrl: './buspage.component.html',
  styleUrls: ['./buspage.component.sass']
})
export class BuspageComponent implements OnInit {
  buses?: Bus[];
  allBuses?: Bus[];
  
  sortDir?: boolean[] = [true, true, true, true, true];

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private busService: BusService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_GARAGEMANAGER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.getAll()
  }

  private getAll() {
    this.busService.getAll().subscribe({
      next: data => {
        this.allBuses = data;
        this.buses = this.allBuses;
      },
      error: error => {

      }
    })
  }

  saveTable() {
    this.csvExportService.downloadFile(this.buses!, 'busesList', Object.getOwnPropertyNames(this.buses![0]));
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.buses = this.allBuses;
    } else {
      this.buses = this.buses?.filter((bus: Bus) =>{
        for (var property in bus) {
          const value = bus[property as keyof Bus];
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
    let properties = Object.getOwnPropertyNames(this.buses![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.buses = this.buses!.sort((bus1: Bus, bus2: Bus) => {
        const key1 = bus1[sortKey as keyof Bus];
        const key2 = bus2[sortKey as keyof Bus];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.buses = this.buses!.sort((bus1: Bus, bus2: Bus) => {
        const key1 = bus1[sortKey as keyof Bus];
        const key2 = bus2[sortKey as keyof Bus];

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
    this.router.navigate(['busmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['busmanagement/update', id])
  }

}
