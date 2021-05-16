import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment'
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.page.html',
  styleUrls: ['./boarding.page.scss']
})
export class BoardingPage implements OnInit {

  @ViewChild('boardingSlider')  slides: IonSlides;

  sliderInstance: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  private text_continue = 'CONTINUE';
  private text_complete = 'GET STARTED';
  get isComplete(): boolean {
    if(this.skipMsg === this.text_complete) {
      return true;
    }
    return false;
  }
  skipMsg: string = '';

  constructor(
    private util: UtilService,
    private router: Router
  ) {
    this.sliderInstance =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 1,
          title: 'Welcome to '+environment.appName,
          body: 'Here shopping is fun and interactive with lots of vendors, products, offers, deals, and many more.'
        },
        {
          id: 2,
          title: 'Easy and Secure Checkout',
          body: 'Enjoy safer and faster payments. We offer world famous four payment gateway for smooth and safe payment for your purchase.'
        },
        {
          id: 3,
          title: 'Fastest Delivery',
          body: 'Lots of vendors are waiting for your order, get fast delivery, and enjoy your daily life.'
        }
      ]
    };
    this.skipMsg = this.text_continue;
  }

  ngOnInit() {
  }

  onSlideEnd() {
    this.slideOpts.autoplay = true;
    this.skipMsg = this.text_complete;
  }

  onTransitionEnd(isNext) {
    if(!isNext) {
      this.slideOpts.autoplay = false;
      this.skipMsg = this.text_continue;
    }
  }

  skip() {
    if(this.isComplete) {
      let timestamp = new Date();
      this.util.localSet('boarding', timestamp)
      this.router.navigate(['home']);
    } else {
      this.slides.slideNext();
    }
  }
}
