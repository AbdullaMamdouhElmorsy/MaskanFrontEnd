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
import { UniteBillFilter } from "../interfaces/bill-unite-filter.interface";
import { IKeyValue } from "../../../Global/Interfaces/keyValue.interface";
import { AccountingService } from "../Services/accounting.service";


declare var $: any;  

@Component({
    selector:'maskan-unite-bill',
    templateUrl:'./unite-bill.component.html'
})


export class UniteBillComponent implements OnInit{
  uniteBills: UniteBill[];
  oldValue:UniteBill;
  uniteStatus=this.globalService.get_UniteStatus();
  selectedUniteCodes:number[]=[];
  selectedUniteTypes:number[]=[];
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  roteteScudualIcon:boolean=false;
  totalNumberOfUniteBills:number;
  uniteBillFormGroup:FormGroup;
  uniteBillSchdualFormGroup:FormGroup;
   
  blockLoading=false;
  billLoading=false;
  uniteLoading=true;
  unites:SelectItem[];
  perPeriodTypes=this.globalService.get_PerPeriodTypes();
  loading: boolean = true;
  keyword="diplayName"
  blocks:UniteBlock[];
  bills:IKeyValue[];
  uniteTypes:UniteType[];
  activityValues: number[] = [0, 100];
  uniteTypesList:SelectItem[];
  numberOfAssinedJobs:number;
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
 
 
  assignBillToUnites()
  {
     if(!this.isValid())
       return;
    
       this.accountingService.Add("UniteBill",this.uniteBillFormGroup.value).subscribe(
        res=>res,
        error=>error,
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.uniteBillFormGroup.reset();
          this.setDefaultValues();
          this.auto.clear();
          this.paginate(this.dt);
         
         
        }
       )
  }

  setDefaultValues()
  {
    this.uniteBillFormGroup.get("uniteTypes")?.setValue([]);
    this.uniteBillFormGroup.get("unites")?.setValue([]);
    
  }
 
  RunScudualJob()
  {
    
    this.accountingService.runScudualBills(this.uniteBillSchdualFormGroup.value).subscribe(
      res=>this.numberOfAssinedJobs=res,
      error=>error,
      ()=>{
        this.paginate(this.dt);
        this.uniteBillSchdualFormGroup.get("RunDay")?.setValue(0);
         if(this.numberOfAssinedJobs<=0)
             this.globalService.warningMessage("Number Run Bills 0");
          else
            this.globalService.runSuccessfullyMessage(`Run SccessfullyMessage With ${this.numberOfAssinedJobs} Assigned`)
        
      }
      
    )
  }
 
 

  getAllUniteType()
  {
    this.accountingService.GetAll("UniteType").subscribe(
      res=>this.uniteTypes=res,
      eror=>console.log(eror),
     ()=>{
      console.log("Complete");
      this.uniteTypesList=this.globalService.get_EditDrobDownList(this.uniteTypes,"name");
    //  console.log(this.uniteTypesList,"list")
     }
      
      );
    
  }
 
  

  paginate(table:any)
  {
   
    
    let uniteBillFilters:UniteBillFilter={
        take:null,
        skip:null,
      uniteCode:null,
      allUnites:null, 
      billName:null,
      billAmount:null,
      createdDate:null,
      paid:null,
      uniteType:null,
      perPeriodType:null,
      uniteStatus:null
    };
    
    if(table==null)
       {
          uniteBillFilters.skip=this.currentPage?.skip;
          uniteBillFilters.take=this.currentPage?.take;
           
       }
    else
    {
     
      uniteBillFilters.skip= table?.first;
      uniteBillFilters.take=table?.rows;
      this.currentPage.skip=uniteBillFilters.skip,
      this.currentPage.take=uniteBillFilters.take;
      let filters=table.filters;
    // FIlter Options
    if(filters?.uniteCode)
       uniteBillFilters.uniteCode=filters.uniteCode[0]?.value
       if(filters?.uniteType)
       uniteBillFilters.uniteType=filters.uniteType[0]?.value
      
     if(filters?.billName)  
        uniteBillFilters.billName=filters.billName[0]?.value
    
     if(filters?.billAmount)
      uniteBillFilters.billAmount=filters.billAmount[0]?.value

        if(filters?.paid)
        uniteBillFilters.paid=filters.paid.value

      if(filters?.billAmount)
      uniteBillFilters.billAmount=filters.billAmount[0]?.value

      if(filters?.perPeriodType)
         uniteBillFilters.perPeriodType=filters.perPeriodType[0]?.value?.value?.value
        //  if (filters?.perPeriodType)
        //  uniteBillFilters.perPeriodType = filters.perPeriodType[0]?.value?.value?.value;

         if(filters?.uniteStatus)
          uniteBillFilters.uniteStatus=filters.uniteStatus[0]?.value?.value?.value
         if (filters?.createdDate)
         {
          if (filters.createdDate[0].value)
          uniteBillFilters.createdDate = new Date(filters.createdDate[0].value)
              .toLocaleDateString()
              .split('T')[0];

              console.log(filters,"dasss")
        }
      
        
      

     
     
     
    }
  
    
     
     let result= this.globalService.remove_NullFromFilters(uniteBillFilters);

     this.loading=true;

      this.accountingService.Get_Paging("UniteBill",result).subscribe(
        res=>{
          this.uniteBills=res.uniteBills;
          this.totalNumberOfUniteBills=res.totalRecords
          
      this.totalNumberOfUniteBills=res.totalRecords;
    },
      error=>console.error(error),
      ()=>{
          
          this.loading=false;
         // console.log(this.uniteBills,"uniteBills");
      }
  )
 // console.log(table?.filters?.uniteCode[0],"Filters")
   
   
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
  getSeverity(status: string):any {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
          default:
            return null;
    }
}
applyFilterGlobal(event:Event, stringVal:string) {
  console.log((event.target as HTMLInputElement).value,"search");
  this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal);
}
pattrenValidation(fromControlName:any){
  return this.uniteBillFormGroup.get(fromControlName)?.errors?.["pattern"];
}

onRowEditInit(data: UniteBill) {
  this.oldValue=Object.assign({},data);
  
}
onRowEditCancel(data: Unite, index: number) {
  this.uniteBills[index]=this.oldValue;
}


onRowEditSave(data: UniteBill) {

  
 let getUniteStatuId=this.globalService.get_StateStatusId(data.uniteStatus);
  

}

selectBill(bill:IKeyValue)
{
    this.uniteBillFormGroup.get("billId")?.setValue(bill.id);
}
onChangeBillSearch(search: string) {
    if(search.length<1)
        return;
      this.billLoading=true;
   this.accountingService.search("Bill",search).subscribe(
    res=>this.bills=res,
    error=>console.log(error),
    ()=>{
      this.billLoading=false;
    }
  
   )
  }

uniteCodeFilter(search: any) {
  
  //console.log(search.filter.length,"Lenth");
 let uniteCode= search.filter.length<1?'null':search.filter;
   
 this.accountingService.search("Unite",uniteCode).subscribe(
  res=>this.unites=res.map((a:any)=>{
    let result:SelectItem={
      label:a.code,
      value:a.id,
      disabled:this.isSelectedUniteInSelectedUniteType(a.uniteTypeId)
    };
    return result;
    
  }),
  error=>console.log(error),
  ()=>{
    this.multi._filteredOptions=null;
     
  }

 )
}
// this function to get unite Type Of Selected Unite Code
set_SelectedUniteCodesTypes(event:any)
{
   console.log(event,"Event");
}
isSelectedUniteInSelectedUniteType(uniteTypeId:any)
{
    let selectdUniteTypes=this.uniteBillFormGroup.get("uniteTypes")?.value;
    if(selectdUniteTypes)
       return selectdUniteTypes.some((s:any)=>s==uniteTypeId); 
      return false;

}

updateBillStatus(event:any,uniteBill:UniteBill)
{
  let updatedData={
    id:uniteBill.id,
    paid:event.target.checked
  };
  this.accountingService.edit("UniteBill",updatedData).subscribe(
    res=>{
      res
    },
   error=>error,
   ()=>{
    this.globalService.EditSuccessfullyMessage();
   }
    
  )
  

}


onFocused(e:any) {
  // do something
}

delete(id:number,index:number)
{
  this.accountingService.delete("UniteBill",id).subscribe(
    res=>res,
    error=>console.log(error),
    ()=>{
      this.UpdateTableAfterDelete(index);
     
      
    }
  )
}

UpdateTableAfterDelete(index:number)
{
   this.paginate(this.dt);
}

confirmDelete(dataName:string,id:number,index:number)
{
  this.globalService.confirmDelete(dataName,
    ()=>{
      this.delete(id,index)
    }
    );
}

clear(table: Table) {
  table.clear();
}

isValid()
{
  if(this.uniteBillFormGroup.valid)
   {
     let uniteTypes:any[]=this.uniteBillFormGroup.get("uniteTypes")?.value||[];
     let uniteCodes:any[]=this.uniteBillFormGroup.get("unites")?.value||[];
      if(uniteTypes.length==0 && uniteCodes.length==0)
         return false;
        else
           return true;
   }
  return this.uniteBillFormGroup.valid;
}
isValidSchdual()
{
  return this.uniteBillSchdualFormGroup.valid;
}
exportexcel(): void
  {
    
    this.globalService.exportexcel("uniteBill-table","Unite Bills")
 
  }

    ngOnInit(): void {
      this.uniteBillFormGroup=this.fb.group({
        billId:[null,[Validators.required]],
        uniteTypes:[[]],
        unites:[[]],
      });
      this.uniteBillSchdualFormGroup=this.fb.group({
        PerPeriod:[null,[Validators.required]],
        RunDay:[0]
            })
    
    this.columns=[
      { field: "uniteCode", header: "Unite Code" },
      { field: "uniteStatus", header: "Unite Status" },
      { field: "uniteType", header: "unite Type" },
      { field: "blockCode", header: "Block Code" },
      { field: "billName", header: "Bill" },
      { field: "createdDate", header: "Created Date" },
      { field: "paid", header: "Paid" },
      { field: "createdUser", header: "created User" },
     
  ];
        this.getAllUniteType();
     
    }

}