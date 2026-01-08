import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { AuthService } from "../Global/Services/auth.service";
import { Router, RouterStateSnapshot } from "@angular/router";

@Injectable()

export class HandlerErrorInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService,private route:Router){
       
    }
    intercept(req:HttpRequest<any>,next:HttpHandler){

        
        return next.handle(req).pipe(
            catchError((error)=>{
               
            
                this.handleError(error);      
                      

                        
                       

                return throwError(error)

                
            })
        );

    }

    handleError(error:any){
        let errorMessage='';
     //   console.log(error,"Interceptor Error");
       if(error.status==401)
          errorMessage="Session Expired Please ReLogin";
        else if(error.status==403)
        errorMessage="Un Authrized"
        else if (error.error==null || error.status==0)
        {
           
            errorMessage="Internal ServerError";
        }
        
        else 
        {
            if(error.error?.errors)
              errorMessage=error.error.errors[0];
            else
            errorMessage=error.error?.message;

        }
           
            
 
         Swal.fire({
             icon: 'error',
             title: "ERROR",
            
             text: errorMessage,
 
              showConfirmButton: true,
             confirmButtonText: `Ok`,
 
     
         }).then(()=>{
             
             if(error.status==401)
             {
                this.authService.activeUrl.next(this.route.url)
                this.authService.LogOut();
             }
                 
         })
     } 

} 