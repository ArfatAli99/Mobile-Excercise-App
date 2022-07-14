import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ApiService } from '../api/api.service';
import { forkJoin } from "rxjs/observable/forkJoin";


import { API_URL, END_POINT  } from '../../config/config.module';



@Injectable({
  providedIn: 'root'
})
export class ActivityService {

 constructor(public api: ApiService) { }

  public getAllActivities(params){
    let reqUrl = API_URL+END_POINT.USER_ACTIVITIES;
 
  	let body = new URLSearchParams(); 
    body.append('DisplayFeedCnt', params.displayFeedCount);
    body.append('userid', params.userId);
    body.append('authAccess', params.authAccess);
    body.append('timezone', params.timeZone);
    body.append('viewgroup', '0');
    body.append('ActivityDate_Start', params.activityDateStart);

    return this. api.postRequest(reqUrl, body);
  }  
}

