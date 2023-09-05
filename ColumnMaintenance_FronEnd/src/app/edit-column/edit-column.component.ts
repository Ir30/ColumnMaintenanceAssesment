import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl,FormGroup,Validators } from '@angular/forms'
import { DataService } from '../data.service';
import { Aocolumn } from '../models/aocolumn.model';


@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.css']
})
export class EditColumnComponent {

  ngOnInit() {
    this.getColumnDataForEdit();
    this.reactiveForm = new FormGroup({
      name:new FormControl(this.columnData.name),
      dataType:new FormControl(this.columnData.dataType),
      dataSize:new FormControl(this.columnData.dataSize),
      dataScale:new FormControl(this.columnData.dataScale),
      encrypted:new FormControl(Boolean(this.columnData.encrypted)),
      distortion:new FormControl(this.columnData.distortion),
      comments:new FormControl(this.columnData.comment)
    });
  }

  constructor(private api:ApiService,private dataService:DataService){}

  reactiveForm:FormGroup;
  tableName:string=localStorage.getItem('tableName')
  columnData:any={}

  onSubmit=()=>{
    const column = new Aocolumn();

    column.tableId=this.columnData.tableId
    column.name=this.reactiveForm.value.name
    column.type="User"
    column.description=""
    column.dataType=this.reactiveForm.value.dataType 
    column.dataSize=this.reactiveForm.value.dataSize 
    column.dataScale=this.reactiveForm.value.dataScale 
    column.comment=this.reactiveForm.value.comments
    column.encrypted=Number(this.reactiveForm.value.encrypted) 
    column.distortion=this.reactiveForm.value.distortion 
    
    this.api.editColumn(column,this.columnData.id).subscribe(
      (response:any)=>{
        if(response){
          alert("Updated the data successfully")
        }else{
          alert("Update failed. Something went wrong!!!")
        }
      }
    )
  }

  getColumnDataForEdit=()=>{
    this.columnData=this.dataService.getColumnData()    
  }

 

  ChangeTableId=(id:string)=>{
    this.columnData.tableId=id
  }
}
