import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}

  getTableNames =()=>{
    return this.http.get("https://localhost:7049/api/Table/getAllTableNames");
  }
}
