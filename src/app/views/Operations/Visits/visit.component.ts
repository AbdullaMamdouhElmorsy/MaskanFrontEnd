import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service';
import { Visit } from "../interfaces/visit.interface";
import { OperationService } from "../Services/operation.service";
import { PhoneNumberValidation } from "src/app/Global/Pattren/regex";
declare var $: any;



@Component({
    selector:'maskan-request',
    templateUrl:'./visit.component.html'
})


export class VisitComponent implements OnInit{
    visits: Visit[];
    filerName="Visits"
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  updateRequestFormGroup:FormGroup;
  filterVisitFormGroup:FormGroup;

  @ViewChild('dt') dt: Table;
  constructor(
    private operationService:OperationService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  

  activityValues: number[] = [0, 100];
  exportexcel(): void
  {
    
     this.globalService.exportexcel("visit-table-op","Visits");
 
  }
  
  getAllvisits()
  {
    this.operationService.GetAll("Visit").subscribe(
        res=>this.visits=res,
       
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            console.log(this.visits,"Co")
            
        }
    )
  }
 
  
  Done(visistId:number)
  {
    console.log(visistId,"IOd");
   
     this.operationService.VisisDone(visistId).subscribe(
        res=>res,
        error=>console.log(error),
        ()=>{
             
            this.globalService.EditSuccessfullyMessage();
          
        
        }
     )
  }
  
  
  filterVisit()
  {
      if(!this.isValidFilter())
         return;
       this.convertDate();
       let filters=this.globalService.remove_NullValuesFromFormGroup(this.filterVisitFormGroup);
       this.operationService.visit_Filter(filters).subscribe(
        res=>this.visits=res,
        error=>console.log(error),
        ()=>{
           this.loading=false;
        }
       )

  }

  convertDate()
  {
    let dateTime=this.filterVisitFormGroup.get("CreatedDate")?.value;
   
      this.filterVisitFormGroup.get("CreatedDate")?.setValue(this.globalService.conver_DateTimeToIsoDate(dateTime));
      this.filterVisitFormGroup.get("CreatedDate")?.updateValueAndValidity();
  }





delete(id:number,index:number)
{
  this.operationService.delete("Visit",id).subscribe(
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
  this.visits.splice(index,1);
}
confirmDelete(dataName:string,id:number,index:number)
{
  this.globalService.confirmDelete(dataName,
    ()=>{
      this.delete(id,index)
    }
    );
}
isValidFilter()
{
  return this.filterVisitFormGroup.valid;
}
pattrenValidation(fromControlName:any){
  return this.filterVisitFormGroup.get(fromControlName)?.errors?.["pattern"];
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


    ngOnInit(): void {
      
      this.filterVisitFormGroup=this.fb.group({
        CarNumber:[null],
        UniteCode:[null],
        PhoneNumber:[null,Validators.pattern(PhoneNumberValidation)],
        CreatedDate:[this.globalService.get_CurrentDate(),Validators.required],
        VisiorNationalId:[null]

       })
       
        
       // this.getAllvisits();
        this.filterVisit();
        //console.log(this.globalService.getCurrentDate().toISOString().split('T')[0])
    
    }

}