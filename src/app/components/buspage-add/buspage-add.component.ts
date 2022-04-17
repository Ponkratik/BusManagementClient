import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/_services/bus.service';

@Component({
  selector: 'app-buspage-add',
  templateUrl: './buspage-add.component.html',
  styleUrls: ['./buspage-add.component.sass']
})
export class BuspageAddComponent implements OnInit {
  bus: Bus = new Bus();

  isSuccessful = false;
  errorMessage = ''

  constructor(private busService: BusService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.save();
  }

  save() {
    this.busService.add(this.bus).subscribe({
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
    this.router.navigate(['busmanagement']);
  }

}
