import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl,FormGroup,Validators } from '@angular/forms'
import { DataService } from '../data.service';


@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.css']
})
export class EditColumnComponent {

  ngOnInit() {
    this.getColumnDataForEdit();
    this.getTableNames();
    this.reactiveForm = new FormGroup({
      name:new FormControl(this.columnData.name,Validators.required),
      dataType:new FormControl(this.columnData.dataType,Validators.required),
      size:new FormControl(this.columnData.dataSize,Validators.required),
      scale:new FormControl(this.columnData.dataScale, Validators.required),
      encrypted:new FormControl(Boolean(this.columnData.encrypted)),
      distortion:new FormControl(this.columnData.distortion),
      comments:new FormControl(this.columnData.comment)
    });
  }

  constructor(private api:ApiService,private dataService:DataService){}

  reactiveForm:FormGroup;
  tableNames:any=[]
  columnData:any={}

  onSubmit=()=>{
    const data:any={
      "tableId":this.columnData.tableId,
      "name":this.reactiveForm.value.name ,
      "type":"User",
      "description":"",
      "dataType":this.reactiveForm.value.dataType ,
      "dataSize":this.reactiveForm.value.size ,
      "dataScale":this.reactiveForm.value.scale ,
      "comment":this.reactiveForm.value.comments ,
      "encrypted":Number(this.reactiveForm.value.encrypted) ,
      "distortion":this.reactiveForm.value.distortion ,
    }      
    this.api.editColumn(data,this.columnData.id).subscribe(
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

  getTableNames = ()=>{
    this.api.getTableNames().subscribe(
      (response:any)=>{
        this.tableNames=response
      }
    )
  }

  ChangeTableId=(id:string)=>{
    this.columnData.tableId=id
  }
}
