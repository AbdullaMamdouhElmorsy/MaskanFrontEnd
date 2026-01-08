import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UniteComponent } from "./Unite/unite.component";
import { UniteTypeComponent } from "./UniteType/unite-type.component";
import { UserTypeComponent } from "./UserType/user-type.component";
import { ComplainTypeComponent } from "./ComplainType/complain.component";
import { RoleComponent } from "./Role/role.component";
import { UserComponent } from "./User/user.component";
import { RequestTypeComponent } from "./RequestType/request-type.component";
import { TenantComponent } from "./Tenant/tenant.component";
import { StuffTypeComponent } from "./Stuff-Type/stuff-type.component";
import {RoleGuard} from "../../Global/Guards/RoleGuard.service"
import { UniteBlockComponent } from "./UniteBlock/unite-block.component";
const routes:Routes=[
    {
        path:'',
        component:AdminComponent,
       // canActivate:[RoleGuard],
        canActivateChild:[RoleGuard],
        children:[
            {
               path:'unite',
               component:UniteComponent,
              
            },
            {
                path:'uniteType',
                component:UniteTypeComponent,
               
             },
             {
                path:'userType',
                component:UserTypeComponent,
               
             },
             {
                path:'uniteBlock',
                component:UniteBlockComponent,
               
             },
             {
                path:'complainType',
                component:ComplainTypeComponent,
               
             },
             {
               path:'role',
               component:RoleComponent,
              
            },
            {
               path:'user',
               component:UserComponent,
              
            },
            {
               path:'requestType',
               component:RequestTypeComponent,
              
            },
            {
               path:'tenant',
               component:TenantComponent,
              
            },
            {
               path:'stuffType',
               component:StuffTypeComponent,
              
            },
           
            
        ]
    }
];
@NgModule({
    
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule{

}