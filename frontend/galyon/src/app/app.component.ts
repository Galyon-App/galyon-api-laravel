import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private util: UtilService,
    private router: Router,

  ) {
    if(!this.util.localHas('boarding')) {
      this.router.navigate(['boarding']);
    }
    console.log('%c Copyright © 2021 Galyon v'+environment.appVersion, 'background: #222; color: #bada55');
  }
}
