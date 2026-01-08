import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from './Global/Services/spinner.service';
import {delay} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalService } from './Global/Services/global.service';
declare var $: any;
@Component({
  selector: 'app-root',
  template: `
  <ngx-loading-spinner  *ngIf="loading"></ngx-loading-spinner>

  <router-outlet>
  
  </router-outlet>`,
})
export class AppComponent implements OnInit  {
 
  
  title = 'Rehab Octoper';
  loading: boolean=false;
  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private spinnerService:SpinnerService,
    private translateService:TranslateService,
    private primeNGConfig: PrimeNGConfig,
    private globalService:GlobalService, 
    private renderer:Renderer2,
  ) {
    titleService.setTitle(this.title);
   // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(['en', 'ar']);
   
  }
  listenToLoading(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
 
 
  getLayOutDirection()
  {
    
    let lang=localStorage.getItem("lang")??"en";

    if (lang !== this.translateService.currentLang) 
        this.translateService.use(lang);

    if (lang === 'ar') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
     this.translateTable();
    
    } 
    else {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer.setAttribute(document.documentElement, 'lang', 'en');
    }
  }
  translateTable()
  {
   
    this.primeNGConfig.setTranslation({
      dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      dayNamesShort: ['أح', 'إث', 'ثلا', 'أربع', 'خمس', 'جم', 'سبت'],
      monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      monthNamesShort: ['ينا', 'فبر', 'مار', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      matchAll:"البحث في جميع",
      matchAny:"البحث في",
      contains:"تحتوي علي",
      dateIs:'التاريخ كما هو',
      dateAfter:'بعد التاريخ المحدد',
    dateIsNot:'عدا التاريخ المحدد',
    equals:'تساوي',
    notEquals:"لا تساوي",
    noFilter:"الغاء التصفيه",
      dateBefore:'قبل التاريخ المحدد',
      notContains:"لا تحتوي علي",
      endsWith:"تنتهي بي",
      today: 'اليوم',
      clear: 'مسح',
      apply:'بحث',
      startsWith:'البدء بي',
      choose:"اختار",
      //rtl: true,
      weekHeader: 'أسبوع',
      dateFormat: 'dd/mm/yy',
    }); 
  
  }
  

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
         this.getLayOutDirection();
        return;
      }
    });
    this.getLayOutDirection();
     

    this.listenToLoading();
  }


}
