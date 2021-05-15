import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilService } from './util.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: any[] = [];

  constructor(
    private api: ApiService,
    private util: UtilService,
    private log: LogService
  ) { }

  /**
   * Add item to cart for this instance.
   * @param item
   */
  addToCart(item) {
    this.log.debug(item, 'Add item to cart.');
    let found = this.cart.find(x => x.id === item.id);
    if(found) {
      this.cart.forEach(element => {
        if (element.id === item.id) {
          element.quantiy += 1;
        }
      });
    } else {
      this.cart.push(item);
    }
    this.util.setKeys('cart', this.cart);
  }

  /**
   * Add quantity to the
   * @param quantity
   * @param id
   * @returns
   */
  setQtyToCart(quantity, id) {
    if (quantity < 0) {
      this.removeToCart(id);
      return false;
    }

    this.cart.forEach(element => {
      if (element.id === id) {
        element.quantiy = quantity;
      }
    });
  }

  /**
   * Remove item to cart for this instance.
   * @param id
   */
  removeToCart(id) {
    let item = this.cart.find(x => x.id === id);
    this.log.debug(item, 'Remove item to cart');
    this.cart = this.cart.filter(x => x.id !== id);
    this.util.setKeys('cart', this.cart);
  }

  /**
   * Clear cart for this instance.
   */
  clearCart() {
    this.log.debug([], 'Clear item on cart.');
    this.cart = [];
    this.util.clearKeys('cart');
  }
}
