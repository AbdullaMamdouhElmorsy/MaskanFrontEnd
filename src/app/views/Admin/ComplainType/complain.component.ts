import { AfterViewInit, Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import { ComplainType } from '../interfaces/complainType.interface';
import {UniteType} from '../interfaces/uniteType.interface';
import {NamePattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
declare var $: any;



@Component({
    selector:'maskan-unite',
    templateUrl:'./complain-type.component.html'
})


export class ComplainTypeComponent implements OnInit {
  ComplainTypes: ComplainType[];
  oldValue:ComplainType;
  newComplainType:ComplainType;//new unite added
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  complainTypeFormGroup:FormGroup;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  

  activityValues: number[] = [0, 100];
  createComplainType()
  {
    console.log(this.complainTypeFormGroup,"Ds");
     if(!this.isValid())
       return;

       this.adminService.Add("ComplainType",this.complainTypeFormGroup.value).subscribe(
        res=>this.newComplainType=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.complainTypeFormGroup.reset();
          this.ComplainTypes.unshift(this.newComplainType);
       //   this.messageService.add(this.UniteType);
       //   this.getAllUniteType();
        }
       )
  }
  
 
  getAllComplainTypes()
  {
    this.adminService.GetAll("ComplainType").subscribe(
        res=>this.ComplainTypes=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            console.log(this.loading,"loading");
        }
    )
  }
  
  onRowEditInit(data: ComplainType) {
    this.oldValue=Object.assign({},data);
    
  }
  onRowEditCancel(data: ComplainType, index: number) {
    this.ComplainTypes[index]=this.oldValue;
 }

onRowEditSave(data: ComplainType) {
let isValid=this.globalService.dataInputValidation(data.name);
  if(!isValid)
    {
        this.globalService.errorMessage("Name Is Not Valid");
        this.dt.initRowEdit(data);
        return;
    }
  this.adminService.edit("ComplainType",data).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{

      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("ComplainType",id).subscribe(
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
  this.ComplainTypes.splice(index,1);
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
  return this.complainTypeFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.complainTypeFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.complainTypeFormGroup=this.fb.group({
        
        name:[null,[Validators.required,Validators.pattern(NamePattrenValidation)]],
       
        

      });
    
       
        
        this.getAllComplainTypes();
       
    
    }

}