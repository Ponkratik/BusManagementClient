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

  constructor(private busService: BusService, private router: Router) { }

  ngOnInit(): void {
    this.getAll()
  }

  private getAll() {
    this.busService.getAll().subscribe({
      next: data => {
        this.buses = data;
      },
      error: error => {

      }
    })
  }

  navigateAdd() {
    this.router.navigate(['busmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['busmanagement/update', id])
  }

}
