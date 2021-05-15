import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilService } from './util.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public cur_city: string = null;

  constructor(
    private api: ApiService,
    private util: UtilService,
    private log: LogService
  ) { }

  /**
   * Save the current city for this user instance.
   * @param uuid
   */
  setCurrentCity(city) {
    this.cur_city = city.uuid;
    this.util.setKeys('city', city);
  }
}
