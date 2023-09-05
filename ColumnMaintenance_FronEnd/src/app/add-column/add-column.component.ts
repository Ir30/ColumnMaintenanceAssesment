import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl,FormGroup,Validators } from '@angular/forms'
import { Aocolumn } from '../models/aocolumn.model';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css']
})
export class AddColumnComponent  {

  ngOnInit() {
    this.getTableNames();
    this.reactiveForm = new FormGroup({
      id:new FormControl('00000000-0000-0000-0000-000000000000'),
      tableName:new FormControl(null),
      name:new FormControl(null,Validators.required),
      dataType:new FormControl(null,Validators.required),
      dataSize:new FormControl(null),
      dataScale:new FormControl(null),
      encrypted:new FormControl(false),
      distortion:new FormControl(null),
      comments:new FormControl(null)
    });
  }
 
  constructor(private api:ApiService){
  }



  reactiveForm:FormGroup;
  tableId:string=''
  
  onClickTableSelect =(id:string,name:string)=>{
    this.tableId = id
    this.reactiveForm.value.tableName=name    
  }

  tableNames:any=[]
  getTableNames = ()=>{
    this.api.getTableNames().subscribe(
      (response:any)=>{
        this.tableNames=response
      }
    )
  }

  onSubmit=()=>{
    if(this.tableId==''){
      alert("please select a table")
    }
    else{
      const column = new Aocolumn();

      column.id=this.reactiveForm.value.id
      column.name=this.reactiveForm.value.name
      column.tableId=this.tableId
      column.type="User"
      column.description=""
      column.dataType=this.reactiveForm.value.dataType 
      column.dataSize=this.reactiveForm.value.dataSize 
      column.dataScale=this.reactiveForm.value.dataScale 
      column.comment=this.reactiveForm.value.comments
      column.encrypted=Number(this.reactiveForm.value.encrypted) 
      column.distortion=this.reactiveForm.value.distortion 


      this.api.addColumn(column).subscribe(
        (response:any)=>{
          if(response){
            alert("Column added successfully")
          }else{
            alert("Something went wrong!!!")
          }
        }
      )
    }
    
  }


}
