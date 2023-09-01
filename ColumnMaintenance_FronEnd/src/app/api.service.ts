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

  getColumnByTableId =(id:string)=>{
    return this.http.get("https://localhost:7049/api/Table/"+id);
  }

  addColumn = (data:any)=>{
    return this.http.post("https://localhost:7049/api/Column",data)
  }

  deleteColumn = (id:string)=>{
    return this.http.delete("https://localhost:7049/api/Column/"+id)
  }

  editColumn = (data:any,id:string)=>{
    return this.http.put("https://localhost:7049/api/Column/"+id,data)
  }

  
}
