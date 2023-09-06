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
    this.getTableNames();
    this.getColumnDataForEdit();
    this.reactiveForm = new FormGroup({
      name:new FormControl(this.columnData.name,Validators.required),
      dataType:new FormControl(this.columnData.dataType,Validators.required),
      dataSize:new FormControl(this.columnData.dataSize,Validators.required),
      dataScale:new FormControl(this.columnData.dataScale,Validators.required),
      encrypted:new FormControl(Boolean(this.columnData.encrypted)),
      distortion:new FormControl(this.columnData.distortion),
      comments:new FormControl(this.columnData.comment)
    });
    this.selectedDataType=this.reactiveForm.get("dataType").value
  }

  constructor(private api:ApiService,private dataService:DataService){}

  reactiveForm:FormGroup;
  tableName:string=localStorage.getItem('tableName')
  columnData:any={}
  tableNames:any=[]
  selectedDataType:string=''

  getTableNames = ()=>{
    this.api.getTableNames().subscribe(
      (response:any)=>{
        this.tableNames=response
      }
    )
  }

  tableId:string=this.columnData.tableId
  onClickTableSelect =(id:string,name:string)=>{
    this.tableId = id
    this.tableName=name   
  }

  onSubmit=()=>{
    const column = new Aocolumn();

    column.tableId=this.tableId
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

  handleSelectChange(event:any){
    
    this.reactiveForm.get("dataType").valueChanges
    .subscribe(value=>{ 
      this.reactiveForm.get('dataSize').setValidators(Validators.required);
      this.reactiveForm.get('dataSize').updateValueAndValidity()
      this.reactiveForm.get('dataScale').setValidators(Validators.required)
      this.reactiveForm.get('dataScale').updateValueAndValidity()  
      
      if(value=='Date'){
        this.reactiveForm.get('dataSize').clearValidators();
        this.reactiveForm.get('dataSize').updateValueAndValidity()
        this.reactiveForm.get('dataScale').clearValidators()
        this.reactiveForm.get('dataScale').updateValueAndValidity()        
      }else if(value == 'Integer' || value == 'Text'){
        this.reactiveForm.get('dataScale').clearValidators()
        this.reactiveForm.get('dataScale').updateValueAndValidity() 
      }
    }
    );

  }

  ChangeTableId=(id:string)=>{
    this.columnData.tableId=id
  }
}
