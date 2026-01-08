
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {APIResponse} from '../../../Global/Interfaces/APIResponse'
import { map } from "rxjs";
@Injectable({
    providedIn:"root"
})

export class OperationService {
private DoneVisitURl="Visit/Done";

private ComplainFilterUrl="Complain/Filter?"
private RequestFilterUrl="Request/Filter?";
private VisitFilterUrl="Visit/Filter?"
    constructor(
        private http:HttpClient,
    
    ){}
    GetAll(nameofData:string)
    {
        return this.http.get<APIResponse>(`${nameofData}/GetAll`).pipe(
            map(res=>res.result)
        );
    }
    Get_ById(nameofData:string,id:any)
    {
        return this.http.get<APIResponse>(`${nameofData}/GetById/${id}`).pipe(
            map(res=>res.result)
        );
    }
    VisisDone(visitId:number)
    {
        return this.http.put<APIResponse>(`${this.DoneVisitURl}/${visitId}`,null).pipe(
            map(res=>res.result)
        );
    }

    Add(nameofData:string,data:any)
    {
        return this.http.post<APIResponse>(`${nameofData}/Create`,data).pipe(
            map(res=>res.result)
        );
    }
    edit(nameofData:string,data:any)
    {
        return this.http.put<APIResponse>(`${nameofData}/Update`,data).pipe(
            map(res=>res.result)
        );
    }
    delete(dataType:string,id:any)
    {
        return this.http.delete<APIResponse>(`${dataType}/Delete/${id}`)
    }

    ComplainFilter(complainFilter:any)
    {
        return this.http.get<APIResponse>(this.ComplainFilterUrl,{
            params:complainFilter
        }).pipe(
            map(res=>res.result)
        );
    }
    requestFilter(requestFilters:any)
    {
        return this.http.get<APIResponse>(this.RequestFilterUrl,{
            params:requestFilters
        }).pipe(
            map(res=>res.result)
        );
    }
    visit_Filter(visitFilters:any)
    {
        return this.http.get<APIResponse>(this.VisitFilterUrl,{
            params:visitFilters
        }).pipe(
            map(res=>res.result)
        );
    }

    filter(nameOfData:any,filters:any)
    {
        return this.http.get<APIResponse>(`${nameOfData}/Filter?`).pipe(
            map(res=>res.result)
        )
    }


    
}