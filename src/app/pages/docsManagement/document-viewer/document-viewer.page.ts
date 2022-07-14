import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.page.html',
  styleUrls: ['./document-viewer.page.scss'],
})
export class DocumentViewerPage implements OnInit {
  
  displayData: any = {};
  pdfSource: any;
  data: any;
  constructor( 
  	public modalCtrl: ModalController,
  	public domSanitizer: DomSanitizer, 
  	public navParams: NavParams) {

	console.log(this.navParams);
    this.displayData = this.navParams.data.displayData;
    console.log("this.displayData.pdfSource",this.displayData);
    this.data = 'https://docs.google.com/viewer?url=' + encodeURIComponent(this.displayData.pdfSource.url) + '&embedded=true';
    this.pdfSource = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data);
    console.log(this.pdfSource);

  	}

  ngOnInit() {

  }

  dismiss(){
  	this.modalCtrl.dismiss();
  }
}
