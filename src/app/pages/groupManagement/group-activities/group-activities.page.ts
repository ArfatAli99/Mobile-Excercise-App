import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';



@Component({
  selector: 'app-group-activities',
  templateUrl: './group-activities.page.html',
  styleUrls: ['./group-activities.page.scss'],
})
export class GroupActivitiesPage implements OnInit {
list: any[];
  displayFeedCnt: number = 0;
  startGetData: number = 1;
  ActivityDate_Start: any;
  userId: number;
  group_id: string;
  group_name: any;
  session: { auth: { ACCESS: number, TIMEZONE: string } } = { auth: { ACCESS: 0, TIMEZONE: "US/Central" } };
  data: any[];
  constructor(
  	public router: Router,
    public activatedRoute: ActivatedRoute,
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public _storage: StorageService,
    public cache: CacheService
  	) { 

      console.log("ActivatedGroup:", this.activatedRoute.snapshot.paramMap.get('groupId'));
      this.group_id = this.activatedRoute.snapshot.paramMap.get('groupId');
  }

  ngOnInit() {
    let userId = this._storage.getObject("userId");
    let session = this._storage.getObject("session");
    Promise.all([userId, session]).then(value => {
      
      this.userId = value[0];
      this.session = value[1];
      this.getGroupActivities();
      
    });
  }

  getGroupActivities(){
    this._utils.showLoading();
  	this.startGetData = 0;
  	let params = {
      displayFeedCount: this.displayFeedCnt,
      viewGroup: this.group_id,
      userId: this.userId,
      authAccess: this.session.auth.ACCESS,
      timeZone: this.session.auth.TIMEZONE,
      forWorkGroup: 1,
      activityDateStart: this.ActivityDate_Start
    };

    let cacheKey = 'group_'+this.group_id+'_activities';
    let req = this.groupService.getGroupActivities(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        console.log('getGroupActivities Resp:', response);
        let data = response.data.DATA;
        if (this.list == undefined) {
          this.list = data;
        } else {
          this.list = this.list.concat(data);
        }
        this.ActivityDate_Start = response.data.DATA2;
        this.displayFeedCnt++;
        this.startGetData = 1;
        
      },(error) => {
        console.log('getGroupActivities Error:', error);
    });
  }


  //  doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {

  //     if (this.startGetData) {
  //       this.getActivityData();
  //     } else {
  //       console.log("skipped");
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //     infiniteScroll.enable(true);
  //   }, 500);
  // }

}
