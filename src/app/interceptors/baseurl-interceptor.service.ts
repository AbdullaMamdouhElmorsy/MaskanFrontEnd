import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable()

export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let token=localStorage.getItem("userToken");
       // const baseUrl = "http://localhost:2030/api/";
        let domainUrl;
       
          
          
           
        // let lastIndex=req.url.length-1;
        // let beforeLastIndex=lastIndex-1;
        // console.log(req.url);
        // console.log();
        if(token)
        {
            
          if(req.url.includes("gov"))
          {
            domainUrl=req.clone({
                url:req.url,
                setHeaders:{
            'Content-Type': 'application/x-www-form-urlencoded',
         //    'onbehalfof' :  '[{"key":"onbehalfof","value":"100015840","type":"text"}]'
             }
            });
          }

           else if(req.url.includes("timezone"))
             domainUrl=req.clone({
                url:req.url
             });
             else
             {
                if(req.url.includes("i18"))
                {
                    domainUrl = req.clone({
                        url:req.url,
                        setHeaders:{
                            Authorization:`Bearer ${token}`
                        }
                 
                       
                        
                    });
                    // console.log(domainUrl.url,"TOken");
                }
                else
                {
                    domainUrl = req.clone({
                        url: environment.baseUrl + req.url,
                        setHeaders:{
                            Authorization:`Bearer ${token}`
                        }
                 
                        
                    });
                    // console.log(domainUrl.url,"WithOut Token");
                   
                }
             }
          
            
            
           
      
        return next.handle(domainUrl);
    
    
        
        }

        else
        {
            //req.url[beforeLastIndex]=='o' &&req.url[lastIndex]=='n'
            if(  req.url.includes("i18"))
            {
                domainUrl = req.clone({
                    url:req.url
                });
            }
                else
                {
                    domainUrl = req.clone({
                        url:  environment.baseUrl  + req.url
                    });
                }
            return next.handle(domainUrl);
            
        }
        
          
    }
}