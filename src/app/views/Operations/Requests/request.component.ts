import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {Complaint } from '../interfaces/complaint.interface';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service';
import {Request} from '../interfaces/request.interface'
import { OperationService } from "../Services/operation.service";
import { RequestType } from "../../Admin/interfaces/request.interface";
import {NotificationMessage}  from "../../../Global/Interfaces/NotificationMessage"
import * as XLSX from 'xlsx';
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/Global/Services/notification.service";
declare var $: any;



@Component({
    selector:'maskan-request',
    templateUrl:'./request.component.html'
})


export class RequestComponent implements OnInit{
    requests: Request[];
    requetId:number;
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  updateRequestFormGroup:FormGroup;
  filterRequestFormGroup:FormGroup;
  UpdatedComplainIdex:number; // get index of selected Row
  requestStatus=this.globalService.get_StateStatus();
  requestTypes:RequestType[];
  selectedRequest:Request;
  @ViewChild('dt') dt: Table;
  constructor(
    private operationService:OperationService,
    private fb:FormBuilder,
    private globalService:GlobalService,
    private route: ActivatedRoute,
    private notificationService:NotificationService
    
    
   
  ){}
 
  loading: boolean = true;
  

  activityValues: number[] = [0, 100];

  exportexcel(): void
  {
    this.globalService.exportexcel("request-table-op","Requests")
   
  }
  
  getAllRequests()
  {
    this.operationService.GetAll("Request").subscribe(
        res=>this.requests=res.map((a:Complaint)=>{
            switch(a.status)
            {
                case 0:
                a.status="Waiting";
                break;
                case 1:
                    a.status="InProgress";
                    break;
                case 2:
                 a.status="Approved";
                break;
                case 3:
                 a.status="Reject";
                break;
            }
              return a;
        }),
       
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
          //  console.log(this.requests,"Co")
            
        }
    )
  }
 
  filterRequest()
  {
    this.route.queryParams.subscribe(params => {
      this.requetId = params['Id']
      if(this.requetId !=null && this.requetId !=undefined && this.requetId>0)
        {
          this.filterRequestFormGroup.get("id")?.setValue(this.requetId);
          this.notificationService.removeViewedMessage("Request",this.requetId);
          
        }
        else
        {
          if(!this.isValidFilter())
            return;
           this.convertDate();
           
        }
        this.GetFiltredData();    
    },
    error=>console.log(error),
    ()=>{
      
    });
  }
  
  GetFiltredData()
  {
   // debugger;
    let filter=this.globalService.remove_NullValuesFromFormGroup(this.filterRequestFormGroup);
     console.log(filter)
    this.operationService.requestFilter(filter).subscribe(
      res=>this.requests=res.map((a:Complaint)=>{
        switch(a.status)
        {
            case 0:
            a.status="Waiting";
            break;
            case 1:
                a.status="InProgress";
                break;
            case 2:
             a.status="Approved";
            break;
            case 3:
             a.status="Reject";
            break;
        }
          return a;
    }),
      error=>console.log(error),
      ()=>{

        this.loading=false;
      }
    )
  } 
  // Conver From National Date To Local Date in From group
  convertDate()
  {
    let dateTime=this.filterRequestFormGroup.get("CreatedDate")?.value;
   
      this.filterRequestFormGroup.get("CreatedDate")?.setValue(this.globalService.conver_DateTimeToIsoDate(dateTime));
      this.filterRequestFormGroup.get("CreatedDate")?.updateValueAndValidity();
  }

  isValidFilter()
{
  return this.filterRequestFormGroup.valid;
}
  
  update()
  {
    let updatedComplain:Complaint;
     if(!this.isValid())
        return;
     this.operationService.edit("Request",this.updateRequestFormGroup.value).subscribe(
        res=>updatedComplain=res,
        error=>console.log(error),
        ()=>{
             
            this.globalService.EditSuccessfullyMessage();
            this.updateRowInTable(updatedComplain);
            $('#selectedRow').modal('hide');
            // console.log(this.UpdatedComplainIdex,"Index");
            // console.log(this.requests[this.UpdatedComplainIdex],"After Update");
           
           
               
           
            
        }
     )
  }
  updateRowInTable(updatedComplain:Complaint)
  {
    let statusLable=this.globalService.get_ComplainStatusLable(updatedComplain.status);
    this.requests[this.UpdatedComplainIdex].status=statusLable;
    this.requests[this.UpdatedComplainIdex].lastUserActionName=updatedComplain.lastUserAction;
    this.requests[this.UpdatedComplainIdex].comment=updatedComplain.comment;
    

  }

  


onSelectedRow(request:Request,rowindex:number)
{
    $('#selectedRow').modal('show');
    
    this.selectedRequest=request;
   
   this.UpdatedComplainIdex=rowindex;
    let requestStatusId=this.getRequestStatusId(this.selectedRequest.status);
    console.log(requestStatusId,"SDa");
    this.updateRequestFormGroup.get("status")?.setValue(requestStatusId);
    this.updateRequestFormGroup.get("comment")?.setValue(this.selectedRequest.comment);

    
    this.updateRequestFormGroup.get("id")?.setValue(this.selectedRequest.id);
   // console.log(complain,"Value");
}

getRequestStatusId(statusLable:string)
{
    return this.requestStatus.find(c=>c.label==statusLable)?.value;
}
get_RequestTypes()
{
  this.operationService.GetAll("RequestType").subscribe(
    res=>this.requestTypes=res,
    eror=>console.log(eror),
    ()=>{

    }
  )
}


delete(id:number,index:number)
{
  this.operationService.delete("Request",id).subscribe(
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
  this.requests.splice(index,1);
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
 // console.log((event.target as HTMLInputElement).value,"search");
  this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal);
}
pattrenValidation(fromControlName:any){
  return this.updateRequestFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
 // console.log(this.updateRequestFormGroup.value,"ValueForm");
  return this.updateRequestFormGroup.valid;
}
// IF is solved comment will be nor required and result will be required if is not comment will be required
isSolved()
{
    if (this.updateRequestFormGroup.get("status")?.value == 2)
        {
            this.updateRequestFormGroup.get("result")?.setValidators([Validators.required]);
            this.updateRequestFormGroup.get("result")?.updateValueAndValidity();
            this.updateRequestFormGroup.get("comment")?.removeValidators([Validators.required]);
            this.updateRequestFormGroup.get("comment")?.updateValueAndValidity();
            
            return true;
        }
        else  
        {
            this.updateRequestFormGroup.get("result")?.removeValidators(Validators.required);
            this.updateRequestFormGroup.get("result")?.updateValueAndValidity();
            this.updateRequestFormGroup.get("comment")?.setValidators([Validators.required]);
            this.updateRequestFormGroup.get("comment")?.updateValueAndValidity();
            return false;
        }
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.updateRequestFormGroup=this.fb.group({
        
        id:[this.selectedRequest?.id,[Validators.required]],
        comment:[null,[Validators.required,Validators.maxLength(400)]],       
        status:[this.selectedRequest?.status,[Validators.required]]
      });
    
       this.filterRequestFormGroup=this.fb.group({
        id:[null],
        RequestTypeId:[null],
        UniteCode:[null],
        PhoneNumber:[null],
        CreatedDate:[this.globalService.get_CurrentDate(),Validators.required],
        Status:[null]

       })
        
       // this.getAllRequests();
        this.get_RequestTypes();
        this.filterRequest();
    
    }

}