import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/_services/bus.service';
import { CsvexportService } from 'src/app/_services/csvexport.service';

@Component({
  selector: 'app-buspage',
  templateUrl: './buspage.component.html',
  styleUrls: ['./buspage.component.sass']
})
export class BuspageComponent implements OnInit {
  buses?: Bus[];
  allBuses?: Bus[];

  sortDir1 = true;
  sortDir2 = true;
  sortDir3 = true;
  sortDir4 = true;

  sortDir?: boolean[] = [true, true, true, true, true];

  constructor(private busService: BusService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
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
    this.csvExportService.downloadFile(this.buses!, 'busesList', ['busId', 'busModel', 'number', 'seatsQty', 'vin']);
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.buses = this.allBuses;
    } else {
      this.buses = this.buses?.filter((bus: Bus) => 
      bus.busModel?.toLowerCase().includes(filterValueLower)
      || bus.number?.toLowerCase().includes(filterValueLower)
      || bus.vin?.toLowerCase().includes(filterValueLower));
    }
  }

  applySortTest(event: any) {
    //console.log(event.target.id);
    let tempBus = this.buses![0];
    // console.log(tempBus);
    // console.log(Object.getOwnPropertyNames(tempBus));
    // console.log(tempBus['busModel']);

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



    // this.buses = this.buses!.sort((bus1: Bus, bus2: Bus) => {
    //   const key1 = bus1[sortKey as keyof Bus];
    //   const key2 = bus2[sortKey as keyof Bus];

    //   console.log(key1, typeof key1);
    //   console.log(this.sortDir![sortColumnId]);
      
    //   if (typeof key1 === "string" && typeof key2 === "string") {
    //     if ((key1!.toLowerCase() > key2!.toLowerCase() && this.sortDir![sortColumnId]) || (key1!.toLowerCase() < key2!.toLowerCase() && this.sortDir![sortColumnId])) {
    //       return 1;
    //     }
  
    //     if ((key1!.toLowerCase() < key2!.toLowerCase() && this.sortDir![sortColumnId]) || (key1!.toLowerCase() > key2!.toLowerCase() && this.sortDir![sortColumnId])) {
    //       return -1;
    //     }
    //   }


    //   if (typeof key1 === "number" && typeof key2 === "number") {
    //     if ((key1! > key2! && this.sortDir![sortColumnId]) || (key1! < key2! && this.sortDir![sortColumnId])) {
    //       return 1;
    //     }
  
    //     if ((key1! < key2! && this.sortDir![sortColumnId]) || (key1! > key2! && this.sortDir![sortColumnId])) {
    //       return -1;
    //     }
    //   }

    //   return 0;
    // });
  }

  applySort1() {
    this.sortDir1 = !this.sortDir1;
    if (this.sortDir1) {
      this.buses = this.buses!.sort((bus1, bus2) => {
        if (bus1.busModel!.toLowerCase() > bus2.busModel!.toLowerCase()) {
          return 1;
        }

        if (bus1.busModel!.toLowerCase() < bus2.busModel!.toLowerCase()) {
          return -1;
        }

        return 0;
      });
    } else {
      this.buses = this.buses!.sort((bus1, bus2) => {
        if (bus1.busModel!.toLowerCase() < bus2.busModel!.toLowerCase()) {
          return 1;
        }

        if (bus1.busModel!.toLowerCase() > bus2.busModel!.toLowerCase()) {
          return -1;
        }

        return 0;
      });
    }
  }

  applySort2() {
    this.sortDir2 = !this.sortDir2;
    this.buses = this.buses!.sort((bus1, bus2) => {
      if ((bus1.number!.toLowerCase() > bus2.number!.toLowerCase() && this.sortDir2) || (bus1.number!.toLowerCase() < bus2.number!.toLowerCase() && !this.sortDir2)) {
        return 1;
      }

      if ((bus1.number!.toLowerCase() < bus2.number!.toLowerCase() && this.sortDir2) || (bus1.number!.toLowerCase() > bus2.number!.toLowerCase() && !this.sortDir2)) {
        return -1;
      }

      return 0;
    });
  }

  // applySort2() {
  //   this.sortDir2 = !this.sortDir2;
  //   if (this.sortDir2) {
  //     this.buses = this.buses!.sort((bus1, bus2) => {
  //       if ((bus1.number!.toLowerCase() > bus2.number!.toLowerCase() && this.sortDir2) || (bus1.number!.toLowerCase() < bus2.number!.toLowerCase() && !this.sortDir2)) {
  //         return 1;
  //       }

  //       if (bus1.number!.toLowerCase() < bus2.number!.toLowerCase()) {
  //         return -1;
  //       }

  //       return 0;
  //     });
  //   } else {
  //     this.buses = this.buses!.sort((bus1, bus2) => {
  //       if (bus1.number!.toLowerCase() < bus2.number!.toLowerCase()) {
  //         return 1;
  //       }

  //       if (bus1.number!.toLowerCase() > bus2.number!.toLowerCase()) {
  //         return -1;
  //       }

  //       return 0;
  //     });
  //   }
  // }

  applySort3() {
    this.sortDir3 = !this.sortDir3;
    if (this.sortDir3) {
      this.buses = this.buses!.sort((bus1, bus2) => {
        if (bus1.seatsQty! > bus2.seatsQty!) {
          return 1;
        }

        if (bus1.seatsQty! < bus2.seatsQty!) {
          return -1;
        }

        return 0;
      });
    } else {
      this.buses = this.buses!.sort((bus1, bus2) => {
        if (bus1.seatsQty! < bus2.seatsQty!) {
          return 1;
        }

        if (bus1.seatsQty! > bus2.seatsQty!) {
          return -1;
        }

        return 0;
      });
    }
  }

  applySort4() {
    this.sortDir4 = !this.sortDir4;
    if (this.sortDir4) {
      this.buses = this.buses!.sort((bus1, bus2) => {
        if (bus1.vin!.toLowerCase() > bus2.vin!.toLowerCase()) {
          return 1;
        }

        if (bus1.vin!.toLowerCase() < bus2.vin!.toLowerCase()) {
          return -1;
        }

        return 0;
      });
    } else {
      this.buses = this.buses!.sort((bus1, bus2) => {
        if (bus1.vin!.toLowerCase() < bus2.vin!.toLowerCase()) {
          return 1;
        }

        if (bus1.vin!.toLowerCase() > bus2.vin!.toLowerCase()) {
          return -1;
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
