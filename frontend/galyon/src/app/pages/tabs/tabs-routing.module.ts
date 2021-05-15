import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundPage } from '../notfound/notfound.page';

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
    path: '**',
    redirectTo: 'notfound'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
