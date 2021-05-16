import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { CartService } from 'src/app/services/cart.service';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage {
  public cities: any[] = [];
  private uuid: any; //current city
  private isBusy: boolean;

  constructor(
    public api: ApiService,
    public util: UtilService,
    private navCtrl: NavController,
    public cart: CartService,
    public log: LogService,
    private user: UserService,
  ) {
    this.getCities();


  }

  getCities() {
    this.isBusy = true;
    this.util.showBusy();
    this.api.post('api/cities/active', {}).subscribe((response: any) => {
      this.isBusy = false;
      this.util.hideBusy();
      if (response && response.data.length) {
        this.cities = response.data;
        this.util.setKeys('cities', this.cities);
      } else {
        this.util.showMessage(this.util.getString('No Cities Found'));
      }
    }, error => {
      this.isBusy = false;
      this.util.hideBusy();
      this.log.error(error);
      this.util.showMessage(this.util.getString('Something went wrong'), 'danger');
    });
  }

  selected() {
    const city = this.cities.find(x => x.uuid === this.uuid);
    this.user.setCurrentCity(city);
    this.cart.clearCart();

    let navCity: NavigationExtras = { state: { city: city } };
    this.navCtrl.navigateRoot(['/home'], navCity);
  }
}
