import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-topstore',
  templateUrl: './topstore.component.html',
  styleUrls: ['./topstore.component.scss'],
})
export class TopstoreComponent implements OnInit {

  dummy: any[] = Array(5);
  stores: any[] = [];
  slideOpts = {
    slidesPerView: 1.5,
  };

  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {}

  goToStore() {

  }

  openStore(store) {

  }

}
