import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';
import { DATA } from './group.data';


@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.page.html',
  styleUrls: ['./group-home.page.scss'],
})
export class GroupHomePage implements OnInit {

 list: any[];
  default: number = 0;
  userId: number;
  group_id: string;
  group_name: any;
  group_desc:any;
  session: { auth: { ACCESS: number, TIMEZONE: string } } = { auth: { ACCESS: 0, TIMEZONE: "US/Central" } };
  appList: any[];
  app: any[];
  data: any[];
  girdMenus=[]

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
    this.girdMenus = DATA.moduleList;
    
  	let defaultGroup = this._storage.getObject("defaultGroupId");
    let userId = this._storage.getObject('userId');
   
    Promise.all([defaultGroup, userId]).then(value => {
      if (this.group_id == value[0]) {
        this.default = 1;
      }
      this.userId = value[1];
      
      this.getGroupDetails();
      

    });
  }

  getGroupDetails(){
    this._utils.showLoading();
    let cacheKey = 'group_'+this.group_id;
    let req = this.groupService.getGroupDetails(this.group_id);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        console.log('ArrarResponse:', response);
        // Need to Re-factor this , because we are using this Dynamic Later.

        // this.data = response[0].data.DATA;
        // this.appList = [];

        // this.data.forEach(value => {
        //   let temp = this.app.find(x => x.id === value);
        //   this.appList.push(temp);
        // });
        // console.log("this.content", this.content);
        // this.content.resize();

         // Get WorkGroup Data Implementation
        let list = response[1].data.DATA;
        this.group_name = list[0].group_name;
        // this.group_desc = list[0].group_desc;

      },(error) => {
        console.log('Error Initial Calls:', error);
    });

  }
  
  openPage(pageName) {
    this.router.navigate(['/'+pageName+'/'+this.group_id]);
  }
  openMenu(event) {
    // console.log('Event:', event);
    let pageName = event.module.route;
    this.router.navigate(['/'+pageName+'/'+this.group_id]);
  }

  setDefaultGroup(groupId) {
   
    let params= {
      groupId: groupId,
      userId: this.userId,
      defaultFlag: this.default
    };

    this.groupService.setDefaultGroupId(params).subscribe((resp: any) => {
      console.log("res", resp);
      if (resp.success && this.default) {
        console.log('Defaults True..');
        this._storage.setObject("defaultGroupId", groupId);
      } else {
        this._storage.setObject("defaultGroupId", 0);
        console.log('Defaults False..');
      }
    }, error => {
        console.log("error", error);
    });

  }

}
