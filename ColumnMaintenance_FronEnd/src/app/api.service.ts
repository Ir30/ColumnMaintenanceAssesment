import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aocolumn } from './models/aocolumn.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl:any = environment.apiUrls
  constructor(private http:HttpClient) {}

  getTableNames =()=>{
    return this.http.get(this.apiUrl.getAllTableNames);
  }

  getColumnByTableId =(id:string)=>{    
    return this.http.get(this.apiUrl.getColumnByTableId+id);
  }

  addColumn = (data:Aocolumn)=>{
    return this.http.post(this.apiUrl.addColumn,data)
  }

  deleteColumn = (id:string)=>{
    return this.http.delete(this.apiUrl.deleteColumn+id)
  }

  editColumn = (data:Aocolumn,id:string)=>{
    return this.http.put(this.apiUrl.editColumn+id,data)
  }

  
}
