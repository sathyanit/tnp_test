import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../cars.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class CarDetailsComponent {
  car: any;
  carId: any;

  constructor(
    private route: ActivatedRoute, private carService: CarService
  ) {}

  ngOnInit(): void {
    //this.getDetails();
    this.route.paramMap.subscribe((params) => {
      this.carId = parseInt(params.get('id') || '', 10);
      this.fetchItemDetails();
    });
  }

  getDetails() {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.car = this.carService.getTodoById(id);
    this.route.paramMap.subscribe((params) => {
      this.carId = parseInt(params.get('id') || '', 10);
      this.carService.getCarById(this.carId).subscribe((data:any) => {
        this.car = data;
      });
    });
  }

  fetchItemDetails(): void {
    this.carService.getCarById(this.carId).subscribe((data:any) => {
      this.car = data;
    });
  }
}
