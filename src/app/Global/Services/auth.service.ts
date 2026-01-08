import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, map } from "rxjs";
import { APIResponse } from "../Interfaces/APIResponse";
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
import {UserInfo} from '../Interfaces/userInfo.interface'
@Injectable({
    providedIn:"root"
})


export class AuthService {

    constructor(
        private http:HttpClient,
        private router:Router
    ){}
   private loginUrl="Identity/LogIn";
   private TenantUrl="Identity/GetAllTenant"
   private chnagePassowrUrl="User/ChangePassword";
   activeUrl= new BehaviorSubject<string>("");
    userInfo:UserInfo={
        firstName:null,
        lastName:null,
        nationalId:null,
        email:null,
        roles:null,
        tenantId:null,
        userName:null,
        userStatus:null,
        tenantName:null,

    }
    LogIn(loginForm:any)
    {
        return this.http.post<APIResponse>(this.loginUrl,loginForm).pipe(
            map(res=>res.result)
        )
    }
    LogOut()
    {
        localStorage.removeItem("userToken");
      //  console.log("dsadas")
        this.router.navigate(['/login']);
    }
    setToken(token:string)
    {
        localStorage.setItem("userToken",token);
       // console.log(token,"Token:")
        //this.DeCodeJwt(token)
    }
    getToken():string
    {
        return localStorage.getItem("userToken")||'';
    }
    isLoggedIn():boolean
    {
        return localStorage.getItem("userToken")?true:false;
    }
    getAllTenant()
    {
        return this.http.get<APIResponse>(this.TenantUrl).pipe(
            map(res=>res.result)
        )
    }
    // Decode JWt To Extarct user Info From Token 
   private DeCodeJwt()
    {
     let token= localStorage.getItem("userToken")||''
     let jwtDecoded:any; 
      jwtDecoded  =jwt_decode(token);
      this.MapDecodedJwt(jwtDecoded)
    //console.log(jwtDecoded,"Dec")
      return jwtDecoded;
    }
    private MapDecodedJwt(jwtDecoded:any)
    {
        this.userInfo.firstName=jwtDecoded?.FirstName;
        this.userInfo.lastName=jwtDecoded?.LastName;
        this.userInfo.email=jwtDecoded?.email;
        this.userInfo.nationalId=jwtDecoded?.NationalId;
        this.userInfo.tenantId=jwtDecoded?.TenantId;
        this.userInfo.userStatus=jwtDecoded?.UserStatus;
        this.userInfo.userName=jwtDecoded?.sub,
        this.userInfo.roles=jwtDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        this.userInfo.tenantName=jwtDecoded?.TenantName;
      //  console.log(jwtDecoded,"decode");
       // console.log(this.userInfo,"Info");
    }
    getLoggedUserInfo():UserInfo
    {
      let jwtDecoed= this.DeCodeJwt();
       this.MapDecodedJwt(jwtDecoed);
        return this.userInfo;
    }

    changePassword(data:any)
    {
        return this.http.put<APIResponse>(this.chnagePassowrUrl,data).pipe(
            map(res=>res.result)
        )
    }



    

    
}