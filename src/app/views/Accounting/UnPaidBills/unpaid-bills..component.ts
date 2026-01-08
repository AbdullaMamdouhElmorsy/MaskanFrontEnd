import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {Unite} from '../../Admin/interfaces/unite.interface';
import {UniteBlock} from '../../Admin/interfaces/unite-block.interface';
import {UniteType} from '../../Admin/interfaces/uniteType.interface';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import { SelectItem } from 'primeng/api';
import { Paging } from "../../../Global/Interfaces/Paging";
import { UniteBill } from "../interfaces/unite-bill.interface";
import { AccountingService } from "../Services/accounting.service";
import { UnPaidUnite } from "../interfaces/un-paid.interface";
import { NumberPattrenValidation } from "../../../Global/Pattren/regex";


declare var $: any;  

@Component({
    selector:'maskan-unPaid-bill',
    templateUrl:'./unpaid-bills.component.html'
})


export class UnPaidBillComponent implements OnInit{
  unPaidUnites: UnPaidUnite[];
  oldValue:UniteBill;
  uniteStatus=this.globalService.get_UniteStatus();
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  roteteScudualIcon:boolean=false;
  totalNumberOfUpdatedUnites:number;
  billCounterForm:FormGroup;
   
  blockLoading=false;
  billLoading=false;
  uniteLoading=true;
  unites:SelectItem[];
//   perPeriodTypes=this.globalService.get_PerPeriodTypes();
  loading: boolean = true;
//   keyword="diplayName"
//   blocks:UniteBlock[];
//   bills:IKeyValue[];
//   uniteTypes:UniteType[];
//   activityValues: number[] = [0, 100];
//   uniteTypesList:SelectItem[];
//   numberOfAssinedJobs:number;
  fileName= 'Unite Bills.xlsx';
  columns:any;


  currentPage:Paging={
    skip:null,
    take:null
  };
  @ViewChild('dt') dt: Table;
  @ViewChild('auto') auto:any;
  @ViewChild('loader') multi:any;
  constructor(
    private accountingService:AccountingService,
    private fb:FormBuilder,
    private globalService:GlobalService
  ){}
 
 
  displedUnite()
  {
     if(!this.isValid())
       return;
       let numberOfUpdatedUnites=0;
       this.accountingService.ChangeUnpaidUnitesToSuspnded(this.billCounterForm.value).subscribe(
        res=>numberOfUpdatedUnites=res,
        error=>error,
        ()=>{
          if(numberOfUpdatedUnites<=0)
            this.globalService.warningMessage(`Number Of Updated Unites ${numberOfUpdatedUnites}`);
          else
            this.globalService.runSuccessfullyMessage(`Number Of Updated Unites ${numberOfUpdatedUnites}`);
          this.billCounterForm.reset();
         // this.billCounterForm.get("billCount")?.setValue(0);
         
        
         
         
        }
       )
  }



 setDefaultValues()
 {
    this.billCounterForm.get("billCount")?.setValue(0);
    this.billCounterForm.get("totalAmount")?.setValue(0);
 }

//   getAllUniteType()
//   {
//     this.accountingService.GetAll("UniteType").subscribe(
//       res=>this.uniteTypes=res,
//       eror=>console.log(eror),
//      ()=>{
//       console.log("Complete");
//       this.uniteTypesList=this.globalService.get_EditDrobDownList(this.uniteTypes,"name");
//     //  console.log(this.uniteTypesList,"list")
//      }
      
//       );
    
//   }
 
  

  paginate(table:any)
  {
   
    
    let unPaidBillFilter:any={
        billCount:null,
        totalAmount:null,
        uniteCode:null,
        skip:table?.first,
        take:table?.rows
    };
    
     
      let filters=table.filters;
    
       if(filters?.billCount)
           unPaidBillFilter.billCount=filters.billCount?.value

       if(filters?.totalAmount)
           unPaidBillFilter.totalAmount=filters.totalAmount?.value

       if(filters?.uniteCode)
           unPaidBillFilter.uniteCode=filters.uniteCode?.value
    
     let result= this.globalService.remove_NullFromFilters(unPaidBillFilter);

     this.loading=true;

      this.accountingService.Get_UnPaidUniteBills(result).subscribe(
        res=>{
          this.unPaidUnites=res.unPaidUnites;
          this.totalNumberOfUpdatedUnites=res.totalRecords
          
      this.totalNumberOfUpdatedUnites=res.totalUnites;
    },
      error=>console.error(error),
      ()=>{
          
          this.loading=false;
        
      }
  )

   
   
  }
  /*----------Rotate the Icon of Header Cards-----------------------*/
slideToggle(slideName:string){
  console.log(slideName,"Name")
  if(slideName=='add')
      this.rotateAddIcon=!this.rotateAddIcon;
      else if(slideName=='table')
          this.rotateTableIcon=!this.rotateTableIcon
      else
        this.roteteScudualIcon=!this.roteteScudualIcon
}


pattrenValidation(fromControlName:any){
  return this.billCounterForm.get(fromControlName)?.errors?.["pattern"] && this.billCounterForm.get(fromControlName)?.touched;
}

isValid()
{
  let billCount=this.billCounterForm.get("billCount")?.value;
  let totalAmount=this.billCounterForm.get("totalAmount")?.value;
  if(!billCount && !totalAmount)
     return false;
    return true;
  
}

exportexcel(): void
  {
    
    this.globalService.exportexcel("UnPaidUnite-table","Unite Bills")
 
  }

    ngOnInit(): void {
      this.billCounterForm=this.fb.group({
        billCount:[null,[Validators.pattern(NumberPattrenValidation)]],
        totalAmount:[null,[Validators.pattern(NumberPattrenValidation)]]
      });
      
    
    
       
     
    }

}