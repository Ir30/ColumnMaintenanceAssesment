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
  getTableNames = ()=>{
    this.api.getTableNames().subscribe(
      (response:any)=>{
        this.tableNames=response
        console.log(response[0])
      }
    )
  }


}
