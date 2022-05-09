import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Busstop } from 'src/app/models/busstop.model';
import { Route } from 'src/app/models/route.model';
import { BusstopService } from 'src/app/_services/busstop.service';
import { RouteService } from 'src/app/_services/route.service';
import { RoutebusstopService } from 'src/app/_services/routebusstop.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-route-update',
  templateUrl: './route-update.component.html',
  styleUrls: ['./route-update.component.sass']
})
export class RouteUpdateComponent implements OnInit {
  route: Route = new Route;

  id!: number;

  displayStopEditForm = false;
  restBusstops: Busstop[] = [];
  selectedBusstops: Busstop[] = [];
  selectedDeltas: Date[] = [];
  selectedDeltasStr: string[] = [];

  isSuccessful = false;
  errorMessage = '';
  
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private routeService: RouteService, private routeBusstopService: RoutebusstopService, private busstopService: BusstopService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_DISPATCHER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");

    this.id = this.activatedRoute.snapshot.params['id'];

    this.routeService.getById(this.id).subscribe({
      next: data => {
        this.route = data;
      }
    });

    this.busstopService.getAll().subscribe({
      next: data => {
        this.restBusstops = data;
      }
    });

    this.routeBusstopService.getAllById(this.id).subscribe({
      next: data => {
        let routebusstops = data;
        routebusstops.forEach(element => {
          this.selectedBusstops.push(element.busstopByStopId);
          this.selectedDeltas.push(element.timeDelta);
          let d: Date = new Date(element.timeDelta);
          d.setHours(d.getHours() + 3);
          this.selectedDeltasStr.push(d.toISOString().substring(11, 16));
        });
      }
    });
  }

  onSubmit() {
    this.save();
  }

  displayFilteredRestStops() {
    if (this.displayStopEditForm === true) {
      return;
    }
    this.restBusstops = this.restBusstops.filter((stop1: Busstop) => {
      let result = true;
      this.selectedBusstops.forEach((stop2: Busstop) => {
        if (stop1.stopId === stop2.stopId) {
          result = false;
          return;
        }
      });

      return result;
    });

    this.displayStopEditForm = true;
  }

  moveToSelected(index: number) {
    this.selectedBusstops.push(this.restBusstops[index]);
    this.restBusstops.splice(index, 1);
  }

  moveToRest(index: number) {
    this.restBusstops.push(this.selectedBusstops[index]);
    this.selectedBusstops.splice(index, 1);
    this.selectedDeltas.splice(index, 1);
  }

  private save() {
    this.routeService.add(this.route).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });

    let arr: any = [];
    for (let i = 0; i < this.selectedBusstops.length; i++) {
      let form: any = {
        order: 0,
        busstopByStopId: null,
        timeDelta: '',
        routeByRouteId: null
      }

      form.order = i + 1;
      form.busstopByStopId = this.selectedBusstops[i];
      form.timeDelta = new Date(`1971-01-02T${this.selectedDeltasStr[i]}:00.000+03:00`);
      form.routeByRouteId = this.route;

      arr.push(form);
    }

    this.routeBusstopService.updateById(this.route.routeId, arr).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });

    this.navigateToList();
  }

  delete() {
    this.routeBusstopService.deleteAllById(this.id).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });

    this.routeService.delete(this.id).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });

    this.navigateToList();
  }

  navigateToList() {
    this.router.navigate(['routemanagement']);
  }

}
