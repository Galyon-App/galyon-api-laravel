import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { CityGuard } from 'src/app/guard/city.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        canActivate: [CityGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          },
        ]
      },
      {
        path: 'message',
        canActivate: [CityGuard, AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../message/message.module').then(m => m.MessagePageModule)
          },
        ]
      },
      {
        path: 'cart',
        canActivate: [CityGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cart/cart.module').then(m => m.CartPageModule)
          },
        ]
      },
      {
        path: 'order',
        canActivate: [CityGuard, AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../order/order.module').then(m => m.OrderPageModule)
          },
        ]
      },
      {
        path: 'account',
        canActivate: [CityGuard, AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountPageModule)
          },
        ]
      },
      {
        path: 'notfound',
        loadChildren: () => import('../notfound/notfound.module').then(m => m.NotfoundPageModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('../reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cities',
    loadChildren: () => import('../cities/cities.module').then(m => m.CitiesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'about/:page',
    children: [
      {
        path: '',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'notfound'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
