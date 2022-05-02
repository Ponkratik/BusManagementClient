import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { Route } from 'src/app/models/route.model';
import { Trip } from 'src/app/models/trip.model';
import { User } from 'src/app/models/user.model';
import { BusService } from 'src/app/_services/bus.service';
import { RouteService } from 'src/app/_services/route.service';
import { TripService } from 'src/app/_services/trip.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.sass']
})
export class TripUpdateComponent implements OnInit {

  id!: number;
  trip: Trip = new Trip();

  routes?: Route[];
  routeStr?: string;
  users?: User[];
  userStr?: string
  buses?: Bus[];
  busStr?: string;

  form1: any = {
    dateStr: '',
    timeStr: ''
  };

  isSuccessful = false;
  errorMessage = '';

  constructor(private tripService: TripService, private routeService: RouteService, private userService: UserService, private busService: BusService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeService.getAll().subscribe({
      next: data => {
        this.routes = data;        
      }
    });

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

    this.id = this.route.snapshot.params['id'];

    this.tripService.getById(this.id).subscribe({
      next: data => {
        console.log(data);
        this.trip = data;
        this.routeStr = this.trip.routeByRouteId.routeId.toString();
        this.userStr = this.trip.userByUserId.lastName + ' ' + this.trip.userByUserId.firstName + ' ' + this.trip.userByUserId.surName;
        this.busStr = this.trip.busByBusId.busModel + ' ' + this.trip.busByBusId.number;
        this.form1.dateStr = this.trip.depTime.toString().split('T')[0];
        let h: number = (new Date(this.trip.depTime).getUTCHours() + 3) % 24;
        let m: number = new Date(this.trip.depTime).getUTCMinutes();
        let timeStr: string;
        if (h.toString().length === 1) {
          timeStr = '0' + h + ':';
        } else {
          timeStr = h + ':';
        }

        if (m.toString().length === 1) {
          timeStr += '0' + m ;
        } else {
          timeStr += m;
        }

        this.form1.timeStr = timeStr;
        console.log(this.form1);
      },
      error: error => {

      }
    });

  }

  onSubmit(event: any) {
    this.trip.routeByRouteId = this.routes!.filter((route: Route) => route.routeId === Number.parseInt(event.target.routeByRouteId.value))[0];
    this.trip.userByUserId = this.users!.filter((user: User) => user.lastName + ' ' + user.firstName + ' ' + user.surName === event.target.userByUserId.value)[0];
    this.trip.busByBusId = this.buses!.filter((bus: Bus) => bus.busModel + ' ' + bus.number === event.target.busByBusId.value)[0];
    this.trip.depTime = new Date(Date.parse(this.form1.dateStr + 'T' + this.form1.timeStr + ':00.000+03:00'));
    this.save();
  }

  save() {
    this.tripService.update(this.id, this.trip).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        console.log(error);
        this.isSuccessful = false;
        this.errorMessage = error.message;
      }
    });
  }

  delete() {
    console.log(this.trip);
    // this.tripService.delete(this.id).subscribe({
    //   next: data => {
    //     this.isSuccessful = true;
    //     this.navigateToList();
    //   },
    //   error: error => {
    //     console.log(error);
    //     this.isSuccessful = false;
    //     this.errorMessage = error.message;
    //   }
    // });
  }

  navigateToList() {
    this.router.navigate(['tripmanagement']);
  }
}
