import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    public cart: CartService,
    public util: UtilService
  ) { }

  ngOnInit() {
  }

}
