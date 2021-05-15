import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilService } from './util.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public city: any = null;
  get hasCurrentCity(): boolean {
    return this.util.localHas('city');
  }

  constructor(
    private api: ApiService,
    private util: UtilService,
    private log: LogService
  ) {}

  /**
   * Save the current city for this user instance.
   * @param uuid
   */
  setCurrentCity(city) {
    this.city = city;
    this.util.localSet('city', city.uuid);
  }
}
