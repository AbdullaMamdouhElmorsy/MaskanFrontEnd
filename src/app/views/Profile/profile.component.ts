import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordPattrenValidation } from "src/app/Global/Pattren/regex";
import { AuthService } from "src/app/Global/Services/auth.service";
import { GlobalService } from "src/app/Global/Services/global.service";

@Component({
    selector:'ngx-profile',
    templateUrl:'./profile.component.html'
}) 

export class ProfileComponent implements OnInit{

    constructor(
        private globalService:GlobalService,
        private fb:FormBuilder,
        private authService:AuthService
    ){

    }
 changePassowrdFormGroup:FormGroup;
 loggedUserinfo:any;
isValid()
{
    return this.changePassowrdFormGroup.valid;
}
changePassword()
{
    if(!this.isValid())
       return;
    this.authService.changePassword(this.changePassowrdFormGroup.value).subscribe(
        res=>res,
        error=>console.log(error),
        ()=>{
           this.globalService.EditSuccessfullyMessage();
        }
    )
       
}
pattrenValidation(fromControlName:any){
    return this.changePassowrdFormGroup.get(fromControlName)?.errors?.["pattern"];
  }
match()
{
    let newPassowrd=this.changePassowrdFormGroup.get("newPassword");
    let confirmedPassowrd=this.changePassowrdFormGroup.get("confirmedNewPassword");
    if(confirmedPassowrd?.touched && (newPassowrd?.value!=confirmedPassowrd?.value))
         return false;
        return true;

    return newPassowrd==confirmedPassowrd?true:false
}
getLoggedUserInfo()
{
    this.loggedUserinfo=this.authService.getLoggedUserInfo();
    console.log(this.loggedUserinfo,"nfo")
}
    ngOnInit(): void {
        this.changePassowrdFormGroup=this.fb.group({
            currentPassword:[null,[Validators.required]],
            newPassword:[null,[Validators.required,Validators.pattern(PasswordPattrenValidation)]],
            confirmedNewPassword:[null,Validators.required]
        });

        this.getLoggedUserInfo();
    }
}