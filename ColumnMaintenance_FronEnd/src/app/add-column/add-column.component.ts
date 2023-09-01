import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl,FormGroup,Validators } from '@angular/forms'

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css']
})
export class AddColumnComponent  {

  ngOnInit() {
    this.getTableNames();
    this.reactiveForm = new FormGroup({
      tableName:new FormControl(null),
      name:new FormControl(null,Validators.required),
      dataType:new FormControl(null,Validators.required),
      size:new FormControl(null,Validators.required),
      scale:new FormControl(null, Validators.required),
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
      const data:any={
        "id":"6f94c918-cb58-4af8-aa73-0057293c17da",
        "tableId":this.tableId,
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
      this.api.addColumn(data).subscribe(
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
