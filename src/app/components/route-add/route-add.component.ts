import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Busstop } from 'src/app/models/busstop.model';
import { Route } from 'src/app/models/route.model';
import { BusstopService } from 'src/app/_services/busstop.service';
import { RouteService } from 'src/app/_services/route.service';
import { RoutebusstopService } from 'src/app/_services/routebusstop.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.component.html',
  styleUrls: ['./route-add.component.sass']
})
export class RouteAddComponent implements OnInit {
  route: Route = new Route;

  restBusstops: Busstop[] = [];
  selectedBusstops: Busstop[] = [];
  selectedDeltas: Time[] = [];

  isSuccessful = false;
  errorMessage = '';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private routeService: RouteService, private routeBusstopService: RoutebusstopService, private busstopService: BusstopService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken() 
    && (this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_DISPATCHER"
    || this.tokenStorageService.getUser().roleByRoleId[0].roleName === "ROLE_SYSADMIN");
    
    
    this.busstopService.getAll().subscribe({
      next: data => {
        this.restBusstops = data;
      },
      error: error => {

      }
    });
  }

  onSubmit() {
    this.save();
  }

  moveToSelected(index: number) {
    this.selectedBusstops.push(this.restBusstops[index]);
    this.selectedDeltas.push();
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
    for(let i = 0; i < this.selectedBusstops.length; i++) {
      let form: any = {
        order: 0,
        busstopByStopId: null,
        timeDelta: '',
        routeByRouteId: null
      }

      form.order = i + 1;
      form.busstopByStopId = this.selectedBusstops[i];
      form.timeDelta = `${this.selectedDeltas[i]}:00`;
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

  navigateToList() {
    this.router.navigate(['routemanagement']);
  }

}
