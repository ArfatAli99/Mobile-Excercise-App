import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

import { CommentsViewerPage } from '../comments-viewer/comments-viewer.page';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.page.html',
  styleUrls: ['./group-posts.page.scss'],
})
export class GroupPostsPage implements OnInit {

  userId: number;
  session: { auth: { FOLDER_ID: number, ACCESS: number, UID: string } };
  item: any;
  list: Array<string> = [];
  temp_list: Array<string> = [];
  likesList: Array<string> = [];
  newUpdate: string;
  group_id: string;
  constructor(
  	  public router: Router,
      public activatedRoute: ActivatedRoute,
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public _storage: StorageService,
      public modalCtrl: ModalController,
      public cache: CacheService
      ) {
        console.log("ActivatedGroup:", this.activatedRoute.snapshot.paramMap.get('groupId'));
        this.group_id = this.activatedRoute.snapshot.paramMap.get('groupId');
       }

  ngOnInit() {
    let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    let selectedGroup = this._storage.getObject('selectedGroup');
    Promise.all([userId, session, selectedGroup]).then(value => {

      this.userId = value[0];
      this.session = value[1];
      this.item = value[2];
      this.getGroupPosts();

    });
  }

  openModal(messageId, likes) {

    console.log('Comments Clicked! need to improve code and logic here after understanding');

    this.router.navigate(['group-posts/'+this.group_id+'/'+messageId]);

  	// // Open modal here
   //  this.modalCtrl.create({
   //    component: CommentsViewerPage,
   //    componentProps: {
   //      groupData: {
   //        group_id: this.group_id,
   //        messageId: messageId,
   //        likes: likes
   //      }
   //    }
   //  }).then((modal)=>{
   //    modal.present();
   //  },(error)=>{

   //  });

  }

  fromNow(date) {
    if (date !== '' || date.length) {
      return moment(date,'MMMM Do YYYY, h:mm:ss').fromNow();
    } else {
      return 'never';
    }
  }


  getGroupPosts(){
    this._utils.showLoading();
  	let params= {
      viewGroupId: this.item.group_id,
      userId: this.userId
    };
    let cacheKey = 'group_'+this.group_id+'_posts';
    let req = this.groupService.getGroupPosts(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        console.log('Response:', response);
        let list = response.data.DATA;
        let likesList = response.data.USERLIKELIST;
        this.temp_list = list;
        this.list = list;
        this.likesList = likesList;
        
      },(error) => {
        console.log('Group Posts:', error);
    });
  }

 

  updatePost(message) {
    console.log("mess", message);

    let params= {
      viewGroupId: this.item.group_id,
      authUID: this.session.auth.UID,
      postText: message
    };

    this.groupService.addPost(params).subscribe((resp) => {
      this.newUpdate = "";
      console.log('Add Discussion:', resp);
      this.getGroupPosts();
    },(error) => {
        console.log("AD error", error);
    });

  }


   LikeComment(messageId) {
    console.log("Like: Calling Wrong API Call");
    console.log("mess", messageId);

    let params= {
      messageId: messageId,
      userUID: this.session.auth.UID
    };

    this.groupService.doLikeComment(params).subscribe((resp) => {
      console.log("Like res:", resp);
      this.getGroupPosts();

    },(error) => {
        console.log("Like error:", error);
    });

  }

}
