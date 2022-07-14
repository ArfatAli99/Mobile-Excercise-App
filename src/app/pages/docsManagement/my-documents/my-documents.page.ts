import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         DocumentsService,
         StorageService } from '../../../services/services.module';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.page.html',
  styleUrls: ['./my-documents.page.scss'],
})
export class MyDocumentsPage implements OnInit {
	  myInput:any='';
    shouldShowCancel:any=false;
    item: any;
  	doclibrary: number = 0;
  	group_id: number = 0;
  	prevGroup_id: number;
  	prevDir: number;
  	prev: number = 0;
  	userId: number;

  	list: Array<string>;
  	list1: Array<string>;
  	session: { auth: { FOLDER_ID: number, ACCESS: number } };

  	temp_list: Array<string>;
  	constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public docsService: DocumentsService,
      public _storage: StorageService,
      public cache: CacheService
    ) { 
  		
  	}

  	ngOnInit() {
  		let userId = this._storage.getObject('userId');
    	let session = this._storage.getObject('session');
    	Promise.all([userId, session]).then((values)=>{
    		this.userId = values[0];
      		this.session = values[1];
      		this.getDocuments(this.doclibrary, this.group_id);
    	}, error=>{
    		console.log('Documents Values Error')
    	});
  	}

  	getDocuments(dir, group_id){
  		this.list = [];
	    this.list1 = [];
	    this.doclibrary = dir;
	    this.group_id = group_id;
	    this.prev = 0;
	    let params= {
	      dir: dir,
	      userId: this.userId,
	      folderId: this.session.auth.FOLDER_ID,
	      authAccess: this.session.auth.ACCESS
	    };
	    console.log('Params:', params);

      let cacheKey= 'mydocs_'+params.folderId+'_'+dir;
      let req = this.docsService.getMyDocsFile(params);

	    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe((resp)=>{
	    	console.log('MyDocs Response', resp);
        let list = resp.data.FILES;
        let list1 = resp.data.SUBFOLDERS;
        let list2 = resp.data.CURRENTFOLDER;

        if (dir == 0 && list1.length) {
          dir = list1[0].id;
        }

        if (list2.length && list2[0].parentfolderid) {
          if (this.prev && list1.length) {
            this.prevDir = list1[0].parentfolderid;
          } else {
            this.prevDir = list2[0].parentfolderid;
          }
          this.prev = 1;
        } else {
          this.prevDir = dir;
          this.prevGroup_id = group_id;
        }

      this.list = list;
      this.temp_list = list;
      this.list1 = list1;

	    },(error)=>{
	    	console.log('MyDocs Error', error);
	    })

  	}

  filterItems(ev: any) {

    let val = ev.target.value;
    this.list = this.temp_list;
    if (val && val.trim() !== '') {
      console.log("val", val);
      console.log("list", this.list);
      this.list = this.list.filter(function (item) {
        console.log("item", item);
        return item["sname"].toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');

    // setTimeout(() => {

    //   this.list.concat(this.list);
    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    //   infiniteScroll.enable(true);
    // }, 500);
  }

  openDoc(event) {
    console.log('Docs File Event:', event);
    this._storage.setObject('selectedDocs',event.item);
    this.router.navigate(['/document-details']);
    // this.navCtrl.push(DocumentPage, {
    //   item: item
    // });
  }

  openFolder(event) {
    console.log('Folder Event:', event);
    // this.getDocuments(id, group_id);
    this.getDocuments(event.dirId, event.groupId);
  }

  onCancel(event){

  }

}
