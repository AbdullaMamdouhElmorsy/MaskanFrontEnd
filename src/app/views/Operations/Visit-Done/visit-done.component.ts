import {Component,OnInit} from '@angular/core';
import { Visit } from "../interfaces/visit.interface";
import { ActivatedRoute } from '@angular/router'
import { OperationService } from '../Services/operation.service';
import { GlobalService } from 'src/app/Global/Services/global.service';

@Component({
    selector:'maskan-visit-done',
    templateUrl:'./visit-done.component.html'
})

export class VisitDoneComponent implements OnInit {

  visit:Visit;
    
  constructor(
    private  route:ActivatedRoute,
    private operationService:OperationService,
    private globalService:GlobalService
  )
  {

  }

  getVisit()
  {
   
    const visitId=this.route.snapshot.paramMap.get("id");
     if(visitId==null || visitId== undefined || visitId=="")
     {
        this.globalService.errorMessage("Something Wrong Try Again");
        return;
     }

         
    this.operationService.Get_ById("Visit",visitId).subscribe(
        res=>{
            this.visit=res;
             console.log(res)
        },
        error=>error,
        ()=>{
            if(!this.visit)
               this.globalService.errorMessage("Something Wrong Try Again")
        }
    )
  }

  Done()
  {
    const visitId=Number.parseInt(this.route.snapshot.paramMap.get("id")||'0');
    if(visitId==null || visitId== undefined || visitId==0)
    {
       this.globalService.errorMessage("Something Wrong Try Again");
       return;
    }

   
     this.operationService.VisisDone(visitId).subscribe(
        res=>res,
        error=>console.log(error),
        ()=>{
             
            this.globalService.EditSuccessfullyMessage();
          
        
        }
     )
  }
  

    ngOnInit(): void {
        
      this.getVisit();
      console.log(this.visit,"Visit");
    }

}