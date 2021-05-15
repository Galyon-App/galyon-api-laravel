import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service'
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root'
})
export class CityGuard implements CanActivate {
  constructor(
    private router: Router,
    private menuController: MenuController,
    private user: UserService,
    private util: UtilService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.hasCurrentCity) {
      this.menuController.enable(true);
      return true;
    }

    this.menuController.enable(false);
    this.router.navigate(['/cities']);
    return false;
  }
}
