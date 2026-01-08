import { Component, Input, Renderer2 } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/Global/Services/auth.service';
import { isThisTypeNode } from 'typescript';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls:['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
   savedMessages = localStorage.getItem("Notficaions");
  notificationMesages = new BehaviorSubject<any[]>(
    this.savedMessages ? JSON.parse(this.savedMessages) : []
  );
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  currentLang="en";
  
  public newNotifications = new Array(5)
  avatarLetter=new Array<string>(2);

  constructor(private classToggler: ClassToggleService,
    private authService:AuthService,
    private renderer: Renderer2,
    private router:Router,
    private afMessaging: AngularFireMessaging,
    private translateService: TranslateService,
    
    ) {
    super();
    this.getUserInfo();
    this.afMessaging.messages.subscribe(
      (message:any) => {
        const currentMessages = JSON.parse(localStorage.getItem("Notficaions") || "[]");
        this.notificationMesages.next ([message,...currentMessages]);
        this.saveNotificationMessages();
        console.log(message,"Notficaion");
      },
      err=>console.log(err),
      ()=>{
        // console.log(this.notificationMesages.notification.title);
        // console.log(this.notificationMesages.data.Id);
        // console.log(this.notificationMesages.data.Type);
        

      }
    );
    this.translateService.setDefaultLang(this.currentLang);
    this.translateService.use(this.currentLang);
    this.currentLang=localStorage.getItem("lang")??"en";
    this.getLayOutDirection();
  }
   userInfo:any;
  logOut()
  {
    this.authService.LogOut();
  }
  saveNotificationMessages()
  {
    debugger;
    const messages = this.notificationMesages.getValue(); // Get the current array
  if (messages && Array.isArray(messages)) {
    localStorage.setItem("Notficaions", JSON.stringify(messages));
    console.log(messages, "Saved notifications to localStorage");
  } else {
    console.warn("No messages to save.");
  }
  }
 
  getUserInfo()
  {
    this.userInfo= this.authService.getLoggedUserInfo();
   
  // console.log(this.userInfo,"Info")

  }
  switchLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar'
    localStorage.setItem("lang",this.currentLang);
    this.translateService.use(this.currentLang); // Change the language
    this.getLayOutDirection();
     
    this.translateService.use(localStorage.getItem("lang")??"en");
    window.location.reload();
  }
  getLayOutDirection()
  {
    if (this.currentLang === 'ar') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
    } else {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer.setAttribute(document.documentElement, 'lang', 'en');
    }
  }

}
