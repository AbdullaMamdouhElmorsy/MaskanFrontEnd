import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import {UniteType} from '../interfaces/uniteType.interface';
import {NamePattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import { UserType } from "../interfaces/userType.interface";



@Component({
    selector:'maskan-unite',
    templateUrl:'./user-type.component.html'
})


export class UserTypeComponent implements OnInit{
  usersTypes: UserType[];
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  userTypeFormGroup:FormGroup;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  


  UserType:UniteType;//new unite added
  activityValues: number[] = [0, 100];
  createuserType()
  {
    //console.log(this.usersTypes,"Ds");
     if(!this.isValid())
       return;

       this.adminService.Add("UserType",this.userTypeFormGroup.value).subscribe(
        res=>this.UserType=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.userTypeFormGroup.reset();
          this.usersTypes.unshift(this.UserType);
       //   this.messageService.add(this.UniteType);
       //   this.getAllUniteType();
        }
       )
  }
  getAllUserTypes()
  {
    this.adminService.GetAll("UserType").subscribe(
        res=>this.usersTypes=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            //console.log(this.loading,"loading");
        }
    )
  }
  
 
  onRowEditInit(data: UserType) {
   console.log(data,"Init");
}

onRowEditSave(data: UserType) {
    var isValid=this.globalService.dataInputValidation(data.name);
    if(!isValid)
    {
        this.globalService.errorMessage("Name Is Not Valid");
        return;
    }
   

  this.adminService.edit("UserType",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}

onRowEditCancel(data:UniteType , index: number) {
    console.log(data,index,"Cancel");
}
delete(id:number,index:number)
{
  this.adminService.delete("UserType",id).subscribe(
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
  this.usersTypes.splice(index,1);
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
  return this.userTypeFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.userTypeFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.userTypeFormGroup=this.fb.group({
        
        name:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
       
        

      });
    
       
        
        this.getAllUserTypes();
    
    }

}