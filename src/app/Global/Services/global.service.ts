import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from "sweetalert2";
import { NamePattrenValidation, NumberPattrenValidation } from '../Pattren/regex';
import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { APIResponse } from '../Interfaces/APIResponse';
import { Subject, map, retryWhen } from "rxjs";
import * as XLSX from 'xlsx';
declare var $: any;

@Injectable({
    providedIn:'root'
})

export class GlobalService{

  public lang:string;
   private uniteStatus:SelectItem[]=[
        {
           value:0,
            label:"Suspended",
        },
        {
          value:1,
          label:"Active",
        },

    ];
    private uniteStatusAr:SelectItem[]=[
      {
         value:0,
          label:"معلقه",
      },
      {
        value:1,
        label:"فعال",
      },

  ];
   private ComplainStatus:SelectItem[]=[
        {
          value:0,
          label:"Waiting",
        },
        {
          value:1,
            label:"InProgress",
        },
        {
          value:2,
            label:"Solved",
        }

    ];
    private ComplainStatusAr:SelectItem[]=[
      {
        value:0,
        label:"قيد الانتظار",
      },
      {
        value:1,
          label:"جاري العمل عليها",
      },
      {
        value:2,
          label:"تم الحل",
      }

  ];
    private StateStatusAr:SelectItem[]=[
      {
        value:0,
        label:"قيد الانتظار",
      },
      {
        value:1,
          label:"جاري العمل عليها",
      },
      {
        value:2,
        label:"معتمد",
      },
      {
          value:3,
          label:"مرفوضه",
      },


  ];
  private StateStatus:SelectItem[]=[
    {
      value:0,
      label:"Waiting",
    },
    {
      value:1,
        label:"In Progress",
    },
    {
      value:2,
      label:"Approve",
    },
    {
        value:3,
        label:"Reject",
    },


];
    private UserStatus:SelectItem[]=[
      
      {
        value:0,
        label:"Waiting",
      },
      {
        value:1,
          label:"Approve",
      },
      {
        value:2,
          label:"Reject",
      },
      {
        value:3,
          label:"Created",
      }
    ]
    private UserStatusAr:SelectItem[]=[
      
      {
        value:0,
        label:"قيد الانتظار",
      },
      {
        value:1,
        label:"معتمد",
      },
      {
        value:2,
          label:"مرفوض",
      },
      {
        value:3,
          label:"تم انشائه",
      }
    ]
    private Roles:SelectItem[]=[
     
      {
        value:"Operation",
          label:"Operation",
      },
      {
        value:"Admin",
        label:"Admin",
      }
    ]
    private userTypes:SelectItem[]=[
     
      {
        value:0,
          label:"Owner",
      },
     
      {
        value:1,
        label:"Renter",
      },
      {
        value:2,
        label:"Employee",
      },
      {
        value:3,
        label:"User",
      },
      

    ]
    private perPeriodTypes:SelectItem[]=[
      
      {
          value:0,
          label:"Once",
      },
     
      {
        value:1,
        label:"Monthly",
      },
      {
        value:2,
        label:"Quarterly",
      },
      {
        value:3,
        label:"Yearly",
      },
    ]
    private perPeriodTypesAr:SelectItem[]=[
      
      {
          value:0,
          label:"مره واحده",
      },
     
      {
        value:1,
        label:"شهري",
      },
      {
        value:2,
        label:"ربع سنوي",
      },
      {
        value:3,
        label:"سنوي",
      },
    ]

  private noFilter:SelectItem={
    value:null,
    label:"No Filter",
  };
  
  applyRTLStyle() {
    
      setTimeout(() => {
        
        $('table td, table tr').css('text-align', 'right');
        
      }, 0); 
  }

    constructor(
        private http:HttpClient
    ){
      this.lang=localStorage.getItem("lang")??"en";
    }
    addedSuccessfullyMessage(){
      if(this.lang=="en")
      {
        Swal.fire({
          title: 'Added Successfully',
           icon: 'success',
          showCancelButton: false,
           confirmButtonText: 'نعم',
                  
                })
      }
      else
      Swal.fire({
        title: 'تمت الإضافة بنجاح',
         icon: 'success',
        showCancelButton: false,
         confirmButtonText: 'نعم',
                
              })
       
              
       
    }
        runSuccessfullyMessage(message?:string){
          if(message)
          Swal.fire({
            title: message,
             icon: 'success',
            showCancelButton: false,
             confirmButtonText: 'ok',
                    
                  })
          else             
          Swal.fire({
         title: 'Run Successfully',
          icon: 'success',
         showCancelButton: false,
          confirmButtonText: 'ok',
                 
               })
                
         
          }



      

    EditSuccessfullyMessage(){
      if(this.lang=="en")
      {
        Swal.fire({
          title: 'Updated Successfully',
           icon: 'success',
          showCancelButton: false,
           confirmButtonText: 'ok',
                  
                })
      }
      else
      {
        Swal.fire({
          title: 'تم التعديل بنجاح',
           icon: 'success',
          showCancelButton: false,
           confirmButtonText: 'نعم',
                  
                })
      }
           
                  
           
            } 
  errorMessage(errorMessgae:string){
                Swal.fire({
                    title: errorMessgae,  
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'ok',
                    
                  })         
                
                 }
        

    warningMessage(warninggMessage:string)
                {
                  Swal.fire({
                    title: warninggMessage,  
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonText: 'ok',
                    
                  })         
                
                 
        } 

        confirmDelete(dataName:any,deleteFunction:Function,fucntionUpdate?:Function){
        if(this.lang=="en")
        {
          Swal.fire({
            title: `Are you sure You Want to Delete  ${dataName}`,
            text: 'You will not be able to recover this Data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.isConfirmed) {
               deleteFunction();
              Swal.fire(
                'Deleted!',
               ` ${dataName} has been deleted.`,
                'success'
               
              ).then(()=>{
               if(fucntionUpdate!=null)
                   fucntionUpdate();
                /*----------Update Data After Delete--------------*/
               
              })
              
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your Data is safe :)',
                'error'
              )
            }
          })
        }
        else
        {
          Swal.fire({
            title: `هل انت متاكد انك تريد حذف (${dataName})`,
            text: 'لن تستطيع ارجاع هذه الباينات مره اخري',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'موافق! ,احذف',
            cancelButtonText: 'لا, احتفظ'
          }).then((result) => {
            if (result.isConfirmed) {
               deleteFunction();
              Swal.fire(
                'تم الحذف!',
               `${dataName} تم حذف`,
                'success'
               
              ).then(()=>{
               if(fucntionUpdate!=null)
                   fucntionUpdate();
                /*----------Update Data After Delete--------------*/
               
              })
              
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'تم الالغاء',
                "بياناتك آمنة",
                'error'
              )
            }
          })
        }
         
         }

         dataInputValidation(inputData:string):boolean{
            let latinNameReg= new RegExp(NamePattrenValidation);
            let nameReg= latinNameReg.test(inputData);
           
                if(nameReg)
                    return true;
                           
             return false;
                       
           }
           numberInputValidation(inputData:any):boolean{
            let numberRegs= new RegExp(NumberPattrenValidation);
            let numberReg= numberRegs.test(inputData);
                if(numberReg)
                    return true;
                           
             return false;
                       
           }

           validationCheck(regex:string,data:any)
           {
            let regexvalidation= new RegExp(regex);
            let isValid= regexvalidation.test(data);
                if(isValid)
                    return true;
                  return false;
           }
        
          get_UniteStatus()
           {
                return this.uniteStatus;
           }
          get_ComplainStatus()
           {
               if(this.lang=="en")
                return this.ComplainStatus;
              else
                return this.ComplainStatusAr;
           }
        
       get_EditDrobDownList(list:Array<any>,listName:string):SelectItem[]
        {
            return list.map(a=>{

              let data={
                value:a['id'],
                label:a[listName]
              }
              return data;
            }
              
            )
        }
   get_ComplainStatusId(statusLable:string)
    {
    return this.ComplainStatus.find(c=>c.label==statusLable)?.value;
    }

   get_ComplainStatusLable(statusValue:number)
    {
      return this.ComplainStatus.find(c=>c.value==statusValue)?.label;
    }
   get_StateStatusId(statusLable:string)
    {
    return this.StateStatus.find(c=>c.label==statusLable)?.value;
    }

   get_StateStatusLable(statusValue:number)
    {
      return this.StateStatus.find(c=>c.value==statusValue)?.label;
    }
   get_UniteStatusId(statusLable:string)
    {
    return this.uniteStatus.find(c=>c.label==statusLable)?.value;
    }
   get_UniteStatusLabel(statusValue:number)
    {
    return this.uniteStatus.find(c=>c.value==statusValue)?.label;
    }
   get_UserStatusLable(statusValue:number)
    {
      return this.UserStatus.find(c=>c.value==statusValue)?.label;
    }
   get_UserStatusId(statusLable:string)
    {
    return this.UserStatus.find(c=>c.label==statusLable)?.value;
    }
   get_UserStatus()
    {
      if(this.lang=="en")
        return this.UserStatus;
      else
       return this.UserStatusAr;
    }
   get_StateStatus()
    {
      if(this.lang=="en")
       return this.StateStatus;
      else
       return this.StateStatusAr;
    }

   get_CurrentDate()
    {
       return new Date().toLocaleDateString().split("T")[0];
    }
    conver_DateTimeToIsoDate(date:any)
    {
        let fromateDate= new Date(date);
        return fromateDate.toLocaleDateString().split('T')[0];
    }

    spliteDateToDateAndTime(DateTime:any)
    {
      let dateTime=DateTime.slice(0,16).split('T');
      
      let date=dateTime[0];
     
      let time=this.convetTimeFrom24To12(dateTime[1]);

      return date +" "+time
    }
    convetTimeFrom24To12(time:any)
    {
    
      //  Check correct time format and split into components
       time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
       
        return time.join('') // return adjusted time or original string
    

      
    }
   get_Roles()
    {
      return this.Roles.slice(0);
    }
   get_UserTypes()
    {
      return this.userTypes.slice(0);
    }
   get_UserTypeId(userTypeLable:string)
    {
      return this.userTypes.find(s=>s.label==userTypeLable)?.value;
    }
   get_PerPeriodTypes()
    {
       if(this.lang=="en")
        return this.perPeriodTypes.slice(0)
      else
       return this.perPeriodTypesAr;
    }
    // give it Any Array Of Selected Item And Will Retrun NoFilterOption
   get_SelectedItemFilter(data:SelectItem[])
    {
         let dropdown=data.slice(0);
          dropdown.unshift(this.noFilter);
          return dropdown;
    }
  get_PerPeriodTypeName(perperiodTypeId:number){
    return this.perPeriodTypes.find(s=>s.value == perperiodTypeId)?.label
   }
  get_PerPeriodTypeId(perperiodTypelable:string){
    return this.perPeriodTypes.find(s=>s.label == perperiodTypelable)?.value
   }

remove_NullValuesFromFormGroup(formGroup:FormGroup)
{
   let filtered:any={};
  if (formGroup.valid) {
    for (let key in formGroup.value) {
      if (formGroup.value[key] && formGroup.value[key] !='null') {
        //let y=key.toString();
        filtered[key] = formGroup.value[key].toString();
      }
    }

    return filtered;
    
  }
}
remove_NullFromFilters(filterObject:any)
{
  let filtered:any={};
  for (let key in filterObject) {
    if (filterObject[key]!=null  ) {
      filtered[key] = filterObject[key].toString();
    }
  }
 // console.log(filtered,"Filtred");

  return filtered;
  

}

get_Analisis(nameOfData:any)
{
   return this.http.get<APIResponse>(`Analysis/${nameOfData}`).pipe(
    map(res=>res.result)
   )
}

exportexcel(tableId:string,fileName:string): void
  {
    /* pass here the table id */
    let element = document.getElementById(tableId);
   // console.log(element,"Elemnt");
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    console.log(ws,"ws");
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, `${fileName}.xlsx`);
 
  }
   





}



