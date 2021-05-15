import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  fname: any = '';
  lname: any = '';
  gender: any = '1';
  email: any = '';
  password: any = '';

  isBusy: boolean;
  check: boolean;

  dummy: any[] = [];
  constructor(
    private navCtrl: NavController,
    public util: UtilService,
    private router: Router,
    private api: ApiService,
    private iab: InAppBrowser,
    public log: LogService,
  ) { }

  register() {

    if (!this.check) {
      this.util.showMessage(this.util.getString('Please accept terms and conditions'), 'dark');
      return false;
    }

    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.util.showMessage(this.util.getString('Please enter valid email'), 'dark');
      return false;
    }

    if (!this.fname || !this.lname || !this.email || !this.password) {
      this.util.showMessage(this.util.getString('All Fields are required'), 'dark');
      return false;
    }

    const param = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password,
      password_confirmation: this.password,
      gender: this.gender,
    };

    this.isBusy = true;
    this.api.post('api/auth/register', param).subscribe((response: any) => {
      this.isBusy = false;
      console.log(response);

      if (response && response.success) {
        localStorage.setItem(this.util.getPrefix('uuid'), response.uuid);
        localStorage.setItem(this.util.getPrefix('token'), response.token);
        this.navCtrl.navigateRoot(['home']);
      } else {
        this.util.showMessage(response.data.message, 'danger');
      }
    }, error => {
      this.isBusy = false;
      this.log.error(error);
      this.util.showMessage(this.util.getString('Something went wrong'), 'danger');
    });
  }

  back() {
    this.router.navigate(['/login']);
  }

  privacy() {
    this.iab.create('http://galyon.app/privacy');
  }
}
