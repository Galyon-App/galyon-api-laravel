import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {

  private sub: any;
  public title: any;
  public body: any;
  public isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      switch(params.page) {
        case 'index':
          this.title = 'About Us';
          break;
        case 'contact':
          this.title = 'Contacts';
          break;
        case 'faqs':
          this.title = 'FAQs';
          break;
        case 'help':
          this.title = 'Help';
          break;
        case 'terms':
          this.title = 'Terms';
          break;
        case 'privacy':
          this.title = 'Privacy';
          break;
        default:
          this.router.navigate(['notfound']);
          break;
      }
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getBody() {
    return this.body;
  }

  back() {
    this.navCtrl.back();
  }

}
