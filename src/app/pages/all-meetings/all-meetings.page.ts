import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         MeetingsService,
         StorageService } from '../../services/services.module';



@Component({
  selector: 'app-all-meetings',
  templateUrl: './all-meetings.page.html',
  styleUrls: ['./all-meetings.page.scss'],
})
export class AllMeetingsPage implements OnInit {
  	max: any;
  	list = [];
  	userId: number;
  	session: { auth: { COREUSERID: string } } = { auth: { COREUSERID: "" } };
  	isDisabled = true;
    url_test = 'assets/imgs/speakers/eagle.jpg';

  	constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public meetingsService: MeetingsService,
      public _storage: StorageService,
      public cache: CacheService
    ) { 
  		this.max = 5;
  	}

  	ngOnInit() {
  		let userId = this._storage.getObject('userId');
    	let session = this._storage.getObject('session');
    	Promise.all([userId, session]).then((values)=>{
    		this.userId = values[0];
      		this.session = values[1];
      		this.getAllUserMeetings();
    	}, error=>{
    		console.log('Meetings Values Error')
    	});
  	}

  	getAllUserMeetings(){
      this._utils.showLoading();
  		let params: { max: number, coreUserID: string} = {
      		max: this.max,
      		coreUserID: this.session.auth.COREUSERID
    	};

      let cacheKey = 'meetings';
      let req = this.meetingsService.getUserMeetings(params);
      this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe((response)=>{
          console.log('All Meetings Response:', response);
          if(response.success){
              this.list = response.data.DATA;
          }
      },(error)=>{
            console.log('All Meetings Error:', error);
      });
  	}

    openLink(event){
      console.log('MeetingPage Event:', event);
      let link = "https://foodshield.connectsolutions.com";
      if("shortlink" in event.item &&  event.item.shortlink.length){
        link =  event.item.shortlink;
      }else{
        link = link +  event.item.smeetingurl; 
      }
      
      console.log("link",link);
      window.open(link,'_system', 'location=yes');
    }


}
