import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";

import { ApiService } from '../api/api.service';
import { API_URL, END_POINT } from '../../config/config.module';



@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(public api: ApiService) { }
 
  public getUserMeetings(params){
    let reqUrl = API_URL + END_POINT.USER_MEETINGS;
  	let body = new URLSearchParams();
    body.append('max', params.max);
    body.append('coreUserID', params.coreUserID);
   
    return this.api.postRequest(reqUrl, body);
  }


}
