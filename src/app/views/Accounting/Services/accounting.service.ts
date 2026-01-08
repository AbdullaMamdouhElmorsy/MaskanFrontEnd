
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {APIResponse} from '../../../Global/Interfaces/APIResponse'
import { map } from "rxjs";
@Injectable({
    providedIn:"root"
})

export class AccountingService {

    constructor(
        private http:HttpClient,
    
    ){}
    private  RunScudualBillUrl:string="UniteBill/RunScuduleBills";
    private  changeUnpaidUnitesToSuspndedUrl:string="UniteBill/ChangeUnitesOfUnPaidToSuspened"; 
    private  getUnPaidUnitesBillsUrl:string="UniteBill/GetUnPaidBills?";                
    GetAll(nameofData:string)
    {
        return this.http.get<APIResponse>(`${nameofData}/GetAll`).pipe(
            map(res=>res.result)
        );
    }
    Get_Paging(nameofData:string,filters:any)
    {
        return this.http.get<APIResponse>(`${nameofData}/GetAll?`,{
            params:filters
        }).pipe(
            map(res=>res.result)
        );
    }
    Get_UnPaidUniteBills(filters:any)
    {
        return this.http.get<APIResponse>(this.getUnPaidUnitesBillsUrl,{
            params:filters
        }).pipe(
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
    ChangeUnpaidUnitesToSuspnded(data:any)
    {
        return this.http.put<APIResponse>(`${this.changeUnpaidUnitesToSuspndedUrl}`,data).pipe(
            map(res=>res.result)
        );
    }
    delete(dataType:string,id:any)
    {
        return this.http.delete<APIResponse>(`${dataType}/Delete/${id}`)
    }


    search(nameofData:string,searchValue:string)
    {
        return this.http.get<APIResponse>(`${nameofData}/Search/${searchValue}`).pipe(
            map(res=>res.result)
        )
    }
    runScudualBills(data:any)
    {
        return this.http.post<APIResponse>(this.RunScudualBillUrl,data).pipe(
            map(res=>res.result)
        );
    }



}