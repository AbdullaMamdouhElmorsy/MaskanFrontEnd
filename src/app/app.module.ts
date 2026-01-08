import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {LoaderInterceptor} from './interceptors/Loader-interceptor.service';
import {BaseUrlInterceptor} from './interceptors/baseurl-interceptor.service'
import {HandlerErrorInterceptor} from './interceptors/handle-error-interceptor.service'
import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';
import {SpinnerComponent} from './Global/Components/spinner/spinner.component'

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {HomeComponent} from './views/Home/home.component';
import {LogInComponent} from './views/LogIn/login.component'
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import {ProfileComponent } from './views/Profile/profile.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; // Import TranslateModule
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // path to translation files
}
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
  HomeComponent,
  SpinnerComponent,
  LogInComponent,
  ProfileComponent
];

@NgModule({ declarations: [AppComponent, ...APP_CONTAINERS],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AvatarModule,
        BreadcrumbModule,
        ChartjsModule,
        FooterModule,
        DropdownModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        IconModule,
        NavModule,
        ButtonModule,
        DocsComponentsModule,
        FormModule,
        UtilitiesModule,
        ButtonGroupModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        TabsModule,
        ListGroupModule,
        ProgressModule,
        BadgeModule,
        ListGroupModule,
        CardModule,
        NgScrollbarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      
      AngularFireMessagingModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        //provideMessaging(() => getMessaging()),
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true, },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
        { provide: HTTP_INTERCEPTORS, useClass: HandlerErrorInterceptor, multi: true },
        IconSetService,
        Title,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
}
