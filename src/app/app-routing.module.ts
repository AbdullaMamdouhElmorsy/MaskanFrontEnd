import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { HomeComponent } from './views/Home/home.component';
import { LogInComponent } from './views/LogIn/login.component';
import {AuthGuard} from './Global/Guards/AuthGuard.service'
import { ProfileComponent } from './views/Profile/profile.component';

const routes: Routes = [
  {path:'',component:LogInComponent},
  {
    path: '',
    canActivate:[AuthGuard],
    component: DefaultLayoutComponent,
   
   // canActivateChild:[AuthGuard],
    children: [
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/Admin/admin.module').then((m) =>m.AdminModule)
      },

      {
        path: 'operation',
        loadChildren: () =>
          import('./views/Operations/operation.module').then((m) =>m.OperationModule)
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('./views/Accounting/accounting.module').then((m) =>m.AccountingModule)
      },
      


      {path:'home',component:HomeComponent},
      {path:'profile',component:ProfileComponent},
     
    ]
  },
  {path:'login',component:LogInComponent},
  {path: '**', redirectTo: 'home'},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
