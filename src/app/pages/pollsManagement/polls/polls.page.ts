import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';


import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

import {PollViewerPage} from '../poll-viewer/poll-viewer.page';


@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage implements OnInit {

  userId: number;
  item: any;
  list: any[];
  list1: any[];
  constructor(
  	public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public modalCtrl: ModalController,
    public _storage: StorageService,
    public cache: CacheService

    ) {

    }

  ngOnInit() {

    let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    let selectedGroup = this._storage.getObject('selectedGroup');
    Promise.all([ userId, session, selectedGroup]).then(value => {
      
      this.userId = value[0];
      this.item = value[2];
      
      this.getGroupPolls();

    });
   }

   getGroupPolls(){
   	this._utils.showLoading();
    let params = {
      groupId: this.item.group_id
    };

    let cacheKey = 'group_'+this.item.group_id+'_polls';
    let req = this.groupService.getGroupPolls(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{

        console.log('getGroupPolls Resp:', response);
        let list = response.data;
        this.list = list;

      },(error)=>{
        console.log('GroupPolls Error:', error);
    });

   }

   openPoll(event){
      console.log('Event:', event);
      this.modalCtrl.create({
        component: PollViewerPage,
        componentProps: {
          selectedPoll: event.item
        }
      }).then((modal)=>{
        modal.present();
      },(error)=>{

      });
   }
  

}
