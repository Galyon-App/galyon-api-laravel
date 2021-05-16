import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { LogService } from 'src/app/services/log.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    private router: Router,
  ) {
    this.api.post('api/user/profile', {}).subscribe((response: any) => {
      console.log(response);
    });
  }

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

  appTerms() {
    this.router.navigate(['about/terms']);
  }

  appPrivacy() {
    this.router.navigate(['about/privacy']);
  }

  appContact() {
    this.router.navigate(['about/contact']);
  }

  appAbout() {
    this.router.navigate(['about/index']);
  }

  appFaqs() {
    this.router.navigate(['about/faqs']);
  }

  appHelp() {
    this.router.navigate(['about/help']);
  }

  appSupport() {
    //Do something
  }

  logout() {
    this.util.localClear();
    this.util.clearKeys();
    this.router.navigate(['login']);
  }
}
