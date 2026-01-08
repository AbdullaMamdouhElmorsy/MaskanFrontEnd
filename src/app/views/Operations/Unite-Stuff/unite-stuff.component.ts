import { Component, OnInit,ViewChild } from "@angular/core";
import { Table } from 'primeng/table';
import {AdminService} from '../../Admin/services/admin.service'
import {Complaint } from '../interfaces/complaint.interface';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {GlobalService} from '../../../Global/Services/global.service';
import { UniteStuff } from "../interfaces/unite-stiff.interface";
import { OperationService } from "../Services/operation.service";
import { NamePattrenValidation } from "../../../Global/Pattren/regex";
import {StuffType} from "../../Admin/interfaces/stuff-type.interface";
import * as XLSX from 'xlsx';
declare var $: any;



@Component({
    selector:'maskan-request',
    templateUrl:'./unite-stuff.component.html'
})


export class UniteStuffComponent implements OnInit{
    uniteStuffs: UniteStuff[];
  rotateAddIcon:boolean=false;
  rotateTableIcon:boolean=false;
  updateRequestFormGroup:FormGroup;
  filterUniteStuffFormGroup:FormGroup;
  stuffTypes:StuffType[];

  @ViewChild('dt') dt: Table;
  constructor(
    private operationService:OperationService,
    private fb:FormBuilder,
    private globalService:GlobalService,
   
  ){}
 
  loading: boolean = false;
  

  activityValues: number[] = [0, 100];
  
 
 
  exportexcel(): void
  {
    /* pass here the table id */
    this.globalService.exportexcel("stuff-table-op","Unite Stuffs");
 
  }
  
  filterUniteStuffs()
  {
    this.loading=true;
      if(!this.isValidFilter())
         return;
       let filters=this.globalService.remove_NullValuesFromFormGroup(this.filterUniteStuffFormGroup);
       this.operationService.filter("UniteStuff",filters).subscribe(
        res=>this.uniteStuffs=res,
        error=>console.log(error),
        ()=>{
           this.loading=false;
        }
       )

  }

 get_AllStuffTypes()
 {
    this.operationService.GetAll("StuffType").subscribe(
        res=>this.stuffTypes=res,
        error=>console.log(error),
        ()=>{

        }
    )

 }




isValidFilter()
{
  return this.filterUniteStuffFormGroup.valid;
}
pattrenValidation(fromControlName:any){
  return this.filterUniteStuffFormGroup.get(fromControlName)?.errors?.["pattern"];
}

  /*----------Rotate the Icon of Header Cards-----------------------*/
slideToggle(slideName:string){
 // console.log(slideName,"Name")
  if(slideName=='add')
      this.rotateAddIcon=!this.rotateAddIcon;
      else
          this.rotateTableIcon=!this.rotateTableIcon
}



    ngOnInit(): void {
      
      this.filterUniteStuffFormGroup=this.fb.group({
        StuffTypeId:[null],
        UniteCode:[null],
        PlatNumber:[null],
        Job:[null,Validators.pattern(NamePattrenValidation)],
     
       })
       
        
        this.get_AllStuffTypes();
       
    
    }

}