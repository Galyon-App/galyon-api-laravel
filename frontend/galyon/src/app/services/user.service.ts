import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilService } from './util.service';
import { LogService } from './log.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
    private util: UtilService,
    private log: LogService,
    private auth: AuthService
  ) {}

  get hasAuthUser(): boolean {
    return this.auth.isLoggedIn;
  }

  get hasCurrentCity(): boolean {
    return this.util.localHas('city');
  }

  /**
   * Save the current city for this user instance.
   * @param uuid
   */
  setCurrentCity(city) {
    this.util.localSet('city', city.uuid);
  }
}
