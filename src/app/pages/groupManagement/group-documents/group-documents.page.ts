import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../../services/services.module';

@Component({
  selector: 'app-group-documents',
  templateUrl: './group-documents.page.html',
  styleUrls: ['./group-documents.page.scss'],
})
export class GroupDocumentsPage implements OnInit {

  myInput:any='';
  shouldShowCancel:any=false;
  item: any;
  doclibrary: any;
  temp_doclibrary: any;
  group_id: any;
  prevGroup_id: number;
  prevDir: number;
  prev: number = 0;
  userId: number;

  list: any[];
  list1: any[];
  list2: any[];
  session: { auth: { ACCESS: number } } = { auth: { ACCESS: 0 } };

  temp_list: Array<string>;
  isDisabled = true;
  url_test = 'assets/img/speakers/html.jpg';

  constructor(
  	public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
    public groupService: GroupService,
    public _storage: StorageService,
    public cache: CacheService) {
     }

  ngOnInit() {
  	let userId = this._storage.getObject('userId');
  	let session = this._storage.getObject('session');
  	let selectedGroup = this._storage.getObject('selectedGroup');
  	Promise.all([userId, session, selectedGroup]).then(value => {
      
      this.userId = value[0];
      this.session = value[1];
      this.item = value[2];
      this.temp_doclibrary = this.doclibrary;
      this.getDocs(this.doclibrary, this.item.group_id);
      
    });
  }

  getDocs(dir, group_id){
  	this.list = [];
    this.list1 = [];
    this.doclibrary = dir;
    this.group_id = group_id;

    this.prev = 0;
    let cacheKey= 'groupinfo_'+group_id;
    let req =  this.groupService.getWorkGroupInfo(this.group_id);
    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe((response)=>{
    	let list = response.data.DATA[0];
	    if (dir == undefined) {
	    	dir = list.doclibrary;
	    }

	    let userFilesParams = {
        dir: dir,
        userId: this.userId,
        authAccess: this.session.auth.ACCESS
	    };
	    let wgSubfoldersParams = {
	          dir: dir,
	          viewGroupId: this.group_id
	    };

      let cacheKey= group_id+'_group_docs_'+dir;
      let req =  this.groupService.getDocsCalls( userFilesParams, wgSubfoldersParams);
	    this.cache.loadFromDelayedObservable(cacheKey, req, null, null, 'all').subscribe((response)=>{
    		console.log('GetDocsFile Response', response);
    		let userFileResponse = response[0];
    		let subFolerResponse = response[1];

    		// Handling user File Resonse...
    		let list = userFileResponse.data.DATA;
	        let list2 = userFileResponse.data.CURRENTFOLDER;

	        this.list = list;
	        this.list2 = list2;
	        this.temp_list = list;


	        // Handling Subfolder Response...
	        console.log("subFolerResponse", subFolerResponse);
          	this.list1 = subFolerResponse.data.DATA;

          	console.log("list1", this.list1);
          	console.log("list1", this.list1.length);
          	if (this.list2.length && this.list2[0].parentfolderid) {
            	if (this.prev && this.list1.length) {
              		this.prevDir = this.list1[0].parentfolderid;
            	} else {
              		this.prevDir = this.list2[0].parentfolderid;
            	}
            	this.prev = 1;
          	} else {
            	this.prevDir = dir;
            	this.prevGroup_id = group_id;
          	}

    	},(error)=>{
    		console.log('GetDocsFile Error', error);
    	})

    },(error)=>{

    });
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
    // this.getDocs(id, group_id);
    this.getDocs(event.dirId, event.groupId);
  }
  onCancel(event){

  }

}
