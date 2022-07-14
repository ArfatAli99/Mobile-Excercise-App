import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { GET_OPTIONS, POST_OPTIONS } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: Http) {
  }

  /**
  * Post API Request
  */
  public postRequest(url: string, body: any) {
    return this.http.post(url, body, POST_OPTIONS)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
  * Get API Request
  */
  public getRequest(url: string, params?: any) {

    return this.http.get(url, GET_OPTIONS)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
  * Error Handler for API Request 
  */
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
