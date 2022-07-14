import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";

import { ApiService } from '../api/api.service';
import { API_URL, END_POINT } from '../../config/config.module';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  _loggedUser= null;
  _deviceToken:any;

  constructor(public api: ApiService) { }

  get loggedUser(){
  	return this._loggedUser;
  }
  set loggedUser(user){
  	this._loggedUser =user;
  }

  get deviceToken(){
    return this._deviceToken;
  }
  set deviceToken(token){
    this._deviceToken =token;
  }

  login(user){
    let reqUrl = API_URL + END_POINT.AUTH_LOGIN;
  	let body = new URLSearchParams();
    body.append('login', user.username);
    body.append('password', user.password);
    return this.api.postRequest(reqUrl, body);
  }


  authenticateUserAccess(params){

    let reqUrl = API_URL + END_POINT.USER_AUTH;
    let userAuthbody = new URLSearchParams();
    userAuthbody.append('userID', params.userId);

    return this.api.postRequest(reqUrl, userAuthbody); 
  }

  getActivatedModules(){
    let reqUrl = '';
    let body = new URLSearchParams();
    body.append('appName', 'core');
    return this.api.postRequest(reqUrl, body); 
  }

  /**
  * Function to save Device Token for Push Notifications.
  */
  saveDeviceToken(params){
    let reqUrl = API_URL +END_POINT.SAVE_DEVICE_TOKEN;
    
    let body = new URLSearchParams();
    body.append('token', params.deviceToken); // Production
    // body.append('token', 'fs-test-token-12312312');  // Test on web
    body.append('userId', params.userID);
    body.append('device_type', params.deviceType);
    return this.api.postRequest(reqUrl, body); 
  }
  
}
