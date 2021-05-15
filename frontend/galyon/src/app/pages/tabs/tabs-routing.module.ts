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
        children: []
      },
      {
        path: 'cart',
        children: []
      },
      {
        path: 'order',
        children: []
      },
      {
        path: 'account',
        children: []
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
