import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {PopoverController, ModalController} from '@ionic/angular';

import { UtilsService,
         UserService,
         MailService,
         StorageService } from '../../../services/services.module';


import { MailPopoverPage} from '../mail-popover/mail-popover.page';


@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.page.html',
  styleUrls: ['./mail-content.page.scss'],
})
export class MailContentPage implements OnInit {
  
  userId: number;
  item: any={
  	firstname:'',
  	lastname: '',
  	usermails: '',
  	email_date:''

  };
  list: any[];
  list1: any[];

  constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public mailService: MailService,
      public _storage: StorageService,
      public popoverCtrl: PopoverController,
      public modalCtrl: ModalController
      ) {
       }

  ngOnInit() {
  	let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    let selectedMail = this._storage.getObject('selectedMail');
    Promise.all([userId, session, selectedMail]).then(value => {
      console.log("value1", value);
      this.userId = value[0];
      // this.session = value[1];
      this.item = value[2];
      this.updateMailStatus();
    });
  	
  }

  updateMailStatus(){
  	let params: { userId: number, mailId: number } = {
      userId: this.userId,
      mailId: this.item.secure_mail_id
    };

    this.mailService.updateMailStatus(params).subscribe((resp: any) => {
      let list = resp.data.DATA;
      this.list = list;
    },(error) => {
        console.log("error", error);
    });
  }

  openMailPopover(ev){
    console.log('openMailPopover Event:', ev);
    this.popoverCtrl.create({
      component: MailPopoverPage,
      event: ev
    }).then((popover)=>{
      popover.present();
      popover.onDidDismiss().then((response)=>{
        console.log('Response:', response);
        if(response.role!=undefined && response.role=='success'){
          console.log('Type:', response.data.type);
          this.openReplyModal(response.data.type);
        }else{
          console.log('Backdrop:called...');
        }
      })
    },(error)=>{
      console.log('openMailPopover Error:', error);
    });
  
  }

  openReplyModal(_type){

    this.router.navigate(['/mail-content/'+_type]);
    // this.modalCtrl.create({
    //   component: MailReplyPage,
    //   componentProps: {type:_type, item: this.item}
    // }).then((modal)=>{
    //   modal.present();
    // },(error)=>{

    // });
  }

}
