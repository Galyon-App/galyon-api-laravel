import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  isLoading = false;
  private storage: Storage | null = null;
  public appPage: any[] = [];
  public translations: any[] = [];

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public router: Router,
    private navCtrl: NavController,
    private _storage: Storage
  ) {
    this.initialize();
    this.appPage = [
      {
        title: 'Home',
        url: 'user/home',
        icon: 'assets/sidemenu/home.png',
        icon2: 'assets/sidemenu/home2.png',
        icn: 'home-outline'
      },
      {
        title: 'History',
        url: 'user/orders',
        icon: 'assets/sidemenu/home.png',
        icon2: 'assets/sidemenu/home2.png',
        icn: 'document-text-outline'
      },
      {
        title: 'Profile',
        url: 'user/account',
        icon: 'assets/sidemenu/user.png',
        icon2: 'assets/sidemenu/user2.png',
        icn: 'person-outline'
      },
      {
        title: 'Language',
        url: 'languages',
        icon: 'assets/sidemenu/language.png',
        icon2: 'assets/sidemenu/language2.png',
        icn: 'language-outline'
      },
      {
        title: 'About',
        url: 'user/account/about',
        icon: 'assets/sidemenu/info.png',
        icon2: 'assets/sidemenu/info2.png',
        icn: 'alert-circle-outline'
      },
      {
        title: 'Contact us',
        url: 'user/account/contacts',
        icon: 'assets/sidemenu/contact.png',
        icon2: 'assets/sidemenu/contact2.png',
        icn: 'mail-outline'
      },
      {
        title: 'FAQs',
        url: 'user/account/faqs',
        icon: 'assets/sidemenu/contact.png',
        icon2: 'assets/sidemenu/contact2.png',
        icn: 'flag-outline'
      },
      {
        title: 'Help',
        url: 'user/account/help',
        icon: 'assets/sidemenu/contact.png',
        icon2: 'assets/sidemenu/contact2.png',
        icn: 'help-circle-outline'
      },
    ];
  }

  /**
   * Initialize instance of this util service.
   */
  async initialize() {
    if(!this.storage) {
      // If using, define drivers here: await this.storage.defineDriver(/*...*/);
      this.storage = await this._storage.create();
    }
  }

  /**
   * Show a loading bubble on screen with optional message parameter.
   * @param msg
   * @returns
   */
  async showBusy(message?, presentEvent=null, dismissEvent=null) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: message,
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {
            if(dismissEvent != null && typeof dismissEvent === 'function') {
              dismissEvent();
            }
          });
        } else {
          if(presentEvent != null && typeof presentEvent === 'function') {
            presentEvent();
          }
        }
      });
    });
  }

  /**
   * Hide the loading bubble on screen. Check showBusy method on same service.
   * @param dismissEvent
   * @returns
   */
  async hideBusy(dismissEvent=null) {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss()
      .then(() => {
        if(dismissEvent != null && typeof dismissEvent === 'function') {
          dismissEvent();
        }
      });
  }

  /**
   * Show an alert notification with ok button.
   * @param message
   * @param header
   * @param ok
   */
  async showAlert(message, header='', ok='OK') {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [ok]
    });
    await alert.present();
  }

  /**
   * Verify the string if it a valid email.
   * @param email
   * @returns
   */
  async isValidEmail(email) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Show a n notification that can set the color and position of popup, optionally, you can pass a callback.
   * @param message string
   * @param colors dark, danger, success, light
   * @param duration default = 3 seconds
   * @param callback default = null
   */
  async showMessage(message, colors='dark', duration=3000, callback=null) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: colors,
      position: 'bottom',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            if(callback !== null && typeof callback === 'function') {
              callback();
            }
          }
        }
      ]
    });
    toast.present();
  }

  /**
   * Http status response error to general string message.
   * @param err
   */
  apiErrorHandler(err) {
    if (err.status === -1) {
      this.showAlert('Failed To Connect With Server');
    } else if (err.status === 401) {
      this.showAlert('Unauthorized Request');
      this.navCtrl.navigateRoot('/login');
    } else if (err.status === 500) {
      this.showAlert('Somethimg Went Wrong');
    }
  }

  /**
   * Try to get a translation if not null else just return same string.
   * @param str
   * @returns
   */
  getString(str) {
    if (this.translations[str]) {
      return this.translations[str];
    }
    return str;
  }

  /**
   * Get the key with our global local Database driver prefix.
   * @param keyString
   * @returns
   */
  getPrefix(keyString) {
    return environment.appPrefix + keyString;
  }

  /**
   * Set an item to local Database driver.
   * @param key
   * @param value
   * @returns
   */
  setKeys(key, value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if(!this.storage) {
        await this.initialize();
      }
      this.storage.set(this.getPrefix(key), value)
      .then((data) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Get item with a key on local Database driver.
   * @param key
   * @returns
   */
  getKeys(key): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if(!this.storage) {
        await this.initialize();
      }
      this.storage.get(this.getPrefix(key))
      .then((data) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Check item with a key on local Database driver.
   * @param key
   * @returns
   */
  async hasKeys(key) {
    if(!this.storage) {
      await this.initialize();
    }
    const val = await this.storage.get(this.getPrefix(key))
    return val ? true : false;
  }

  /**
   * Remove item from local Database driver.
   * @param key
   */
  async removeKeys(key) {
    await this.storage.remove(this.getPrefix(key));
  }

  /**
   * Clear keys of an item on local Database driver.
   * @param key
   */
  async clearKeys() {
    await this.storage.clear();
  }

  /**
   * Set item on localStorage with prefix.
   * @param key
   * @param val
   */
  localSet(key, val) {
    localStorage.setItem(this.getPrefix(key), val);
  }

  /**
   * Get item localStorage with prefix.
   * @param key
   */
  localGet(key) {
    return localStorage.getItem(this.getPrefix(key));
  }

  localHas(key) {
    let item = this.localGet(key);
    if(item && item !== null && item !== 'null' && typeof item !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove item on localStorage with prefix.
   * @param key
   */
  localRemove(key) {
    localStorage.removeItem(this.getPrefix(key));
  }

  /**
   * Clear localStorage with prefix.
   */
  localClear() {
    localStorage.clear();
  }
}
