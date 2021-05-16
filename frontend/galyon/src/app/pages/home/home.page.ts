import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from '../../services/util.service';
import { LogService } from '../../services/log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public  city: any = {} ;

  constructor(
    public user: UserService,
    private util: UtilService,
    private log: LogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.initialize();

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.city = this.router.getCurrentNavigation().extras.state.city;
      }
    });
  }

  async initialize() {
    this.util.getKeys('cities')
      .then(cities => {
        let city_uuid = this.util.localGet('city');
        this.city = cities.find(x => x.uuid == city_uuid);
      })
      .catch( error => {
        this.log.debug('Getting current user', error);
      })
  }

  changeCity() {
    this.router.navigate(['/cities']);
  }

  search() {
    this.router.navigate(['/search']);
  }
}
