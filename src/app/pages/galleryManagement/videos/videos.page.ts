import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';
import {VideoViewerPage} from '../video-viewer/video-viewer.page';



@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  userId: number;
  session: { auth: { FOLDER_ID: number, ACCESS: number } };
  item: any;
  list: Array<string>;

  constructor(
	public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
    public modalCtrl: ModalController,
    public groupService: GroupService,
    public _storage: StorageService,
    public cache: CacheService
  	) { }

  ngOnInit() {

  	let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    let selectedGroup = this._storage.getObject('selectedGroup');
    Promise.all([ userId, session, selectedGroup]).then(value => {
      
      this.userId = value[0];
      this.session = value[1];
      this.item = value[2];
      
      this.getGroupVideos();

    });
  }
 
  getGroupVideos(){
    this._utils.showLoading();
  	let params = {
      viewGroupId: this.item.group_id
    };

    let cacheKey = 'group_'+this.item.group_id+'_videos';
    let req = this.groupService.getGroupVideos(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        let list = response.data.DATA;
        this.list = list;
      },(error)=>{
        console.log("error in Videos", error);
    });
  }

  openVideo(event) {
    console.log('Video Event:', event);
    this.modalCtrl.create({
      component: VideoViewerPage,
      componentProps: {
        selectedVideo: event.item
      }
    }).then((modal)=>{
      modal.present();
    },(error)=>{

    });
  }


}
