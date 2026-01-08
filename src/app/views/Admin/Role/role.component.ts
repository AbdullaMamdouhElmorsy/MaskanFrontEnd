import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'

import {NamePattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import { Role } from "../interfaces/role.interface";



@Component({
    selector:'maskan-role',
    templateUrl:'./role.component.html'
})


export class RoleComponent implements OnInit{
  roles: Role[];
  role:Role;
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  RoleFormGroup:FormGroup;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  


  activityValues: number[] = [0, 100];
  createRole()
  {
    //console.log(this.usersTypes,"Ds");
     if(!this.isValid())
       return;

       this.adminService.Add("Role",this.RoleFormGroup.value).subscribe(
        res=>this.role=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.RoleFormGroup.reset();
          this.roles.unshift(this.role);
       //   this.messageService.add(this.UniteType);
       //   this.getAllUniteType();
        }
       )
  }
  getAllRoles()
  {
    this.adminService.GetAll("Role").subscribe(
        res=>this.roles=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            //console.log(this.loading,"loading");
        }
    )
  }
  
 
  onRowEditInit(data: Role) {
   console.log(data,"Init");
}

onRowEditSave(data: Role) {
    var isValid=this.globalService.dataInputValidation(data.name);
    if(!isValid)
    {
        this.globalService.errorMessage("Name Is Not Valid");
        return;
    }
   

  this.adminService.edit("Role",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("Role",id).subscribe(
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
  this.roles.splice(index,1);
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
  return this.RoleFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.RoleFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.RoleFormGroup=this.fb.group({
        
        name:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
       
        

      });
    
       
        
        this.getAllRoles();
    
    }

}