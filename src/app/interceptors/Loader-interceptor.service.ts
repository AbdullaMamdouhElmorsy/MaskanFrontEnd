import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import {  finalize,Observable } from 'rxjs'
import { SpinnerService } from "../Global/Services/spinner.service";
import { GlobalService } from '../Global/Services/global.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private spinnerSerice: SpinnerService, private globalService:GlobalService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.includes("Search"))
         return next.handle(request);
        this.spinnerSerice.setLoading(false,request.url)
        this.spinnerSerice.setLoading(true, request.url);
        return next.handle(request).pipe(
            finalize(() =>{
                if(this.globalService.lang=="ar")
                this.globalService.applyRTLStyle();
                this.spinnerSerice.setLoading(false,request.url)
            } ),
      );
        // return next.handle(request)
        //     .pipe(catchError((err) => {
        //         this.spinnerSerice.setLoading(false, request.url);
        //         return err;
        //     });
            
            
           
    }
}