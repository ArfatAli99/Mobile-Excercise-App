import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';



@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.page.html',
  styleUrls: ['./photo-viewer.page.scss'],
})
export class PhotoViewerPage implements OnInit {

  item: any;
  userId: number;
  list: Array<string>;
  session: { auth: { FOLDER_ID: number, ACCESS: number } };
  isDisabled = true;
  url_test = 'assets/img/speakers/eagle.jpg';
  slideOpts = {
    effect: 'flip'
  };
  constructor(
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public _storage: StorageService,
    public navParams: NavParams,
    public modalCtrl: ModalController
    ) { 

  		this.item =  this.navParams.data.selectedPicturesAlbum;
 	 }

  ngOnInit() {
   
  }

  dismiss(){
  	this.modalCtrl.dismiss();
  }

}
