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
      dataSize:new FormControl(null,Validators.required),
      dataScale:new FormControl(null,Validators.required),
      encrypted:new FormControl(false),
      distortion:new FormControl(null),
      comments:new FormControl(null)
    });

    this.reactiveForm.get("dataType")?.valueChanges.pipe().subscribe();
    
  }
 
  constructor(private api:ApiService){
  }


  selectedDataType:string=''
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

  handleSelectChange(event:any){
    
    this.reactiveForm.get("dataType").valueChanges
    .subscribe(value=>{ 
      this.reactiveForm.get('dataSize').setValidators(Validators.required);
      this.reactiveForm.get('dataSize').enable()
      this.reactiveForm.get('dataSize').updateValueAndValidity()
      this.reactiveForm.get('dataScale').setValidators(Validators.required)
      this.reactiveForm.get('dataScale').enable()
      this.reactiveForm.get('dataScale').updateValueAndValidity()  
      
      if(value=='Date' || value=='Unique Identifier'){
        this.reactiveForm.get('dataSize').clearValidators();
        this.reactiveForm.get('dataSize').reset()
        this.reactiveForm.get('dataSize').disable()
        this.reactiveForm.get('dataSize').updateValueAndValidity()
        this.reactiveForm.get('dataScale').clearValidators()
        this.reactiveForm.get('dataScale').reset()
        this.reactiveForm.get('dataScale').disable()
        this.reactiveForm.get('dataScale').updateValueAndValidity()

      }else if(value == 'Integer' || value == 'Text'){
        this.reactiveForm.get('dataScale').clearValidators()
        this.reactiveForm.get('dataScale').reset()
        this.reactiveForm.get('dataScale').disable()
        this.reactiveForm.get('dataScale').updateValueAndValidity() 
      }
    }
    );

  }
  


}
