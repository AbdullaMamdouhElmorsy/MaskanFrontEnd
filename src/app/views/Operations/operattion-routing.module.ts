import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComplaintComponent } from "./Complaion/complaint.component";
import { OperationComponent } from "./operation.component";
import { RequestComponent } from "./Requests/request.component";
import { VisitComponent } from "./Visits/visit.component";
import { UniteStuffComponent } from "./Unite-Stuff/unite-stuff.component";
import { VisitDoneComponent } from "./Visit-Done/visit-done.component";

const routes:Routes=[
    {
        path:'',
        component:OperationComponent,
      //  canActivateChild:[RoleGuardService],
        children:[
           
             {
               path:'complaints',
               component:ComplaintComponent,
              
            },
            {
                path:'requests',
                component:RequestComponent,
               
             },
             {
                path:'visits',
                component:VisitComponent,
               
             },
             {
                path:'uniteStuff',
                component:UniteStuffComponent,
               
             },
             {
                path:'visit-done/:id',
                component:VisitDoneComponent,
               
             },
        ]
    }
];
@NgModule({
    
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class OpeartionRoutingModule{

}