import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {

  }

  debug(data, title='') {
    if(!environment.production) {
      console.log({ title: title, data:data });
    }
  }

  warn(data, title='') {
    if(!environment.production) {
      console.warn({ title: title, data:data });
    }
  }

  error(data, title='') {
    if(!environment.production) {
      console.error({ title: title, data:data });
    }
  }
}
