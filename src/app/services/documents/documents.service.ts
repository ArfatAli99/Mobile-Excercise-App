import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";

import { ApiService } from '../api/api.service';

import { API_URL, END_POINT  } from '../../config/config.module';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(public api: ApiService) { }

 
 
  public getMyDocsFile(params){
    let reqUrl = API_URL+END_POINT.VCF_MD_FILES;

  	let body = new URLSearchParams(); 
    body.append('dir', params.dir);
    body.append('userid', params.userId);
    body.append('folder_id', params.folderId);
    body.append('authAccess', params.authAccess);
   
    return this.api.postRequest(reqUrl, body); 
  }

  public getDocDetails(docId){
    let reqUrl = API_URL+END_POINT.VCF_FILE_PFD_URL;
    return this.api.getRequest(reqUrl+docId, null); 
  }
}
