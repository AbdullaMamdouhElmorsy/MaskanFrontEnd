import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {OperationService} from '../Services/operation.service'
import {Complaint } from '../interfaces/complaint.interface';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import { ComplainType } from "../../Admin/interfaces/complainType.interface";
import { NumberPattrenValidation } from "src/app/Global/Pattren/regex";
import { ActivatedRoute } from "@angular/router";
import { param } from "jquery";
import { NotificationService } from "src/app/Global/Services/notification.service";
declare var $: any;



@Component({
    selector:'maskan-unite',
    templateUrl:'./complaint.component.html'
})


export class ComplaintComponent implements OnInit{
    complaions: Complaint[];
    
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  updateComplainFormGroup:FormGroup;
  complaintypes:ComplainType[];
  UpdatedComplainIdex:number; // get index of selected Row
  complainsStatus=this.globalService.get_ComplainStatus();
  selectedComplain:Complaint;
  @ViewChild('dt') dt: Table;
  constructor(
    private opertaionService:OperationService,
    private fb:FormBuilder,
    private globalService:GlobalService,
    private router:ActivatedRoute,
     private notificationService:NotificationService
  ){}
 
  loading: boolean = true;
  complainId:number;

  activityValues: number[] = [0, 100];
  ComplainFitlerFormGroup:FormGroup;
  getAllComplains()
  {
    this.opertaionService.GetAll("Complain").subscribe(
        res=>this.complaions=res.map((a:Complaint)=>{
            switch(a.status)
            {
                case 0:
                a.status="Waiting";
                break;
                case 1:
                    a.status="InProgress";
                    break;
                case 2:
                 a.status="Solved";
                break;
            }
            a.createdDate=this.globalService.spliteDateToDateAndTime(a.createdDate)
              return a;
        }),
       
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
          //  console.log(this.complaions,"Co")
            
        }
    )
  }
  getAllComplainTypes()
  {
    this.opertaionService.GetAll("ComplainType").subscribe(
        res=>this.complaintypes=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            console.log(this.complaintypes,"Co Typoes")
            
        }
    )
  }

  
  updateComplain()
  {
    let updatedComplain:Complaint;
     if(!this.isValid())
        return;
     this.opertaionService.edit("Complain",this.updateComplainFormGroup.value).subscribe(
        res=>updatedComplain=res,
        error=>console.log(error),
        ()=>{
             
            this.globalService.EditSuccessfullyMessage();
            this.updateRowInTable(updatedComplain);
            $('#selectedRow').modal('hide');
            // console.log(this.UpdatedComplainIdex,"Index");
            // console.log(this.complaions[this.UpdatedComplainIdex],"After Update");
           
           
               
           
            
        }
     )
  }
  updateRowInTable(updatedComplain:Complaint)
  {
    let statusLable=this.globalService.get_ComplainStatusLable(updatedComplain.status);
    this.complaions[this.UpdatedComplainIdex].status=statusLable;
    this.complaions[this.UpdatedComplainIdex].lastUserAction=updatedComplain.lastUserAction;
    this.complaions[this.UpdatedComplainIdex].comment=updatedComplain.comment;
    this.complaions[this.UpdatedComplainIdex].result=updatedComplain.result;

  }

  


onSelectedRow(complain:Complaint,rowindex:number)
{
    $('#selectedRow').modal('show');
    
    this.selectedComplain=complain;
   
   this.UpdatedComplainIdex=rowindex;
    let complainStatusId=this.getComplainStatusId(this.selectedComplain.status);
    this.updateComplainFormGroup.get("status")?.setValue(complainStatusId);
    this.updateComplainFormGroup.get("comment")?.setValue(this.selectedComplain.comment);

    
    this.updateComplainFormGroup.get("complainTypeId")?.setValue(this.selectedComplain.complainTypeId);
    this.updateComplainFormGroup.get("id")?.setValue(this.selectedComplain.id);
   // console.log(complain,"Value");
}

getComplainStatusId(statusLable:string)
{
    return this.complainsStatus.find(c=>c.label==statusLable)?.value;
}


delete(id:number,index:number)
{
  this.opertaionService.delete("Complain",id).subscribe(
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
  this.complaions.splice(index,1);
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
  return this.updateComplainFormGroup.get(fromControlName)?.errors?.["pattern"];
}

get_FilterdComplain()
{
  this.router.queryParams.subscribe(
    params=>{
    
      this.complainId = params['Id'];
      if(this.complainId !=null && this.complainId !=undefined && this.complainId>0)
        {
          this.ComplainFitlerFormGroup.get("id")?.setValue(this.complainId);
          this.notificationService.removeViewedMessage("Complain",this.complainId);
          
        }
       this.getFiltratedData();
    },
    err=>console.log(err),
    ()=>{
      
    }
  )
  
}
getFiltratedData()
{
  if(!this.isValidFilter())
    return;
  this.convertDate();
var filtred= this.globalService.remove_NullValuesFromFormGroup(this.ComplainFitlerFormGroup);

this.opertaionService.ComplainFilter(filtred).subscribe(
res=>this.complaions=res.map((a:Complaint)=>{
  switch(a.status)
  {
      case 0:
      a.status="Waiting";
      break;
      case 1:
          a.status="InProgress";
          break;
      case 2:
       a.status="Solved";
      break;
  }
 
    return a;
}),
error=>console.log(error),
()=>{
  //console.log("Completed");
}
)
}

  // Conver From National Date To Local Date in From group
  convertDate()
  {
    let dateTime=this.ComplainFitlerFormGroup.get("CreatedDate")?.value;
   
      this.ComplainFitlerFormGroup.get("CreatedDate")?.setValue(this.globalService.conver_DateTimeToIsoDate(dateTime));
      this.ComplainFitlerFormGroup.get("CreatedDate")?.updateValueAndValidity();
  }

isValidFilter()
{
  return this.ComplainFitlerFormGroup.valid;
}
isValid()
{
 // console.log(this.updateComplainFormGroup.value,"ValueForm");
  return this.updateComplainFormGroup.valid;
}
// IF is solved comment will be nor required and result will be required if is not comment will be required
isSolved()
{
    if (this.updateComplainFormGroup.get("status")?.value == 2)
        {
            this.updateComplainFormGroup.get("result")?.setValidators([Validators.required]);
            this.updateComplainFormGroup.get("result")?.updateValueAndValidity();
            this.updateComplainFormGroup.get("comment")?.removeValidators([Validators.required]);
            this.updateComplainFormGroup.get("comment")?.updateValueAndValidity();
            
            return true;
        }
        else  
        {
            this.updateComplainFormGroup.get("result")?.removeValidators(Validators.required);
            this.updateComplainFormGroup.get("result")?.updateValueAndValidity();
            this.updateComplainFormGroup.get("comment")?.setValidators([Validators.required]);
            this.updateComplainFormGroup.get("comment")?.updateValueAndValidity();
            return false;
        }
}
clear(table: Table) {
  table.clear();
}
exportexcel(): void
  {
   
    this.globalService.exportexcel("complain-table-op","Complains")
   
  }
    ngOnInit(): void {
      this.updateComplainFormGroup=this.fb.group({
        
        id:[this.selectedComplain?.id,[Validators.required]],
        complainTypeId:[this.selectedComplain?.complainType,[Validators.required]],
        comment:[null,[Validators.required,Validators.maxLength(400)]],
        result:[null,[Validators.maxLength(400)]],
        status:[this.selectedComplain?.status,[Validators.required]]
        

      });
    
       this.ComplainFitlerFormGroup=this.fb.group({
        id:[null],
        ComplainTypeId:[null],
        UniteCode:[''],
        PhoneNumber:[null,Validators.pattern(NumberPattrenValidation)],
        CreatedDate:[this.globalService.get_CurrentDate(),Validators.required],
        Status:[null],
       })
        
     //   this.getAllComplains();
     this.get_FilterdComplain();
        this.getAllComplainTypes();
    
    }

}