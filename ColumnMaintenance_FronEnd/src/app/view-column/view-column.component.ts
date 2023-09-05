import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-column',
  templateUrl: './view-column.component.html',
  styleUrls: ['./view-column.component.css']
})
export class ViewColumnComponent {

  ngOnInit() {
    this.getColumnDetails()
    this.tableName=localStorage.getItem('tableName')
  }

  constructor(private dataService:DataService){
  }
  tableName:string=''
  columnDetails:any={}

  getColumnDetails=()=>{
    this.columnDetails = this.dataService.getColumnData()
    this.columnDetails.encrypted=Boolean(this.columnDetails.encrypted)  
  }

  
}
