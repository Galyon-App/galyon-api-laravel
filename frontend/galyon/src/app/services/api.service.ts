
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { LogService } from 'src/app/services/log.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: any = '';
  constructor(
    private http: HttpClient,
    private log: LogService
  ) {
    this.baseUrl = environment.baseURL;
  }

  /**
   * Convert JSON to url encoded text.
   * @param element
   * @param key
   * @param list
   * @returns
   */
  toUrlEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.toUrlEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }

  post(path, body, is_url_encode=false) {

    let token = localStorage.getItem('user-token');
    const options = { headers: new HttpHeaders() }
      let contentType = is_url_encode ? 'x-www-form-urlencoded' : 'application/json';
      options.headers.append('Content-Type', 'application/'+contentType);

    if(token) {
      //options.headers.append('Authorization', `Bearer ${token}`);
      body.token = token;

      // const helper = new JwtHelperService();
      // const decodedToken = helper.decodeToken(token);
      // const expirationDate = helper.getTokenExpirationDate(token);
      // const isExpired = helper.isTokenExpired(token);
    }

    const param = is_url_encode ? this.toUrlEncoded(body) : body;
    return this.http.post(this.baseUrl +'/'+ path, param, options);
  }
}
