import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { WeatherforecastViewComponent } from './weatherforecast-view/weatherforecast-view.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SingleOfferComponent } from './single-offer/single-offer.component';

/**
 * MSAL Angular can protect routes in your application
 * using MsalGuard. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#secure-the-routes-in-your-application
 */
const routes: Routes = [
  {
    path: 'weatherforecast-view',
    component: WeatherforecastViewComponent,
    canActivate: [MsalGuard],
  },
  {
    // Needed for hash routing
    path: 'state',
    component: HomeComponent,
  },
  {
    // Needed for hash routing
    path: 'code',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    // Needed for hash routing
    path: 'offers',
    component: OffersComponent,
    canActivate: [MsalGuard],
  },

  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'addCategory',
    component: AddCategoryComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'singleOffer/:id',
    component: SingleOfferComponent,
    canActivate: [MsalGuard],
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
