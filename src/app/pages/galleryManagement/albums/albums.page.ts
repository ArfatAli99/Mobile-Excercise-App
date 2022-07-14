import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';


import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
userId: number;
  session: { auth: { FOLDER_ID: number, ACCESS: number } };
  item: any;
  list: Array<string>;
  isDisabled = true;
  url_test = 'assets/imgs/speakers/eagle.jpg';

  constructor(
  	public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
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
      
      this.getGroupAlbums();

    });
   }

   getGroupAlbums(){
    this._utils.showLoading();
   	let params= {
      viewGroupId: this.item.group_id,
      userId: this.userId,
      photoType: "Workgroup"
    };

    let cacheKey = 'group_'+this.item.group_id+'_albums';
    let req = this.groupService.getGroupAlbums(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
          let list = response.data.DATA;
          this.list = list;
      },(error)=>{
        console.log('getGroupAlbums Error:', error);
    });
    
   }

   openPictureView(item){
    
    console.log('Item:', item);
   	this.router.navigate(['/photos',{photoUUID:item.UUID}]);
   }


}
