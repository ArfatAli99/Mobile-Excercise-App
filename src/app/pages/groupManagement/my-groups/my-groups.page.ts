import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';


@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.page.html',
  styleUrls: ['./my-groups.page.scss'],
})
export class MyGroupsPage implements OnInit {

  list = [];
  userId: number;
  isTab: number;

  constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public _storage: StorageService,
      public cache: CacheService) { 

  }

  ngOnInit() {
  	this._storage.getObject('userId').then((userId)=>{
      this.userId = userId;
      this.getMyGroups();
    },(error)=>{
      console.log('My Groups: Error in getting UserId from Storage.', error);
    });
  }

  getMyGroups(){
    this._utils.showLoading();
  	 let params = {
      userId: this.userId
    };

    let cacheKey = 'mygroups';
    let req = this.groupService.getMyGroups(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
          let data = response;
          // this.list = list;
          console.log("MyGroups Data", data);
          // If the API returned a successful response, mark the user as logged in
          if (response.success) {
            let list = response.data.DATA;
            this.list = list;
          }
      },(error)=>{
        console.log("error in Mails", error);
    });

  }

  openPIPage() {
    this.router.navigate(['/pending-groups']);
  }
  
  openGroupPage(event){
    // console.log('OpenGroup Event:', event);
    // console.log('SelectedGroup:', event.item);
    this.groupService.selectedGroup = event.item;
    this._storage.setObject('selectedGroup',event.item);
    this.router.navigate(['/group/'+event.item.group_id]);
  }

}
