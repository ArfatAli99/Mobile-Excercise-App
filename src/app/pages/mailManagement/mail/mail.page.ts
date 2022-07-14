import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         MailService,
         StorageService } from '../../../services/services.module';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {

  userId: number;
  item: any;
  list: any[];
  list1: any[];
  constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public mailService: MailService,
      public _storage: StorageService,
      public cache: CacheService
    ) { 
  		
  	}

  ngOnInit() {
    let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    Promise.all([userId, session]).then(value => {
      console.log("value1", value);
      this.userId = value[0];
      this.getMails();
      this.getUnreadMails();
    });
  }

  getMails(){
    this._utils.showLoading();
    let params= {
      userId: this.userId
    };

    let cacheKey= 'mails';
    let req = this.mailService.getUserMails(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
        console.log('GetUserMail:', response);
        this.list = response.data.DATA;
      },(error)=>{
        console.log("error in Mails", error);
    });
  }

  getUnreadMails(){
    let params= {
      userId: this.userId
    };
    let req = this.mailService.getUnreadEmails(params);
    this.cache.loadFromDelayedObservable('unreadmails', req, null, null, 'all').subscribe(
      (response)=>{
        console.log('GetUserMail:', response);
          this.list1 = response.data.DATA;
      },(error)=>{
        console.log("error in Mails", error);
    });
  }

  openMail(event) {
    console.log("openMail Event:", event);
    this._storage.setObject('selectedMail', event.item);
    this.router.navigate(['/mail-content']);
  }

}
