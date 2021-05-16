import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public  city: any = {} ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilService,
    private log: LogService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.city = this.router.getCurrentNavigation().extras.state.city;
      }
    });
  }

  async ngOnInit() {
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
