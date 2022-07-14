import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.page.html',
  styleUrls: ['./create-news.page.scss'],
})
export class CreateNewsPage implements OnInit {

  item: any;
  userId: number;
  session: { auth: { FOLDER_ID: number, ACCESS: number, UID: string, } };
  news:FormGroup;
  isDisabled = true;
  group_id:any;
  url_test = 'assets/img/speakers/eagle.jpg';
  constructor(
  	  public router: Router,
      public activatedRoute: ActivatedRoute,
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public formBuilder: FormBuilder,
      public _storage: StorageService,
      public navParams: NavParams,
      public modalCtrl: ModalController) {
       console.log("ActivatedGroup:", this.activatedRoute.snapshot.paramMap.get('id'));
        this.group_id = this.activatedRoute.snapshot.paramMap.get('id'); }

  ngOnInit() {
    this.initializeForm();
  	let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    Promise.all([userId, session]).then(value => {
      
      this.userId = value[0];
      this.session = value[1];
    });
  }
  initializeForm(){
    this.news = this.formBuilder.group({
       headline: ['', Validators.compose([Validators.required])],
       newsbody: ['', Validators.compose([Validators.required])]
    });
  }

   createNews(news) {
    console.log('News:', news);
    let params = {
      userId: this.userId,
      headline: news.headline,
      newsBody: news.newsbody,
      viewGroupId: this.group_id
    };

    this.groupService.createGroupNews(params).subscribe((resp: any) => {
     console.log('Success Creating News:', resp);
     // this.router.navigate(['/updates/'+this.group_id]);
     this.dismiss();
    },error => {
      console.log('Error in Creating News:', error);
    });
  }

  dismiss(){
      this.modalCtrl.dismiss();
  }

}
