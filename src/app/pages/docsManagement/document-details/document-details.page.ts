import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform,  } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import {File} from '@ionic-native/file/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';

import { UtilsService,
         UserService,
         DocumentsService,
         StorageService } from '../../../services/services.module';

import {DocumentViewerPage} from '../document-viewer/document-viewer.page';
import { FileOpener } from '@ionic-native/file-opener/ngx';
declare let window: any;


@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.page.html',
  styleUrls: ['./document-details.page.scss'],
})
export class DocumentDetailsPage implements OnInit {

  item: any={
  	firstname: '',
  	lastname: '',
  	foldername: '',
  	sname: '',
  	dtupdated: '',
  	irevision:'',
  	iminorrevision:'',
  	sdescription:''
  };
  list: string;
  file_url: string;
  userId:any;

  url_test = 'assets/img/speakers/eagle.jpg';
  constructor(
  	public router: Router,
    public _utils: UtilsService,
    public userService: UserService, 
    public docsService: DocumentsService,
    public _storage: StorageService,
    public modalCtrl: ModalController,
    public file: File, 
    public fileTransfer: FileTransfer,
    public cache: CacheService,
    public fileOpener: FileOpener,
    public platform: Platform
    ) { }

  ngOnInit() {
  	let userId = this._storage.getObject('userId');
  	let selectedDoc = this._storage.getObject('selectedDocs');
    let session = this._storage.getObject('session');
    Promise.all([userId, selectedDoc, session]).then((values)=>{
    		this.userId = values[0];
      	this.item = values[1];
      	this.getDocData();
    	}, error=>{
    		console.log('Documents Values Error')
    	});
  }

  fromNow(date) {
    // if (date !== '' || date.length) {
    //   return moment(date).fromNow();
    // } else {
    //   return 'never';
    // }
     return 'never';
  }

  getDocData(){
    console.log('Item:', this.item);
    let cacheKey = 'doc_'+this.item.id;
    let req = this.docsService.getDocDetails(this.item.id);
  	this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe((resp: any) => {
      console.log("res", resp);
      let list = resp.data.DATA;
      this.list = list;
     
      // If the API returned a successful response, mark the user as logged in
      if (resp.status == 'success') {
        let list = resp.data.DATA;
        this.list = list;
      }
    },(error) => {
      console.log('Error:', error);
      this.list = this.item.plocation;
    });
  }

  openFile() {

    this.modalCtrl.create({
      component: DocumentViewerPage,
      componentProps: {
        displayData: {
          fileName: this.item.sname,
          pdfSource: {
            url: this.list
          }
        }
      }
    }).then((modal)=>{
      modal.present();
    },(error)=>{

    });
    
  }

  download() {
   
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    let url:string = this.list;
    let fileDir=null;

    // android
    if(this.platform.is('android')){
      fileDir = this.file.externalDataDirectory;
    }

    // Ios
    if(this.platform.is('ios')){
      fileDir = this.file.syncedDataDirectory;
    }
   
    this._storage.getObject('file-download_'+this.item.id).then((res)=>{
      if(res==true || res =='true'){
        this._utils.presentToast('Already downloaded...');
        let fileURL = encodeURI(fileDir + this.item.sname);
        console.log("Downloaded URL:",fileURL);
        this.openDownloadedFile(fileURL);
      
      }else{
        this._utils.presentToast('Downloading start...');
        fileTransfer.download(url, fileDir + this.item.sname).then((entry) => {
          console.log('download complete:URL:: ' + entry.toURL());
          entry
          this._storage.setObject('file-download_'+this.item.id, true);
          this._utils.presentToast('Downloaded successfully.');
          this.openDownloadedFile(entry.toURL());
        }, (error) => {
          // handle error
          console.log('Error in Downloading::', error);
          this._utils.presentToast('Error in Download!');
        });
      }
    });
  }

  openDownloadedFile(fileURL){
    console.log('OpenURL:', fileURL);
    this.fileOpener.open(fileURL, this.item.scontenttype)
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
  } 
}