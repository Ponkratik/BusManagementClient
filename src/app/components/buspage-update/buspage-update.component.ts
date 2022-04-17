import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/_services/bus.service';

@Component({
  selector: 'app-buspage-update',
  templateUrl: './buspage-update.component.html',
  styleUrls: ['./buspage-update.component.sass']
})
export class BuspageUpdateComponent implements OnInit {

  id!: number;
  bus: Bus = new Bus();

  isSuccessful = false;
  errorMessage = '';

  constructor(private busService: BusService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.busService.getById(this.id).subscribe({
      next: data => {
        this.bus = data;
      },
      error: error => {

      }
    });
  }

  onSubmit() {
    this.save();
  }

  save() {
    this.busService.update(this.id, this.bus).subscribe({
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
    this.busService.delete(this.id).subscribe({
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

  navigateToList() {
    this.router.navigate(['busmanagement']);
  }

}
