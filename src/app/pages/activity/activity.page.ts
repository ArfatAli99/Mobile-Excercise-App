import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         ActivityService,
         StorageService } from '../../services/services.module';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

    item: any;
    list: any[];
    displayFeedCnt: number = 0;
    startGetData: number = 1;
    userId: number;
    ActivityDate_Start: any;
    session: { auth: { ACCESS: number, TIMEZONE: string } } = { auth: { ACCESS: 0, TIMEZONE: "US/Central" } };

  	constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public activityService: ActivityService,
      public _storage: StorageService,
      public cache: CacheService
    ) { 
  		this.displayFeedCnt = 0;
  	}


  ngOnInit() {
      let userId = this._storage.getObject('userId');
      let session = this._storage.getObject('session');
      Promise.all([userId, session]).then((values)=>{
        this.userId = values[0];
          this.session = values[1];
          this.displayFeedCnt = 0;
          this.list = [];
          this.ActivityDate_Start = "";
          this.getAllUserActivities();
      }, error=>{
        console.log('Meetings Values Error')
      });
    }


  getAllUserActivities(){
    this._utils.showLoading();
    this.startGetData = 0;
    let params = {
      displayFeedCount: this.displayFeedCnt,
      userId: this.userId,
      authAccess: this.session.auth.ACCESS,
      timeZone: this.session.auth.TIMEZONE,
      activityDateStart: this.ActivityDate_Start
    };
    
    let cacheKey = 'activites';
    let req = this.activityService.getAllActivities(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe((response)=>{
      console.log('Activities:', response);
      let data = response.data;
      this.list = data.DATA;
      this.ActivityDate_Start = data.DATA2;
      this.displayFeedCnt++;
      this.startGetData = 1;
      },(error)=>{
      console.log('Activities Error:', error);
    });
  }

   doInfinite(infiniteScroll) {
    setTimeout(() => {
      if (this.startGetData) {
        this.loadMoreActivities();
      }
      infiniteScroll.target.complete();

      
      /* To disable Infinite Scroll 
       * for more calls after a specific 
       * length of list 
      */

      // if (this.list.length == 1000) {
      //   infiniteScroll.target.disabled = true;
      // }
     
    }, 500);
  }

  loadMoreActivities(){
    let params = {
      displayFeedCount: this.displayFeedCnt,
      userId: this.userId,
      authAccess: this.session.auth.ACCESS,
      timeZone: this.session.auth.TIMEZONE,
      activityDateStart: this.ActivityDate_Start
    };

     this.activityService.getAllActivities(params).subscribe((response)=>{
      console.log('Activities:', response);
      let data = response.data;

      if (this.list == undefined) {
        this.list = data.DATA;
      } else {
        this.list = this.list.concat(data.DATA);
      }

      this.ActivityDate_Start = data.DATA2;
      this.displayFeedCnt++;
      this.startGetData = 1;
    },(error)=>{
      console.log('Activities Error:', error);
    });
  }

}
