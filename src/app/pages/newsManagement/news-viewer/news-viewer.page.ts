import { Component } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-news-viewer',
  templateUrl: './news-viewer.page.html',
  styleUrls: ['./news-viewer.page.scss'],
})
export class NewsViewerPage {
	item: any;
  	constructor(
  		public navParams: NavParams,
      public modalCtrl: ModalController) {

  		this.item =  this.navParams.data.newsData;
  		console.log('News Data:', this.item);

    }

  dismiss(){
	  	this.modalCtrl.dismiss();
	}

}
