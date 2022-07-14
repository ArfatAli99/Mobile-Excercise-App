import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';


@Component({
  selector: 'app-group-meetings',
  templateUrl: './group-meetings.page.html',
  styleUrls: ['./group-meetings.page.scss'],
})
export class GroupMeetingsPage implements OnInit {

  group_id:any;
  userId: any;
  list: any[];
  isDisabled = true;
  url_test = 'assets/img/speakers/eagle.jpg';

  constructor(
  	  public router: Router,
      public activatedRoute: ActivatedRoute,
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public _storage: StorageService,
      public cache: CacheService) { 

        console.log("ActivatedGroup:", this.activatedRoute.snapshot.paramMap.get('groupId'));
        this.group_id = this.activatedRoute.snapshot.paramMap.get('groupId');

       }

  ngOnInit() {

    this._storage.getObject('userId').then((userId)=>{
      this.userId = userId;
      this.getGroupMeetings();
    },(error)=>{
      console.log('Group Meetings: Error in getting UserId from Storage.', error);
    });

  }

  getGroupMeetings(){
    this._utils.showLoading();
    let params = {
      groupId: this.group_id
    };
    let cacheKey = 'group_'+this.group_id+'_meetings';
    let req = this.groupService.getGroupMeetings(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        console.log('Group Meetings:', response);
        let list = response.data.DATA;
        this.list = list;
        // console.log("test", this.list);
        // If the API returned a successful response, mark the user as logged in
        if (response.status == 'success') {
          let list = response.data.DATA;
          this.list = list;
        }

      },(error) => {
        console.log('Group Meetings:', error);
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
