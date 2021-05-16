import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { TopstoreComponent } from './topstore/topstore.component';

const components = [
  HeaderComponent,
  BannerComponent,
  CategoryComponent,
  TopstoreComponent
];
@NgModule({
    declarations: [
        components
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    exports: [
        ...components,
    ]
})
export class ComponentsModule { }
