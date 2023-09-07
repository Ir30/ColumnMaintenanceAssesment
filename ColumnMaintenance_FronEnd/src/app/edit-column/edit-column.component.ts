import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms'
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
      name:new FormControl(this.columnData.name,Validators.required),
      dataType:new FormControl(this.columnData.dataType,Validators.required),
      dataSize:new FormControl(this.columnData.dataSize),
      dataScale:new FormControl(this.columnData.dataScale),
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
  selectedDataType:string=''
  size:number=null
  scale:number=null

  

  tableId:string=this.columnData.tableId
  onClickTableSelect =(id:string,name:string)=>{
    this.tableId = id
    this.tableName=name   
  }

  isSubmitted:boolean=false
  onSubmit=()=>{
    this.isSubmitted=true
    if(this.reactiveForm.valid){
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
    }else{
      alert("Please enter required data")
    }
   
  }

  getColumnDataForEdit=()=>{
    this.columnData=this.dataService.getColumnData()    
  }

  handleSelectChange(event:any){ 
    this.reactiveForm.get("dataType").valueChanges
    .subscribe(value=>{     
      this.reactiveForm.get('dataSize').clearValidators()
      this.reactiveForm.get('dataSize').disable()
      this.reactiveForm.get('dataSize').updateValueAndValidity()
      this.reactiveForm.get('dataScale').clearValidators()
      this.reactiveForm.get('dataScale').disable()
      this.reactiveForm.get('dataScale').updateValueAndValidity() 
      this.size=null
      this.scale=null  
      if(value=='Decimal'){
        this.reactiveForm.get('dataSize').setValidators([Validators.required])
        this.reactiveForm.get('dataSize').updateValueAndValidity()
        this.reactiveForm.get('dataSize').enable()
        this.reactiveForm.get('dataScale').setValidators([Validators.required])
        this.reactiveForm.get('dataScale').updateValueAndValidity()
        this.reactiveForm.get('dataScale').enable()
      }else if(value == 'Integer' || value == 'Text'){
        this.reactiveForm.get('dataSize').setValidators([Validators.required])
        this.reactiveForm.get('dataSize').updateValueAndValidity() 
        this.reactiveForm.get('dataSize').enable()
      }      
    }
    );
  }
  ChangeTableId=(id:string)=>{
    this.columnData.tableId=id
  }

  isRequiredField(field: string) {
    const form_field = this.reactiveForm.get(field);
    if (!form_field.validator) {
        return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return (validator && validator['required']);
}
}
