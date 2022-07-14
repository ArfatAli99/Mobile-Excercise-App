import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { NewsViewerPage } from '../news-viewer/news-viewer.page';
import { CreateNewsPage } from '../create-news/create-news.page';
import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.page.html',
  styleUrls: ['./all-news.page.scss'],
})
export class AllNewsPage implements OnInit {

  group: any;
  list: Array<string> =[];
  userId:any;
  isDisabled = true;
  url_test = 'assets/img/speakers/eagle.jpg';

  constructor(
	public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public _storage: StorageService,
    public modalCtrl: ModalController,
    public cache: CacheService
  	) { 

      }

  ngOnInit() {

    let selectedGroup = this._storage.getObject('selectedGroup');
    let userId = this._storage.getObject('userId');
    Promise.all([ userId,selectedGroup]).then(value => {
 
      this.userId = value[0];
      this.group = value[1];
      console.log('SelectedGroup:', this.group);
      
      this.getGroupUpdates();

    });

  }

  getGroupUpdates(){
    this._utils.showLoading();
    let cacheKey = 'group_'+this.group.group_id+'_news';
    let req = this.groupService.getGroupUpdates(this.group.group_id);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        console.log('Updates Response:', response);
        // If the API returned a successful response, mark the user as logged in
        if (response.success == 'true' || response.success ==true) {
          let list = response.data.DATA;
          this.list = list;
        }
      },(error)=>{
        console.log('Updates Error:', error);
    });
  }

   CreateNews() {

    // this.router.navigate(['/create-news/'+this.item.group_id]);

    // Open modal here
    this.modalCtrl.create({
      component: CreateNewsPage,
      componentProps: {
        groupId: this.group.group_id
      }
    }).then((modal)=>{
      modal.present();
    },(error)=>{

    });
  }

  SendAlert() {
    // this.router.navigate(['/'])
  }

  openNews(event) {
    
    console.log('Selected News Event:', event);

    // Open modal here
    this.modalCtrl.create({
      component: NewsViewerPage,
      componentProps: {
        newsData: event.item
      }
    }).then((modal)=>{
      modal.present();
    },(error)=>{

    });

  }

}
