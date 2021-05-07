import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {

  }

  debug(data) {
    if(!environment.production) {
      console.log(data);
    }
  }

  warn(data) {
    if(!environment.production) {
      console.warn(data);
    }
  }

  error(data) {
    if(!environment.production) {
      console.error(data);
    }
  }
}
