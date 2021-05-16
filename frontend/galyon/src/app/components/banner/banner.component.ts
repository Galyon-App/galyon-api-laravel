import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  sliderInstance: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor() {
    this.sliderInstance =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          url:'assets/images/banner.jpg'
        }
      ]
    };
  }

  ngOnInit() {}

}
