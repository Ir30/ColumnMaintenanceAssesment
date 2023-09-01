import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-columns',
  templateUrl: './search-columns.component.html',
  styleUrls: ['./search-columns.component.css']
})
export class SearchColumnsComponent  {

  ngOnInit() {
    this.getTableNames();
  }

  constructor(private api:ApiService,private dataService:DataService){
  }

  selectedTableName:string=""
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

  tableId:string=''
  
  getColumnDetailesByTableId = (id:string,name:string) =>{
    this.api.getColumnByTableId(id).subscribe(
      (response:any)=>{
        this.columnDetailes=response[0].aocolumns
        this.lengthofData = this.columnDetailes.length
        this.tableId=id
        this.selectedTableName=name
      }
    )
  }
 
  deleteColumn =(id:string,name:string)=>{
    this.api.deleteColumn(id).subscribe(
      (response:any)=>{
        if(response){
          alert("Column "+name+" deleted successfully")
          this.getColumnDetailesByTableId(this.tableId,name)
          this.selectedTableName=""
        }
        
      }
    )
  }

  sendColumnData=(data:any)=>{
    this.dataService.setColumnData(data)    
  }

}
