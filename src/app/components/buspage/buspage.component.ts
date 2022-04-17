import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/_services/bus.service';

@Component({
  selector: 'app-buspage',
  templateUrl: './buspage.component.html',
  styleUrls: ['./buspage.component.sass']
})
export class BuspageComponent implements OnInit {
  buses?: Bus[];
  allBuses?: Bus[];

  constructor(private busService: BusService, private router: Router) { }

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

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.buses = this.allBuses;
    } else {
      //console.log(this.buses);
      this.buses = this.buses?.filter((bus) => {
        bus.busModel?.toLowerCase().includes(filterValueLower)
        || bus.number?.toLowerCase().includes(filterValueLower)
        || bus.vin?.toLowerCase().includes(filterValueLower)
      });
      //console.log(this.buses);
    }
  }

  navigateAdd() {
    this.router.navigate(['busmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['busmanagement/update', id])
  }

}
