import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usercred: any = '';
  password: any = '';
  isBusy: boolean;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private api: ApiService,
    public util: UtilService,
    public log: LogService,
  ) {
    if (!this.util.user_login || this.util.user_login === '') {
      this.util.user_login = '0';
    }
  }

  login() {
    if (!this.usercred || !this.password) {
      this.util.showToast(this.util.getString('All Fields are required'), 'dark', 'bottom');
      return false;
    }

    this.isBusy = true;
    this.api.post('api/auth/login', {usercred: this.usercred, password: this.password}).subscribe((response: any) => {
      this.isBusy = false;
      console.log(response);

      if (response && response.success) {
        localStorage.setItem(this.util.getPrefix('uuid'), response.uuid);
        localStorage.setItem(this.util.getPrefix('token'), response.token);
        this.navCtrl.navigateRoot(['home']);
      } else {
        this.util.errorToast(response.data.message);
      }
    }, error => {
      this.isBusy = false;
      this.log.error(error);
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  reset() {
    this.router.navigate(['reset']);
  }

  back() {
    this.router.navigate(['home']);
  }
}
