import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';


@Component({
  selector: 'app-poll-viewer',
  templateUrl: './poll-viewer.page.html',
  styleUrls: ['./poll-viewer.page.scss'],
})
export class PollViewerPage implements OnInit {
  userId: number;
  ansId: number;
  item: any;
  list: any[];
  poll: any;
  question: any[];
  answers: any[];
  data: any;
  constructor(
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public _storage: StorageService,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cache: CacheService
    ) { }

   ngOnInit() {
  	this.poll =  this.navParams.data.selectedPoll;
    console.log('NavParms:', this.navParams);
  }

  ionViewWillEnter() {
    let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    Promise.all([ userId, session]).then(value => {
      
      this.userId = value[0];

      this.getGroupPolls();

    });
  }

  getGroupPolls() {
    this._utils.showLoading();
    let params= {
      pollId: this.poll.id
    };

    let cacheKey = 'poll_'+this.poll.id;
    let req = this.groupService.getPollData(params);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe(
      (response)=>{
         this.list = response.data;
      },(error)=>{
        console.log('Poll Data Error:', error);
    });

  }

  
  submitPoll() {

    // console.log('List:', this.list);
    let params = {
      pollId: this.poll.id,
      userId: this.userId,
      item: JSON.stringify(this.list)
    };
    this._utils.showLoading();
    this.groupService.insertPollResults(params).subscribe((resp: any) => {
      console.log('Success:', resp);
      this.modalCtrl.dismiss();
    },error => {
        console.log("error", error);
    });

  }

  submit() {
    let nonSelectedList = this.list.filter(item=>item.ANSWERID==0 || item.ANSWERID=='0');
    if(nonSelectedList.length>0){
      console.log('Not Selected all answers..');
      this._utils.showAlert('Alert!','Answer all questions, before to submit results.');
      return;
    }
    this.submitPoll();
  }


  dismiss(){
    this.modalCtrl.dismiss();
  }



 

}
