import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from 'src/app/services/util.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private util: UtilService
  ) { }

  get uuid(): string {
    return this.util.localGet('uuid');
  }

  set uuid(value: string) {
    this.util.localSet('uuid', value);
  }

  get token(): string {
    return this.util.localGet('token');
  }

  set token(value: string) {
    this.util.localSet('token', value);
  }

  get isLoggedIn(): boolean {
    if (this.util.localHas('uuid') && this.util.localHas('token')) {
      return true;
    }
    return false;
  }
}
