import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-columns',
  templateUrl: './search-columns.component.html',
  styleUrls: ['./search-columns.component.css']
})
export class SearchColumnsComponent  {

  ngOnInit() {
    this.getTableNames();
  }

  constructor(private api:ApiService){
  }

  tableNames:any=[]
  columnDetailes:any =[]
  page: number = 1
  lengthofData = 0;
  searchText=''

  getTableNames = ()=>{
    this.api.getTableNames().subscribe(
      (response:any)=>{
        this.tableNames=response
      }
    )
  }

  
  
  getColumnDetailesByTableId = (id:string) =>{
    this.api.getColumnByTableId(id).subscribe(
      (response:any)=>{
        console.log(response);
        this.columnDetailes=response[0].aocolumns
        this.lengthofData = this.columnDetailes.length
      }
    )
  }

}
