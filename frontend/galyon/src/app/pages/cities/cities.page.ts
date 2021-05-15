import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { CartService } from 'src/app/services/cart.service';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage {
  cities: any[] = [];
  uuid: any; //current city
  isBusy: boolean;

  constructor(
    public api: ApiService,
    public util: UtilService,
    private navCtrl: NavController,
    public cart: CartService,
    public log: LogService,
    private user: UserService
  ) {
    this.getCities();
    console.log(this.util.getKeys('city'));
  }

  getCities() {
    this.isBusy = true;
    this.api.post('api/cities/active', {}).subscribe((response: any) => {
      this.isBusy = false;
      if (response && response.data.length) {
        this.cities = response.data;
        this.util.setKeys('cities', this.cities)
      } else {
        this.util.showMessage(this.util.getString('No Cities Found'));
      }
    }, error => {
      this.isBusy = false;
      this.log.error(error);
      this.util.showMessage(this.util.getString('Something went wrong'), 'danger');
    });
  }

  selected() {
    const city = this.cities.find(x => x.uuid === this.uuid);
    this.user.setCurrentCity(city);
    this.cart.clearCart();
    this.navCtrl.navigateRoot(['']);
  }
}
