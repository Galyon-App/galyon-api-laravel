import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from 'src/app/services/util.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get uuid(): string {
    return localStorage.getItem(this.util.getPrefix('uuid'));
  }
  set uuid(value: string) {
    localStorage.setItem(this.util.getPrefix('uuid'), value);
  }

  get token(): string {
    return localStorage.getItem(this.util.getPrefix('token'));
  }
  set token(value: string) {
    localStorage.setItem(this.util.getPrefix('token'), value);
  }

  get isLoggedIn(): boolean {
    let curUuid = localStorage.getItem(this.util.getPrefix('uuid'));
    let curToken = localStorage.getItem(this.util.getPrefix('token'));

    if (curUuid && curUuid != null && curUuid !== 'null' && typeof curUuid !== 'undefined'
      && curToken && curToken != null && curToken !== 'null' && typeof curToken !== 'undefined') {
      return true;
    }
    return false;
  }

  constructor(
    private util: UtilService
  ) { }
}
