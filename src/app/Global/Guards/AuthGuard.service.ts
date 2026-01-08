import { Injectable } from "@angular/core";
import {  CanActivateChildFn, CanActivateFn, Router,
  ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree, CanActivate, CanActivateChild

} from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from '../Services/auth.service'
import { GlobalService } from "../Services/global.service";
@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements  CanActivate,CanActivateChild {

    constructor(
      private authService: AuthService,
       private router: Router,
       
      
      ) { }
    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (!this.authService.isLoggedIn()) {
        this.authService.activeUrl.next(state.url);
       //  console.log(state.url,"Url");
        this.router.navigate(['/login']);
        return false;
      }
      // logged in, so return true
      this.authService.isLoggedIn();
      return true;
    }
    canActivateChild(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    // logged in, so return true
    this.authService.isLoggedIn();
    return true;
  }


    
  //   CanActivateFn ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  //   :
  // | Observable<boolean | UrlTree>
  // | Promise<boolean | UrlTree>
  // | boolean
  // | UrlTree 
  //     {
       
  //       if (!this.authService.isLoggedIn()) {
  //             this.router.navigate(['/login']);
  //             console.log("Not LoggedIn")
  //             return false;
  //           }
  //           // logged in, so return true
  //           // this.authService.isLoggedIn();
  //           return true;
          
  //     }
    

    }
  