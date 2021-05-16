import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';

const components = [
  HeaderComponent,
  BannerComponent
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
