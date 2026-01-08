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



@Component({
    selector:'maskan-unite',
    templateUrl:'./unite-type.component.html'
})


export class UniteTypeComponent implements OnInit{
  
  blocks:UniteBlock[];
  uniteTypes:UniteType[];
  UniteType:UniteType;//new unite added
  activityValues: number[] = [0, 100];
  oldValue:UniteType;
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  uniteTypeFormGroup:FormGroup;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  
  createUniteType()
  {
    console.log(this.uniteTypeFormGroup,"Ds");
     if(!this.isValid())
       return;

       this.adminService.Add("UniteType",this.uniteTypeFormGroup.value).subscribe(
        res=>this.UniteType=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.uniteTypeFormGroup.reset();
          this.uniteTypes.unshift(this.UniteType);
       //   this.messageService.add(this.UniteType);
       //   this.getAllUniteType();
        }
       )
  }
  getAllUniteTypes()
  {
    this.adminService.GetAll("UniteType").subscribe(
        res=>this.uniteTypes=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            console.log(this.loading,"loading");
        }
    )
  }
  
  getAllUniteType()
  {
    this.adminService.GetAll("UniteType").subscribe(
      res=>this.uniteTypes=res,
      eror=>console.log(eror),
     ()=>{
      this.loading=false
      console.log(this.uniteTypes,"DS")
      console.log("Complete");
     }
      
      );
    
  }

  onRowEditInit(data: UniteType) {
    this.oldValue=Object.assign({},data);
    
  }
  onRowEditCancel(data: UniteType, index: number) {
    this.uniteTypes[index]=this.oldValue;
  }
 

onRowEditSave(data: UniteType) {
let isValid=this.globalService.dataInputValidation(data.name);
  if(!isValid)
    {
        this.globalService.errorMessage("Name Is Not Valid");
        this.dt.initRowEdit(data);
        return;
    }
  this.adminService.edit("UniteType",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("UniteType",id).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{
      this.UpdateTableAfterDelete(index);
      console.log(this.uniteTypes,"After Delete");
      console.log("Deleted");
    }
  )
}
UpdateTableAfterDelete(index:number)
{
  this.uniteTypes.splice(index,1);
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
  return this.uniteTypeFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.uniteTypeFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.uniteTypeFormGroup=this.fb.group({
        
        name:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
       
        

      });
    
       
        
        this.getAllUniteType();
    
    }

}