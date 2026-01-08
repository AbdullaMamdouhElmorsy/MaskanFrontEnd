import { Component,OnInit } from '@angular/core';
import { AdminNavItems,SuperAdminNavItems,OperationNavItems } from './_nav';
import { ArAdminNavItems,ArSuperAdminNavItems,ArOperationNavItems } from './_nav-ar';

import { UserInfo } from 'src/app/Global/Interfaces/userInfo.interface';
import { AuthService } from 'src/app/Global/Services/auth.service';
import {Roles} from '../../Global/Enums/enums'
import { INavData } from '@coreui/angular';
import { NotificationService } from 'src/app/Global/Services/notification.service';
import { Messaging, onMessage } from '@angular/fire/messaging';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent  implements OnInit {

  public navItems:INavData[]=[];
  homeNavItemAr:INavData= {
    name: 'الصفحة الرئيسية',
    url: '/home',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'جديد'
    }
  };
  homeNavItem:INavData= {
    name: 'Home Page',
    url: '/home',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'new'
    }
  };

 userInfo:UserInfo;
 lang:string;
  constructor(
    private authService:AuthService,
  ) {
    this.lang=localStorage.getItem("lang")??"en";
   // this.notificationService.listenToServiceWorkerMessages();
 
  }
  // Get MenuList Items Depnes On Logged in User Role
  getNavItem()
  {
    this.userInfo=this.authService.getLoggedUserInfo();
    
    if(this.userInfo?.roles==Roles[Roles.Operation])
    {
      if(this.lang=="en")
        this.navItems=OperationNavItems;
      else
        this.navItems=ArOperationNavItems
    }
      
    else  if(this.userInfo?.roles==Roles[Roles.Admin])
    {
      if(this.lang=="en")
        this.navItems=AdminNavItems;
      else
        this.navItems=ArAdminNavItems
    }

      else if(this.userInfo?.roles==Roles[Roles.SuperAdmin])
      {
        if(this.lang=="en")
          this.navItems=SuperAdminNavItems;
        else
          this.navItems=ArSuperAdminNavItems
      }
      
      this.navItems.forEach((item:INavData)=>{
      item.children?.sort((a, b) => {
      
        const nameA = a.name ? a.name.toLowerCase() : '';
        const nameB = b.name ? b.name.toLowerCase() : '';
      
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      });
      });
     if(this.lang=="en")
      this.navItems.unshift(this.homeNavItem);
    else
    this.navItems.unshift(this.homeNavItemAr);
     
      
  }

 ngOnInit(): void {
 
   this.getNavItem();
   //console.log(this.lang,"lang");
    
  }
}
