import { Component, OnInit,ViewChild, numberAttribute } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import {Unite} from '../interfaces/unite.interface';
import {UniteBlock} from '../interfaces/unite-block.interface';
import {UniteType} from '../interfaces/uniteType.interface';
import {CodePattrenValidation, NationalIdPattren, NationalOrPassportIdPattren, NumberPattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import { FilterMatchMode, LazyLoadEvent, SelectItem } from 'primeng/api';
import {UniteFilter} from '../interfaces/Unite-filter.interface'
import { Paging } from "../../../Global/Interfaces/Paging";
import { TranslateService } from "@ngx-translate/core";
declare var $: any;  

@Component({
    selector:'maskan-unite',
    templateUrl:'./unite.component.html'
})


export class UniteComponent implements OnInit{
  unites: Unite[];
  newUnite:Unite; //add new Unite
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  totalNumberOfUnites:number;
  uniteFormGroup:FormGroup;
  blockLoading=false;
  oldValue:Unite;
  @ViewChild('dt') dt: Table;
  @ViewChild('auto') auto:any;

  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
   private translateService: TranslateService,
    private globalService:GlobalService
  ){
    console.log(this.translateService.getLangs(),"Lang uni");
    console.log(this.translateService.currentLang,"unie")
  }
 
  loading: boolean = true;
  keyword="diplayName"
  blocks:UniteBlock[];
 
  uniteTypes:UniteType[];
  unitesStatus:Array<any>=this.globalService.get_UniteStatus();
  activityValues: number[] = [0, 100];
  uniteTypesList:SelectItem[];
  currentPage:Paging={
    skip:null,
    take:null
  };
  createUnite()
  {
     if(!this.isValid())
       return;
    
       this.adminService.Add("Unite",this.uniteFormGroup.value).subscribe(
        res=>res,
        error=>error,
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.uniteFormGroup.reset();
          this.setDefaultValues();
          this.auto.clear();
          this.paginate(this.dt);
         
          this.unites.unshift(this.newUnite);
        }
       )
  }

  setDefaultValues()
  {
    this.uniteFormGroup.get("uniteStatus")?.setValue(1);
    this.uniteFormGroup.get("isOccupied")?.setValue(false);
  }
  getAllUnites()
  {
    this.adminService.GetAll("Unite").subscribe(
        res=>this.unites=res.map((a:Unite)=>{
            switch(a.uniteStatus)
            {
                case 0:
                a.uniteStatus="Suspended";
                break;
                case 1:
                    a.uniteStatus="Active";
                    break;
            }
              return a;
        }),
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
           // console.log(this.unites,"Unites");
        }
    )
  }
  isOccupied()
  {
    
    if (this.uniteFormGroup.get("isOccupied")?.value == true)
    {
        this.uniteFormGroup.get("nationalId")?.setValidators([Validators.required]);
        this.uniteFormGroup.get("nationalId")?.updateValueAndValidity();
      
        
        return true;
    }
    else  
    {
        this.uniteFormGroup.get("nationalId")?.removeValidators(Validators.required);
        this.uniteFormGroup.get("nationalId")?.updateValueAndValidity();
        
        return false;
    }
  }
  getAllBlocks()
  {
    this.adminService.GetAll("UniteBlock").subscribe(
        res=>this.blocks=res.map((a:UniteBlock)=>{
          a.diplayName=a.number +"-"+a.code
          return a;
        }),
        error=>console.error(error),
        ()=>{
            this.loading=false
        }
    )
  }
  getAllUniteType()
  {
    this.adminService.GetAll("UniteType").subscribe(
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
   
    
    let uniteFilter:UniteFilter={
      Id:null,
      uniteCode:null,
      isOccupied:null,
      take:null,
      skip:null,
      blockCode:null,
      nationalId:null,
      blockNumber:null,
      uniteStatus:null,
      uniteType:null,
      area:null
    }
    
    if(table==null)
       {
          uniteFilter.skip=this.currentPage?.skip;
          uniteFilter.take=this.currentPage?.take;
         // this.dt.first=0;
       }
    else
    {
     
      uniteFilter.skip= table?.first;
      uniteFilter.take=table?.rows;
      this.currentPage.skip=uniteFilter.skip,
      this.currentPage.take=uniteFilter.take;
      let filters=table.filters;
    // FIlter Options
    if(filters?.uniteCode)
       uniteFilter.uniteCode=filters.uniteCode[0]?.value
     if(filters?.blockCode)  
        uniteFilter.blockCode=filters.blockCode[0]?.value
     if(filters?.blockNumber)
      uniteFilter.blockNumber=filters.blockNumber[0]?.value
    
      if(filters?.isOccupied)
        uniteFilter.isOccupied=filters.isOccupied.value
      
      if(filters?.uniteStatus)
        uniteFilter.uniteStatus=filters.uniteStatus[0]?.value?.value?.value

        if(filters?.uniteTypeName)
        uniteFilter.uniteType=filters.uniteTypeName[0]?.value
      if(filters?.id)
        uniteFilter.Id=filters.id[0]?.value
      if(filters?.nationalId)
       uniteFilter.nationalId=filters.nationalId[0].value
      if(filters?.area)
        uniteFilter.area=filters.area[0].value


      // console.log(filters,"filters")
    }
  
    
     
     
     let result= this.globalService.remove_NullFromFilters(uniteFilter);
    

      this.adminService.Get_Paging("Unite",result).subscribe(
        res=>{
          this.unites=res.unites.map((a:Unite)=>{
          switch(a.uniteStatus)
          {
              case 0:
              a.uniteStatus="Suspended";
              break;
              case 1:
                  a.uniteStatus="Active";
                  break;
          }
            return a;
      })
      this.totalNumberOfUnites=res.totalRecords;
    },
      error=>console.error(error),
      ()=>{
          
          this.loading=false;
         // console.log(this.unites,"Unites");
      }
  )
 // console.log(table?.filters?.uniteCode[0],"Filters")
   
   
  }
  /*----------Rotate the Icon of Header Cards-----------------------*/
slideToggle(slideName:string){
  console.log(slideName,"Name")
  if(slideName=='add')
      this.rotateAddIcon=!this.rotateAddIcon;
      else
          this.rotateTableIcon=!this.rotateTableIcon
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
  return this.uniteFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  // console.log(this.uniteFormGroup.value,"Errpo");
  return this.uniteFormGroup.valid;
}

onRowEditInit(data: Unite) {
  this.oldValue=Object.assign({},data);
  
}
onRowEditCancel(data: Unite, index: number) {
  this.unites[index]=this.oldValue;
}
onRowEditSave(data: Unite) {
   if(data.isOccupied)
   {
    if(data.nationalId)
     {
      let isValid=this.globalService.validationCheck(NationalOrPassportIdPattren,data.nationalId);
      if(!isValid)
        {
        this.globalService.errorMessage("National Id Is Not Valid");
         this.dt.initRowEdit(data);
        return;
        }
      }
      else
        {
          this.globalService.errorMessage("National Id Is Required");
          this.dt.initRowEdit(data);
         
          return;
        }
   }
   if(!data.area)
      {
        this.globalService.errorMessage("Unite Area is Required");
        this.dt.initRowEdit(data);
        return;
      }
    
    let uniteStatusId=this.globalService.get_UniteStatusId(data.uniteStatus);
   
   let editedData={
    
       id :data.id,
       uniteCode :  data.uniteCode ,
       uniteStatus : uniteStatusId,
       uniteTypeId : data.uniteTypeId,
       blockId : data.blockId,
       isEgyption : data.nationalId?true:false,
       nationalId :  data.nationalId ,
       passportId :  data.passportId ,
       isOccupied : data.isOccupied,
       area:data.area
    
   }
  
// console.log(editedData,"EditedData");
 this.adminService.edit("Unite",editedData).subscribe(
   res=>res,
   error=>this.dt.initRowEdit(data),
   ()=>{

     this.globalService.EditSuccessfullyMessage();
     this.paginate(this.dt)
   }
   
 )
 
}
selectEvent(item:UniteBlock) {
  this.uniteFormGroup.get("blockId")?.setValue(item.id);
}

onChangeSearch(search: string) {
  if(search.length<1)
      return;
    this.blockLoading=true;
 this.adminService.search("UniteBlock",search).subscribe(
  res=>this.blocks=res.map((a:UniteBlock)=>{
    a.diplayName=a.number +"/"+a.code
    return a;
  }),
  error=>console.log(error),
  ()=>{
    this.blockLoading=false;
  }

 )
}

onFocused(e:any) {
  // do something
}

delete(id:number,index:number)
{
  this.adminService.delete("Unite",id).subscribe(
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
  this.unites.splice(index,1);
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
    ngOnInit(): void {
      this.uniteFormGroup=this.fb.group({
        uniteCode:[null,[Validators.required]],
        uniteStatus:[1,[Validators.required]],
        uniteTypeId:[null,[Validators.required]],
        blockId:[null,[Validators.required]],
        nationalId:[null,[Validators.pattern(NationalOrPassportIdPattren)]],
        isOccupied:[false,[Validators.required]],
        area:[null,[Validators.required,Validators.pattern(NumberPattrenValidation)]]
        

      });
    
     // console.log(this.dt,"DT")
    //    this.getAllBlocks();
     //   this.getAllUnites();
     // this.paginate();
        this.getAllUniteType();
    // this.paginate();
    }

}