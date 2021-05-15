import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private api: ApiService,
    public util: UtilService,
    public log: LogService,
  ) { }

  ngOnInit() {
  }

  getProfile() {
    return null;
  }

  getName() {
    return 'Juan Dela Cruz';
  }

  getEmail() {
    return 'juandelacruz@bytescrafter.net';
  }

  editProfile() {
    //Do something
  }

  myAddress() {
    //Do something
  }

  myOrder() {
    //Do something
  }

  myFavorite() {
    //Do something
  }

  appContact() {
    //Do something
  }

  appAbout() {
    //Do something
  }

  appFaqs() {
    //Do something
  }

  appHelp() {
    //Do something
  }

  appSupport() {
    //Do something
  }

  logout() {
    //Do something
  }
}
