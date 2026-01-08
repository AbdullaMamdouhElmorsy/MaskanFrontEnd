import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { UniteComponent } from "./Unite/unite.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
// import { AccordionModule } from 'primeng/accordion';
// import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { CheckboxModule } from 'primeng/checkbox';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { IconModule } from "@coreui/icons-angular";
import { UniteTypeComponent} from './UniteType/unite-type.component';
import { UserTypeComponent} from './UserType/user-type.component';
import { UniteBlockComponent} from './UniteBlock/unite-block.component';
import { ComplainTypeComponent} from './ComplainType/complain.component';
import {TenantComponent } from './Tenant/tenant.component';
import {RoleComponent } from '../Admin/Role/role.component';
import {UserComponent } from '../Admin/User/user.component';
import {RequestTypeComponent } from '../Admin/RequestType/request-type.component';
import {StuffTypeComponent } from '../Admin/Stuff-Type/stuff-type.component';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({ declarations: [
        AdminComponent,
        UniteComponent,
        UniteTypeComponent,
        UserTypeComponent,
        UniteBlockComponent,
        ComplainTypeComponent,
        RoleComponent,
        UserComponent,
        RequestTypeComponent,
        TenantComponent,
        StuffTypeComponent
    ], imports: [ReactiveFormsModule,
        AdminRoutingModule,
        TranslateModule,
        IconModule,
        CommonModule,
        TableModule,
        AvatarModule,
        CalendarModule,
        CheckboxModule,
        PaginatorModule,
        AutocompleteLibModule,
        DropdownModule,
        MultiSelectModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AdminModule {

}