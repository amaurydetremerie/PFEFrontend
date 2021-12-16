import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule} from '@agm/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
} from '@azure/msal-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { CategoryService } from '../services/category.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { OffersComponent } from './offers/offers.component';

import * as auth from './auth-config.json';
import {InsertOfferComponent} from './insertOffer/insertOffer.component';
import {InsertOfferFormComponent} from './insertOfferForm/insertOfferForm.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ToastrModule} from 'ngx-toastr';
import { OffersService } from '../services/offers.service';
import { CategoryComponent } from './category/category.component';
import { SingleOfferComponent } from './single-offer/single-offer.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { RoleGuard } from '../services/role-guard.service';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { AnnonceSignaleComponent } from './annonce-signale/annonce-signale.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;



/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: auth.credentials.clientId,
      authority:
        'https://login.microsoftonline.com/' + auth.credentials.tenantId,
      redirectUri: auth.configuration.redirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  });
}

/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob
 * /dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(auth.resources.todoListApi.resourceUri, auth.resources.todoListApi.resourceScopes);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0', ['user.read', ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { interactionType: InteractionType.Redirect };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemberComponent,
    InsertOfferComponent,
    InsertOfferFormComponent,
    OffersComponent,
    CategoryComponent,
    AddCategoryComponent,
    SingleOfferComponent,
    CategoryAdminComponent,
    AnnonceSignaleComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWAxZuxBotVm1XRPLLJzKlPaNNL26J6tY'
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MsalModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    OffersService,
    CategoryService,
    RoleGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
