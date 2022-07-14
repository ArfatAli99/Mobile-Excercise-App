import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

import {PhotoViewerPage} from '../photo-viewer/photo-viewer.page';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  
  // item: any;
  photoUUID:any;
  userId: number;
  list: Array<string>;
  session: { auth: { FOLDER_ID: number, ACCESS: number } };
  isDisabled = true;
  url_test = 'assets/img/speakers/eagle.jpg';
  constructor(
  	public router: Router,
    public activeRoute: ActivatedRoute,
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public modalCtrl: ModalController,
    public _storage: StorageService,
    public cache: CacheService
    ) { }

  ngOnInit() {
    this.getItemId();
  	// this.item =  this.groupService.selectedPicturesAlbum;

    let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');

    Promise.all([userId, session]).then(value => {
      console.log("value1", value);
      this.userId = value[0];
      this.session = value[1];
      this.getData();
    });
  }

  getItemId(){
    console.log(this.activeRoute.snapshot.paramMap.get('photoUUID')); 
    this.photoUUID = this.activeRoute.snapshot.paramMap.get('photoUUID');
  }

  getData() {
    this._utils.showLoading();
    let params= {
      photoUUID: this.photoUUID
    };

    let cacheKey = 'album_'+this.photoUUID;
    let req = this.groupService.getPhotosList(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
          let list = response.data.DATA;
          this.list = list;
      },(error)=>{
        console.log('getGroupPhotos Error:', error);
    });
  }

  openPhotoViewer(item){
    this.modalCtrl.create({
      component: PhotoViewerPage,
      componentProps: {
        selectedPicturesAlbum: item
      }
    }).then((modal)=>{
      modal.present();
    },(error)=>{

    });
  }
 
}
