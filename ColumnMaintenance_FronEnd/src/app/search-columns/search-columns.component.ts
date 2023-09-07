import { Component, HostListener } from '@angular/core';
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
    if(localStorage.getItem("tableName")){
      this.selectedTableName=localStorage.getItem("tableName")
    }
    
    if(localStorage.getItem('tableId')!=null){
      this.getColumnDetailesByTableId(localStorage.getItem('tableId'),localStorage.getItem('tableName'))
    }
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
    this.page=1
  }

  tableId:string=''
  
  getColumnDetailesByTableId = (id:string,name:string) =>{
    this.api.getColumnByTableId(id).subscribe(
      (response:any)=>{        
        this.columnDetailes=response[0].aocolumns
        this.lengthofData = this.columnDetailes.length
        this.tableId=id
        this.selectedTableName=name
        localStorage.setItem("tableName",name)
        localStorage.setItem("tableId",id)
      }
    )
  }
 
  deleteColumn =(id:string,name:string)=>{
      if(confirm("Are you sure to delete "+name)) {
        this.api.deleteColumn(id).subscribe(
          (response:any)=>{
            if(response){
              alert("Column "+name+" deleted successfully")
              this.getColumnDetailesByTableId(this.tableId,this.selectedTableName)
            }
            
          }
        )
      }
  }

  sendColumnData=(data:any)=>{
    this.dataService.setColumnData(data)
    localStorage.setItem("currentPage",JSON.stringify(this.page))      
  }

  onbeforeunload = function() {
     localStorage. removeItem("columnData");
     localStorage. removeItem("tableName"); 
     localStorage. removeItem("currentPage"); 
     return ''; };

     @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
      
     localStorage. removeItem("tableName"); 
     localStorage. removeItem("currentPage");
     localStorage. removeItem("tableId"); 

  }
}
