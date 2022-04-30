import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { Route } from 'src/app/models/route.model';
import { User } from 'src/app/models/user.model';
import { BusService } from 'src/app/_services/bus.service';
import { RouteService } from 'src/app/_services/route.service';
import { TripService } from 'src/app/_services/trip.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.sass']
})
export class TripAddComponent implements OnInit {
  form: any = {
    depTime: '',
    price: 0.0,
    routeByRouteId: null,
    userByUserId: null,
    busByBusId: null
  };

  form1: any = {
    dateStr: '',
    timeStr: ''
  };



  routes?: Route[];
  users?: User[];
  buses?: Bus[];

  isSuccessful = false;
  errorMessage = '';

  constructor(private tripService: TripService, private routeService: RouteService, private userService: UserService, private busService: BusService, private router: Router) { }

  ngOnInit(): void {
    this.routeService.getAll().subscribe({
      next: data => {
        this.routes = data;        
      }
    });


    //получение только водителей
    this.userService.getAll().subscribe({
      next: data => {
        this.users = data;        
      }
    });

    this.busService.getAll().subscribe({
      next: data => {
        this.buses = data;        
      }
    });
  }

  onSubmit(event: any) {
    this.form.routeByRouteId = this.routes!.filter((route: Route) => route.routeId === Number.parseInt(event.target.routeByRouteId.value))[0];
    this.form.userByUserId = this.users!.filter((user: User) => user.lastName + ' ' + user.firstName + ' ' + user.surName === event.target.userByUserId.value)[0];
    this.form.busByBusId = this.buses!.filter((bus: Bus) => bus.busModel + ' ' + bus.number === event.target.busByBusId.value)[0];
    this.form.depTime = this.form1.dateStr + 'T' + this.form1.timeStr + ':00';

    this.save();
  }

  save() {
    this.tripService.add(this.form).subscribe({
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
    this.router.navigate(['tripmanagement']);
  }

}
