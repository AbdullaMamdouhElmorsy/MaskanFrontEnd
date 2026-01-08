import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UniteBill } from '../interfaces/unite-bill.interface';
import {
  DayOfMonth,
  NamePattrenValidation,
  NumberPattrenValidation,
} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../Global/Services/global.service';
import { Bill } from '../interfaces/bill.interface';
import { BillFilter } from '../interfaces/bill-filter.interface';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { Paging } from '../../../Global/Interfaces/Paging';
import { AccountingService } from '../Services/accounting.service';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'maskan-bill',
  templateUrl: './bill.component.html',
})
export class BillComponent implements OnInit {
  bills: Bill[];
  newBill: Bill; //new unite added
  rotateAddIcon: boolean = false;
  rotateTableIcon: boolean = false;
  billFormGroup: FormGroup;
  totalNumberOfRecords: number;
  currentPage: Paging;
  stopListening: any;
  oldValue:Bill; // use it to restore the old value becouse if edited data is not valid return the old value
  perPeriodTypes: SelectItem[] = this.globalService.get_PerPeriodTypes();
  perPeriodTypesFilters = this.globalService.get_SelectedItemFilter(
    this.perPeriodTypes
  );

  @ViewChild('dt') dt: Table;
  constructor(
    private accountingService:AccountingService,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private transateService:TranslateService
  ) { }

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  createBill() {
    
    if (!this.isValid()) return;

    this.accountingService.Add('Bill', this.billFormGroup.value).subscribe(
      (res) => (this.newBill = res),
      (error) => console.log(error),
      () => {
        this.globalService.addedSuccessfullyMessage();
        this.billFormGroup.reset();
        this.setDefaultValues();
        this.bills.unshift(this.newBill);
       
      }
    );
  }
  setDefaultValues() {
    this.billFormGroup.get('allUnites')?.setValue(false);
    this.billFormGroup.get("runDay")?.setValue(0);
  }
  getAllbills() {
    this.accountingService.GetAll('Bill').subscribe(
      (res) => (this.bills = res),
      (error) => console.error(error),
      () => {
        this.loading = false;
        //console.log(this.loading,"loading");
      }
    );
  }

 
  paginate(table: any) {
    let billFilter: BillFilter = {
      name: null,
      skip: table.first,
      take: table.rows,
      amount: null,
      allUnites: null,
      runDay: null,
      perPeriodType: null,
      createdDate: null,
    };

    let filters = table.filters;
    // console.log(filters,"dsa")
    if (filters?.name) 
      billFilter.name = filters.name[0]?.value;
    if (filters?.perPeriodType)
      billFilter.perPeriodType = filters.perPeriodType[0]?.value?.value?.value;

    if (filters?.allUnites) billFilter.allUnites = filters.allUnites[0]?.value;
    if (filters?.amount) billFilter.amount = filters.amount[0]?.value;
    if (filters?.createdDate)
     {
      if (filters.createdDate[0].value)
        billFilter.createdDate = new Date(filters.createdDate[0].value)
          .toLocaleDateString()
          .split('T')[0];
    }
    if (filters?.allUnites) billFilter.allUnites = filters.allUnites.value;
    // if (filters?.runDay) billFilter.runDay = filters.runDay[0].value;

   // console.log(filters, 'Filters');
    let result = this.globalService.remove_NullFromFilters(billFilter);

    this.accountingService.Get_Paging('Bill', result).subscribe(
      (res) => {
        this.bills = res.bills;
        this.totalNumberOfRecords = res.totalRecords;
      },
      (error) => console.log(error),
      () => {
        this.loading = false;
      }
    );
  }
  filter(data: any) {
    console.log(data, 'das');
  }
  onRowEditInit(data: Bill) {
    this.oldValue=Object.assign({},data);
    
  }
  onRowEditCancel(data: Bill, index: number) {
    this.bills[index]=this.oldValue;
 }
  onRowEditSave(data: Bill, index: number) {
   
    let updatedBill: Bill;
    let perperiodTypeId = this.globalService.get_PerPeriodTypeId(
      data.perPeriodType
    );
    if (!this.globalService.dataInputValidation(data.name)) {
      this.globalService.errorMessage('Invalid Name (Letters Only )');
        this.dt.initRowEdit(data);
      return;
    }
    // if (perperiodTypeId != 0 && data.runDay == 0) {
    //   // check if perPeriodType is not Once And runDay is 0
    //   this.globalService.errorMessage(
    //     "Run Day  Cannot Be 0 (Data Doesn't Change)"
    //   );
    //   this.dt.initRowEdit(data);
    //   return;
    // }

    const editedData = {
      id: data.id,
      name: data.name,
      perPeriodType: perperiodTypeId,
      amount: data.amount,
      runDay: perperiodTypeId == 0 ? 0 : data.runDay,
      allUnites: data.allUnites,
    };
    this.accountingService.edit('Bill', editedData).subscribe(
      (res) => (updatedBill = res),
      (error) => console.log(error),
      () => {
        this.bills[index] = updatedBill;
        this.globalService.EditSuccessfullyMessage();
      }
    );
  }

  
  delete(id: number, index: number) {
    this.accountingService.delete('Bill', id).subscribe(
      (res) => res,
      (error) => console.log(error),
      () => {
        this.UpdateTableAfterDelete(index);
      }
    );
  }
  UpdateTableAfterDelete(index: number) {
    this.bills.splice(index, 1);
    console.log(this.bills, 'Biils');
  }
  confirmDelete(dataName: string, id: number, index: number) {
    this.globalService.confirmDelete(dataName, () => {
      this.delete(id, index);
    });
  }

  // isOnce() {
  //   if (this.billFormGroup.get('perPeriodType')?.value != 0) {
  //     //Once
  //     this.billFormGroup
  //       .get('runDay')
  //       ?.setValidators([Validators.required, Validators.pattern(DayOfMonth)]);

  //     this.billFormGroup.get('runDay')?.enable();
  //     this.billFormGroup.get('runDay')?.updateValueAndValidity();
  //     //console.log(this.billFormGroup.controls)
  //     return false;
  //   } else {
  //     this.billFormGroup
  //       .get('runDay')
  //       ?.removeValidators([
  //         Validators.required,
  //         Validators.pattern(DayOfMonth),
  //       ]);

  //     this.billFormGroup.get('runDay')?.setValue(0);
  //     this.billFormGroup.get('runDay')?.disable();
  //     this.billFormGroup.get('runDay')?.updateValueAndValidity();
  //     //  console.log(this.billFormGroup.controls)
  //     return true;
  //   }
  // }

  /*----------Rotate the Icon of Header Cards-----------------------*/
  slideToggle(slideName: string) {
    // console.log(slideName,"Name")
    if (slideName == 'add') this.rotateAddIcon = !this.rotateAddIcon;
    else this.rotateTableIcon = !this.rotateTableIcon;
  }
  applyFilterGlobal(event: Event, stringVal: string) {
    console.log((event.target as HTMLInputElement).value, 'search');
    this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }
  pattrenValidation(fromControlName: any) {
    return this.billFormGroup.get(fromControlName)?.errors?.['pattern'];
  }
  isValid() {
    return this.billFormGroup.valid;
  }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    this.billFormGroup = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern(NamePattrenValidation)],
      ],
      amount: [
        null,
        [Validators.required, Validators.pattern(NumberPattrenValidation)],
      ],
      allUnites: [false],
      perPeriodType: [null, [Validators.required]],
      runDay: [0],
    });

    //  console.log(this.perPeriodTypesFilters,"Filter");

    //this.getAllbills();
  }
}
