import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Busstop } from 'src/app/models/busstop.model';
import { BusstopService } from 'src/app/_services/busstop.service';
import { CsvexportService } from 'src/app/_services/csvexport.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-busstop-list',
  templateUrl: './busstop-list.component.html',
  styleUrls: ['./busstop-list.component.sass']
})
export class BusstopListComponent implements OnInit {
  busstops?: Busstop[];
  allBusstops?: Busstop[];
  
  sortDir?: boolean[] = [true, true, true, true, true, true];

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private busstopService: BusstopService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");


    this.getAll()
  }

  private getAll() {
    this.busstopService.getAll().subscribe({
      next: data => {
        this.allBusstops = data;
        this.busstops = this.allBusstops;
      },
      error: error => {

      }
    })
  }

  saveTable() {
    this.csvExportService.downloadFile(this.busstops!, 'busstopsList', Object.getOwnPropertyNames(this.busstops![0]));
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.busstops = this.allBusstops;
    } else {
      this.busstops = this.allBusstops?.filter((busstop: Busstop) =>{
        for (var property in busstop) {
          const value = busstop[property as keyof Busstop];
          if (typeof value === "string" && value.toLowerCase().includes(filterValueLower)) {
            return true;
          }

          if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
            return true;
          }

          if (typeof value === "boolean" && value === filterValueLower) {
            return true;
          }

          if (typeof value === "object" && value.cityName === filterValueLower) {
            return true;
          }
        }

        return false;
      });
  }
}

  applySortTest(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.busstops![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.busstops = this.busstops!.sort((busstop1: Busstop, busstop2: Busstop) => {
        const key1 = busstop1[sortKey as keyof Busstop];
        const key2 = busstop2[sortKey as keyof Busstop];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.busstops = this.busstops!.sort((busstop1: Busstop, busstop2: Busstop) => {
        const key1 = busstop1[sortKey as keyof Busstop];
        const key2 = busstop2[sortKey as keyof Busstop];

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
    this.router.navigate(['busstopmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['busstopmanagement/update', id])
  }

}
