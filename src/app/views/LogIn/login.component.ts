import {Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../Global/Services/notification.service';
import { AuthService } from '../../Global/Services/auth.service';

@Component({
    selector:'maskan-login',
    templateUrl:'./login.component.html'
})
export class LogInComponent implements OnInit {

loginForm:FormGroup;
token:string;
tenants:any;
constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private notificationService:NotificationService,
    private router:Router
){

}
requestNotificationPermission(): void {
  this.notificationService.requestPermission()
    
}
isValid()
{
   // console.log(this.loginForm.valid,"dasdsadsa")
   return this.loginForm.valid;
    
}
get_Tenant()
{
  this.authService.getAllTenant().subscribe(
    res=>this.tenants=res,
    error=>console.log(error),
    ()=>{
      
    }
  )
}
LogIn()
{
  if(!this.isValid())
    return;
  this.notificationService.requestPermission().then(token=>{
    this.loginForm.get("notificationToken")?.setValue(token);
    this.authService.LogIn(this.loginForm.value).subscribe(
      res=>this.token=res,
      error=>console.error(error,"err"),
      ()=>{
        this.tokenHandler(this.token);
      }
    );
  })
  
}

tokenHandler(token:string)
{
  
  this.authService.setToken(token);
 
  this.authService.activeUrl.subscribe(res=>{
    if(res.length>0)
    this.router.navigateByUrl(res);
   else
   this.router.navigateByUrl("./home");
  });
 

  
}

 ngOnInit(): void {
     this.loginForm=this.fb.group({
        email:[null,[Validators.required,Validators.email]],
        password:[null,Validators.required],
       // tenantId:[null,Validators.required],
        notificationToken:[null],

     })
    // this.get_Tenant();
     this.requestNotificationPermission();
 }

}