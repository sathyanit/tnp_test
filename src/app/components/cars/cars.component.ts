import { Component } from '@angular/core';
import { CarService } from '../cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  cars: any[] = [];
  searchTerm: string = '';
  searchResults: any;
  currentPage: number = 1;
  itemsPerPage: number = 2; // Number of items per page
  totalPages:any;

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log('end index>>',endIndex)
    return this.cars.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }


  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
    this.getList();
  }

  getCars() {
    this.carService.dataList$.subscribe(dataList => {
      this.cars = dataList;
    });    
  }
   getList(){
    this.carService.getListData().subscribe(
      (data: any) => {
        this.cars = data; // Assuming the response is an array
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
   }

}
