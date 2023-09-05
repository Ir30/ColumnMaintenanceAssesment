import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  columnData:any=[]

  setColumnData = (data:any)=>{
    this.columnData=data
  }

  getColumnData=()=>{
    return this.columnData
  }

  

}
