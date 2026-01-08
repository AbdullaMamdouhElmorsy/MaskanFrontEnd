import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BillComponent } from "./Bill/bill.component";
import { UniteBillComponent } from "./UniteBill/unite-bill.component";
import { AccountingComponent } from "./Accouting.component";
import { UnPaidBillComponent } from "./UnPaidBills/unpaid-bills..component";
import { RoleGuard } from "src/app/Global/Guards/RoleGuard.service";

const routes:Routes=[
    {
        path:'',
        component:AccountingComponent,
        canActivateChild:[RoleGuard],
        children:[
           
            {
                path:'bill',
                component:BillComponent
                
             },
             {
                path:'uniteBill',
                component:UniteBillComponent
                
             },
             {
                path:'unPaidBill',
                component:UnPaidBillComponent
                
             },
        ]
    }
];
@NgModule({
    
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AccountingRoutingModule{

}