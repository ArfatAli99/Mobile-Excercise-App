import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

@Component({
  selector: 'app-comments-viewer',
  templateUrl: './comments-viewer.page.html',
  styleUrls: ['./comments-viewer.page.scss'],
})
export class CommentsViewerPage implements OnInit {
  userId: number;
  session: { auth: { FOLDER_ID: number, ACCESS: number, UID: string, } };
  messageId: any;
  list: Array<string> = [];
  temp_list: Array<string> = [];
  likes: number;
  comment: string;
  group_id: any;
  userImg = 'assets/imgs/icons/user.jpg';

  constructor( 
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public _storage: StorageService,
      public activatedRoute: ActivatedRoute,
      public cache: CacheService) { 

       console.log("ActivatedGroup:", this.activatedRoute.snapshot.paramMap.get('groupId'));
       this.group_id = this.activatedRoute.snapshot.paramMap.get('groupId');
       this.messageId = this.activatedRoute.snapshot.paramMap.get('messageId');
    }

  ngOnInit() {
    this.list = [];
  	let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    Promise.all([userId, session]).then(value => {
      
      this.userId = value[0];
      this.session = value[1];
      this.getReplies(this.messageId);
    });
  }

  fromNow(date) {
    if (date !== '' || date.length) {
      return moment(date,'MMMM Do YYYY, h:mm:ss').fromNow();
    } else {
      return 'never';
    }
  }

  getReplies(id) {
    this._utils.showLoading();
    let params = {
      messageId: id
    };

    let cacheKey = 'post_'+id;
    let req = this.groupService.getCommentsByDiscussion(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        let list = response.data.DATA;
        this.list = list;
        console.log("getReplies", id, list);
        return list;
        
      },(error) => {
        console.log('Post Replies Error:', error);
    });

  }

  getUserLikeList(id) {

    let params = {
      messageId: id
    };

    this.groupService.getUserLikes(params).subscribe((resp: any) => {
      let list = resp.data.DATA;
      this.temp_list = list;
      console.log("user likes", id, this.temp_list);
      return list;
    },(error) => {

    });
  }

  addComment(comment) {

    if(comment=='' || comment==null){
      return;
    }
    let params= {
      commentId: this.messageId,
      authUID: this.session.auth.UID,
      viewGroupId: this.group_id,
      comment: comment
    };

    this.groupService.postCommentByDiscussion(params).subscribe((resp: any) => {
      console.log("Reply Added!", resp);
      this.comment = "";
      this.getReplies(this.messageId);
    },error => {
        console.log("error", error);
    });

  }

}
