import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import {Unite} from '../interfaces/unite.interface';
import {UniteBlock} from '../interfaces/unite-block.interface';
import {UniteType} from '../interfaces/uniteType.interface';
import {NamePattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import Swal from "sweetalert2";
import { StuffType } from "../interfaces/stuff-type.interface";



@Component({
    selector:'maskan-unite',
    templateUrl:'./stuff-type.component.html'
})


export class StuffTypeComponent implements OnInit{
  stuffTypes: StuffType[];
  oldValue:StuffType;
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  stuffTypeFormGroup:FormGroup;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  
  newStuffType:StuffType;//new unite added
  activityValues: number[] = [0, 100];
  createStuffType()
  {
   // console.log(this.stuffTypeFormGroup,"Ds");
     if(!this.isValid())
       return;

       this.adminService.Add("StuffType",this.stuffTypeFormGroup.value).subscribe(
        res=>this.newStuffType=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.stuffTypeFormGroup.reset();
          this.stuffTypeFormGroup.get("isVehicle")?.setValue(false);
          this.stuffTypes.unshift(this.newStuffType);
          
        }
       )
  }
  getAllStuffTypes()
  {
    this.adminService.GetAll("StuffType").subscribe(
        res=>this.stuffTypes=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
           
        }
    )
  }
 
  onRowEditInit(data: StuffType) {
    this.oldValue=Object.assign({},data);
    
  }
  onRowEditCancel(data: StuffType, index: number) {
    this.stuffTypes[index]=this.oldValue;
 }


onRowEditSave(data: StuffType) {
let isValid=this.globalService.dataInputValidation(data.name);
  if(!isValid)
    {
        this.globalService.errorMessage("Name Is Not Valid");
        this.dt.initRowEdit(data);
        return;
    }
  this.adminService.edit("StuffType",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("StuffType",id).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{
      this.UpdateTableAfterDelete(index);
    
    }
  )
}
UpdateTableAfterDelete(index:number)
{
  this.stuffTypes.splice(index,1);
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
applyFilterGlobal(event:Event, stringVal:string) {
  console.log((event.target as HTMLInputElement).value,"search");
  this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal);
}
pattrenValidation(fromControlName:any){
  return this.stuffTypeFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.stuffTypeFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.stuffTypeFormGroup=this.fb.group({
        
        name:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
        isVehicle:[false]
        

      });
    
       
        
        this.getAllStuffTypes();
    
    }

}