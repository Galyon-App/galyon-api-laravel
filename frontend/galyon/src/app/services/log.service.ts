import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {}

  /**
   * Show debug message on console with optional title.
   * @param data
   * @param title
   */
  debug(data, title='') {
    if(!environment.production) {
      console.log({ title: title, data:data });
    }
  }

  /**
   * Show warning message on console with optional title.
   * @param data
   * @param title
   */
  warn(data, title='') {
    if(!environment.production) {
      console.warn({ title: title, data:data });
    }
  }

  /**
   * Show error message on console with optional title.
   * @param data
   * @param title
   */
  error(data, title='') {
    if(!environment.production) {
      console.error({ title: title, data:data });
    }
  }
}
