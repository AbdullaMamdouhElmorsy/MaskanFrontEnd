import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import { RequestType } from '../interfaces/request.interface';
import {UniteType} from '../interfaces/uniteType.interface';
import {NamePattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'



@Component({
    selector:'maskan-unite',
    templateUrl:'./request-type.component.html'
})


export class RequestTypeComponent implements OnInit{
  RequestTypes: RequestType[];
  oldValue:RequestType;
  newRequestType:RequestType;//new unite added
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  requestTypeFormGroup:FormGroup;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  

  activityValues: number[] = [0, 100];
  createRequestType()
  {
   
     if(!this.isValid())
       return;

       this.adminService.Add("RequestType",this.requestTypeFormGroup.value).subscribe(
        res=>this.newRequestType=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.requestTypeFormGroup.reset();
          this.RequestTypes.unshift(this.newRequestType);
       //   this.messageService.add(this.UniteType);
       //   this.getAllUniteType();
        }
       )
  }
  getAllRequestTypes()
  {
    this.adminService.GetAll("RequestType").subscribe(
        res=>this.RequestTypes=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
           
        }
    )
  }
  
  onRowEditInit(data: RequestType) {
    this.oldValue=Object.assign({},data);
    
  }
  onRowEditCancel(data: RequestType, index: number) {
    this.RequestTypes[index]=this.oldValue;
 }

  

onRowEditSave(data: RequestType) {
let isValid=this.globalService.dataInputValidation(data.name);
  if(!isValid)
    {
        this.globalService.errorMessage("Name Is Not Valid");
        this.dt.initRowEdit(data);
        return;
    }
   
  this.adminService.edit("RequestType",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("RequestType",id).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{
      this.UpdateTableAfterDelete(index);
      
     // console.log("Deleted");
    }
  )
}
UpdateTableAfterDelete(index:number)
{
  this.RequestTypes.splice(index,1);
}
confirmDelete(dataName:string,id:number,index:number)
{
  this.globalService.confirmDelete(dataName,
    ()=>{
      this.delete(id,index)
    }
    );
}


  /*----------Rotate the Icon of Header Cards-----------------------*/
slideToggle(slideName:string){
  console.log(slideName,"Name")
  if(slideName=='add')
      this.rotateAddIcon=!this.rotateAddIcon;
      else
          this.rotateTableIcon=!this.rotateTableIcon
}

pattrenValidation(fromControlName:any){
  return this.requestTypeFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.requestTypeFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.requestTypeFormGroup=this.fb.group({
        
        name:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
        neededApprove:[false,[Validators.required]]
        

      });
    
       
        
        this.getAllRequestTypes();
    
    }

}