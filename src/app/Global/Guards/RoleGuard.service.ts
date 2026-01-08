import { Injectable, OnInit } from "@angular/core";
import {  CanActivateChildFn, CanActivateFn, Router,
  ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree, CanActivate, CanActivateChild

} from "@angular/router";
import { Observable, concat } from "rxjs";
import {AuthService} from '../Services/auth.service';
import { AdminNavItems,OperationNavItems,SuperAdminNavItems } from '../../containers/default-layout/_nav';
import { Roles } from "../Enums/enums";
import { UserInfo } from "../Interfaces/userInfo.interface";
@Injectable({
    providedIn: 'root'
  })

export class RoleGuard implements  CanActivate,CanActivateChild  ,OnInit{

    private LoggedUserURls:any;
    private filterUrls:any;
    private userInfo:any;
    constructor(private authService: AuthService, private router: Router) {
      
      
     }
     ngOnInit(): void {
       

        //  console.log(this.userInfo,"Info")
     }
    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
     //  console.log("Logged");
      this.authService.isLoggedIn();
      return true;
    }
    canActivateChild(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
       
        this.getLoggedUserURLS();
      
           let url:any;
            url=state.url;
            console.log(url,"dada");
            if(this.LoggedUserURls)
                return  this.LoggedUserURls?.includes(url);
            else
             return false;
        
    
   
   
  }

  getLoggedUserURLS()
  {
    this.userInfo= this.authService.getLoggedUserInfo()

  //  console.log(this.userInfo,"info")
       
    if(this.userInfo.roles==Roles[Roles.Operation])
    {
        this.filterUrls=OperationNavItems.filter(item=>item.name== "Admin"|| item.name=="Operation").map(a=>a.children?.map(s=>s.url));
        this.LoggedUserURls=[].concat(...this.filterUrls) ;
       // console.log(this.LoggedUserURls,"Operation")
    }
     
    else if(this.userInfo?.roles==Roles[Roles.Admin])
    {
       
        this.filterUrls=AdminNavItems.filter(item=>item.name== "Admin"|| item.name=="Operation"|| item.name=="Accounting").map(a=>a.children?.map(s=>s.url));
        this.LoggedUserURls=[].concat(...this.filterUrls);
      //  console.log(this.LoggedUserURls,"Admin")
    }
       
    else if(this.userInfo?.roles==Roles[Roles.SuperAdmin])
    {
       
        this.filterUrls=SuperAdminNavItems.filter(item=>item.name== "Admin"|| item.name=="Operation"||item.name=="Accounting").map(a=>a.children?.map(s=>s.url));
        this.LoggedUserURls=[].concat(...this.filterUrls) ;
        //console.log(this.LoggedUserURls,"Super Admin")
    }
    else
    //  console.log( this.authService.userInfo.roles,"UserROles");

     console.log(this.userInfo.roles?.includes(Roles[Roles.SuperAdmin]),"Role")
  }


  
 
    

    }
  