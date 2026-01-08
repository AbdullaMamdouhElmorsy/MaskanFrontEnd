import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../services/admin.service'
import {UniteBlock} from '../interfaces/unite-block.interface';
import {NamePattrenValidation, NumberPattrenValidation} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service'
import {UniteBlockFilter } from '../interfaces/unite-blockFilter.interface'


@Component({
    selector:'maskan-unite-block',
    templateUrl:'./unite-block.component.html'
})


export class UniteBlockComponent implements OnInit{
  unitesBlocks: UniteBlock[];
  oldValue:UniteBlock;
  UpdatedValue:UniteBlock;
  newUniteBlock:UniteBlock;//new unite added
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  uniteBlockFormGroup:FormGroup;
  totalNumberOfRecords:number;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = true;
  


  
  activityValues: number[] = [0, 100];
  createUniteBlock()
  {
    //console.log(this.usersTypes,"Ds");
     if(!this.isValid())
       return;

       this.adminService.Add("UniteBlock",this.uniteBlockFormGroup.value).subscribe(
        res=>this.newUniteBlock=res,
        error=>console.log(error),
        ()=>{
          this.globalService.addedSuccessfullyMessage();
          this.uniteBlockFormGroup.reset();
          this.unitesBlocks.unshift(this.newUniteBlock);
       //   this.messageService.add(this.UniteType);
       //   this.getAllUniteType();
        }
       )
  }
  getAllUnitesBlocks()
  {
    this.adminService.GetAll("UniteBlock").subscribe(
        res=>this.unitesBlocks=res,
        error=>console.error(error),
        ()=>{
            
            this.loading=false;
            //console.log(this.loading,"loading");
        }
    )
  }
  
 

paginate(table:any)
{
  // console.log(table,"d")
   
 
  let uniteBlockFilter:UniteBlockFilter={
    Code:null,
    skip:table.first,
    take:table.rows,
    number:null,
  }
  
  let filters=table.filters;
  if(filters?.code)
    uniteBlockFilter.Code=filters.code?.value
   if(filters?.number)  
      uniteBlockFilter.number=filters.number?.value
  
    
   let result= this.globalService.remove_NullFromFilters(uniteBlockFilter);
   
   this.adminService.Get_Paging("UniteBlock",result).subscribe(
    res=>{
      this.unitesBlocks=res.result;
      this.totalNumberOfRecords=res.totalRecords;
     
    },
    error=>console.log(error),
    ()=>{
      this.loading=false;
    }
     
   )


 
 
}

onRowEditInit(data: UniteBlock) {
  this.oldValue=Object.assign({},data);
  
}
onRowEditCancel(data: UniteBlock, index: number) {
  this.unitesBlocks[index]=this.oldValue;
}

onRowEditSave(data: UniteBlock,index:number) {
   let isValid=this.globalService.numberInputValidation(data.number);
   if(!isValid)
   {
        this.globalService.errorMessage("Invalid Block Number");
        this.dt.initRowEdit(data);
        return;
   }
  this.adminService.edit("UniteBlock",data).subscribe(
    res=>this.UpdatedValue=res,
    error=>{
     // this.unitesBlocks[index]=this.oldValue;
      this.dt.initRowEdit(data);
    },
    ()=>{
      this.UpdateTableAfterEdit(this.UpdatedValue,index);
      this.globalService.EditSuccessfullyMessage();
    }
    
  )
  
}


delete(id:number,index:number)
{
  this.adminService.delete("UniteBlock",id).subscribe(
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
  this.unitesBlocks.splice(index,1);
}
UpdateTableAfterEdit(updatedBlock:UniteBlock,index:number)
{
  this.unitesBlocks[index]=updatedBlock;
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
  return this.uniteBlockFormGroup.get(fromControlName)?.errors?.["pattern"];
}
isValid()
{
  
  return this.uniteBlockFormGroup.valid;
}
clear(table: Table) {
  table.clear();
}
    ngOnInit(): void {
      this.uniteBlockFormGroup=this.fb.group({
        code:[null,[Validators.required]],
        number:[null,[Validators.required,Validators.pattern(NumberPattrenValidation)]],
      });

    
       
        
        //this.getAllUnitesBlocks();
    
    }

}