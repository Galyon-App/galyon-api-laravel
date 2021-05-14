import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage {

  username: any;
  isBusy: boolean;

  constructor(
    private api: ApiService,
    public util: UtilService,
    private navCtrl: NavController,
    public log: LogService,
  ) {
    this.username = '';
  }

  reset() {
    if (!this.username || this.username != '' ) {
      this.util.errorToast(this.util.getString('All Field are required'));
      return false;
    }

    this.isBusy = true;
    this.api.post('users/resetPasswordWithPhone', { username: this.username }).subscribe((response: any) => {
      this.isBusy = false;

      if (response && response.success) {
        this.util.errorToast(this.util.getString('Check your email or phone for key'));
      } else {
        this.util.errorToast(response.data.message);
      }
    }, error => {
      this.isBusy = false;
      this.log.error(error);
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  back() {
    this.navCtrl.back();
  }
}
