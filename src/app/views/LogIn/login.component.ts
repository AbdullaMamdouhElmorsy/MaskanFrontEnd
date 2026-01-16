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
  
  // Request notification permission but don't block login if it fails
  this.notificationService.requestPermission()
    .then(token=>{
      // Set notification token if permission granted
      this.loginForm.get("notificationToken")?.setValue(token);
    })
    .catch(error=>{
      // Handle notification permission denial or error
      console.warn('Notification permission denied or failed:', error);
      // Set token to null so backend knows notifications are not available
      this.loginForm.get("notificationToken")?.setValue(null);
    })
    .finally(()=>{
      // Always proceed with login regardless of notification status
      this.authService.LogIn(this.loginForm.value).subscribe(
        res=>this.token=res,
        error=>console.error(error,"err"),
        ()=>{
          this.tokenHandler(this.token);
          // Retry notification registration after successful login
          this.retryNotificationRegistration();
        }
      );
    });
}

/**
 * Retry notification registration after login if it initially failed
 * This handles cases where user denied permission or service failed temporarily
 */
private retryNotificationRegistration(): void {
  const currentToken = this.loginForm.get("notificationToken")?.value;
  
  // Only retry if we don't have a valid token
  if (!currentToken) {
    console.log('Retrying notification registration after login...');
    
    // Wait a bit before retrying (gives user time to see they're logged in)
    setTimeout(() => {
      this.notificationService.requestPermission()
        .then(token => {
          if (token) {
            console.log('Notification token obtained after login:', token);
            // Update notification token on the backend
            this.authService.updateNotificationToken(token).subscribe({
              next: (response) => {
                console.log('Notification token updated successfully:', response);
              },
              error: (error) => {
                console.error('Failed to update notification token:', error);
              }
            });
          }
        })
        .catch(error => {
          console.log('Notifications disabled - user can enable them later from settings.');
        });
    }, 2000); // 2 second delay
  }
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