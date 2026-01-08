import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import {Tenant} from '../interfaces/Tenant.interface';
import {NamePattrenValidation, NumberPattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import {UniteBlockFilter } from '../interfaces/unite-blockFilter.interface'
import { SelectItem } from "primeng/api";


@Component({
    selector:'maskan-unite',
    templateUrl:'./tenant.component.html'
})


export class TenantComponent implements OnInit{
  tenants: Tenant[];
  newTenant:Tenant;//new unite added
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  tenantFormGroup:FormGroup;
  tenantStatus:SelectItem[]=[
    {
       value:0,
        label:"In Active",
    },
    {
      value:1,
      label:"Active",
    },

];
  totalNumberOfRecords:number;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  


  
  activityValues: number[] = [0, 100];
  createTenant()
  {
    //console.log(this.usersTypes,"Ds");
     if(!this.isValid())
       return;
     this.set_StatusName();
       this.adminService.Add("Tenant",this.tenantFormGroup.value).subscribe(
        res=>this.newTenant=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.tenantFormGroup.reset();
          this.tenants.unshift(this.newTenant);
    
        }
       )
  }

  // Set Status Name Depend On Id
  set_StatusName()
  { 
    let statusId=this.tenantFormGroup.get("statusId")?.value;
    this.tenantFormGroup.get("status")?.setValue(this.get_TenantStatusLable(statusId))
  }
  getAllTenants()
  {
    this.adminService.GetAll("Tenant").subscribe(
        res=>this.tenants=res.map((tenant:Tenant)=>{
            tenant.expirationDate=tenant.expirationDate.split("T")[0]
            return tenant;
        }),
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            //console.log(this.loading,"loading");
        }
    )
  }
  get_TenantStatusLable(statudId:number)
  {
    return this.tenantStatus.find(s=>s.value==statudId)?.label;
  }
 
 

onRowEditSave(data: Tenant) {
  
  data.status=this.get_TenantStatusLable(data.statusId);
  console.log(data.status,"stat");
  this.adminService.edit("Tenant",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
     // this.getAllTenants();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("Tenant",id).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{
      this.UpdateTableAfterDelete(index);
     
      console.log("Deleted");
    }
  )
}
UpdateTableAfterDelete(index:number)
{
  this.tenants.splice(index,1);
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
  return this.tenantFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.tenantFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.tenantFormGroup=this.fb.group({
        statusId:[1,[Validators.required]],
        maxUnitesNumber:[null,[Validators.required,Validators.pattern(NumberPattrenValidation)]],
        companyName:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
        expirationDate:[null,[Validators.required]],
        status:[null]
      });

    
       
        
        this.getAllTenants();
    
    }

}