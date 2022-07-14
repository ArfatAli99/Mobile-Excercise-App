import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.page.html',
  styleUrls: ['./video-viewer.page.scss'],
})
export class VideoViewerPage implements OnInit {
  item:any;
  videoUrl: any;
  constructor(
  	public navParams: NavParams,
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer
    ) { 
  	this.item =  this.navParams.data.selectedVideo;
  	this.videoUrl =  this.sanitizer.bypassSecurityTrustHtml(this.item.VID_VIDEOFILE);
  	console.log("Item:", this.item);
  }

  ngOnInit() {

  }

  dismiss(){
  	this.modalCtrl.dismiss();
  }

}
