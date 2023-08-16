import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  //private carsUrl = 'assets/cars.json';
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { 
    
  }

  // getCars(): Observable<any[]> {
  //   return this.http.get<any[]>(this.carsUrl);
  // }

  getListData(): Observable<any> {
    const url = `${this.apiUrl}/api/data`; 
    return this.http.get(url);
  }

  getCarById(id: number) {
    const url =`${this.apiUrl}/api/data/${id}`; 
    return this.http.get(url);
  }

  getCarByTitle(title:string) {
    const url =`${this.apiUrl}/search?q=${title}`; 
    return this.http.get(url);
  }


  private dataListSubject = new BehaviorSubject<any[]>([]);
  dataList$ = this.dataListSubject.asObservable();

  updateDataList(data: any[]) {
    this.dataListSubject.next(data);
  }

  addCar(car: any): Observable<any> {
    //add the JSON data and sending a POST request
    const url =`${this.apiUrl}/addData`;
    return this.http.post<any>(url, car);
  }

  updateCar(car: any): Observable<any> {
    // updating the JSON data and sending a PUT request
    const url =`${this.apiUrl}/api/update/${car.id}`;
    return this.http.put<any>(url, car);
  }
}
