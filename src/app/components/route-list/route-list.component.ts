import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { Routebusstop } from 'src/app/models/routebusstop.model';
import { CsvexportService } from 'src/app/_services/csvexport.service';
import { RouteService } from 'src/app/_services/route.service';
import { RoutebusstopService } from 'src/app/_services/routebusstop.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.sass']
})
export class RouteListComponent implements OnInit {
  routes?: Route[];
  allRoutes?: Route[];

  allStops?: Routebusstop[];
  
  sortDir?: boolean[] = [true, true, true];

  constructor(private routeService: RouteService, private routeBusstopService: RoutebusstopService, private csvExportService: CsvexportService, private router: Router) { }

  ngOnInit(): void {
    this.getAll()
  }

  private getAll() {
    this.routeService.getAll().subscribe({
      next: data => {
        this.allRoutes = data;
        this.routes = this.allRoutes;
      },
      error: error => {

      }
    });
  }

  private getAllBusstopsByRouteId(id: number) {
    this.routeBusstopService.getAllById(id).subscribe({
      next: data => {
        this.allStops = data;
      },
      error: error => {

      }
    });
  }

  selectRouteRow(routeId: number) {
    this.getAllBusstopsByRouteId(routeId);
    this.routeBusstopService.allStops = this.allStops!;
    //this.map.setWaypoint(this.allStops!);
  }

  saveTable() {
    this.csvExportService.downloadFile(this.routes!, 'routesList', Object.getOwnPropertyNames(this.routes![0]));
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.routes = this.allRoutes;
    } else {
      this.routes = this.allRoutes?.filter((route: Route) =>{
        for (var property in route) {
          const value = route[property as keyof Route];
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
    let properties = Object.getOwnPropertyNames(this.routes![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.routes = this.routes!.sort((route1: Route, route2: Route) => {
        const key1 = route1[sortKey as keyof Route];
        const key2 = route2[sortKey as keyof Route];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.routes = this.routes!.sort((route1: Route, route2: Route) => {
        const key1 = route1[sortKey as keyof Route];
        const key2 = route2[sortKey as keyof Route];

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
    this.router.navigate(['routemanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['routemanagement/update', id])
  }
}
