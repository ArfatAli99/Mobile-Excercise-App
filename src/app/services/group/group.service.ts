import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";

import { ApiService } from '../api/api.service';
import { API_URL, END_POINT } from '../../config/config.module';



@Injectable({
  providedIn: 'root'
})
export class GroupService {
  _defaultsGroupId= null;
  _selectedGroup= null;
  _selectedNews=null;

  constructor(public api: ApiService) { }
  
  get defaultsGroupId(){
  	return this._defaultsGroupId;
  }
  set defaultsGroupId(defaults){
  	this._defaultsGroupId =defaults;
  }

  get selectedGroup(){
    return this._selectedGroup;
  }
  set selectedGroup(group){
    this._selectedGroup =group;
  }

  get selectedNews(){
    return this._selectedNews;
  }
  set selectedNews(news){
    this._selectedNews =news;
  }
 
  public getDefaultGroupId(params){
    let reqUrl = API_URL+END_POINT.DEFAULT_GROUP; 

  	let body = new URLSearchParams();  
    body.append('userId', params.userId);

    return this.api.postRequest(reqUrl, body);
  }

  public getMyGroups(params){
    /* New End Points */
    // let getMyGroupsUrl = API_URL+ END_POINT.USER_GROUPS; 
    
    // let body = new URLSearchParams(); 
    // body.append('userId', params.userId);
    // body.append('accepted', 'true');
    // body.append('active', '1');
    // return this.api.postRequest(getMyGroupsUrl, body);

    let reqUrl = API_URL+ END_POINT.GROUP_MEMBERS_FULL; 
    let body = new URLSearchParams(); 
    body.append('userId', params.userId);
    body.append('Accepted', 'true');
    body.append('http_host', 'www.foodshield.org');
    return this.api.postRequest(reqUrl, body);
  }


  public setDefaultGroupId(params){
    let reqUrl = API_URL+END_POINT.SET_DEFAULT_GROUP; 

    let body = new URLSearchParams(); 
    body.append('userId', params.userId);
    body.append('groupID', params.groupId);
    body.append('defgroup', params.defaultFlag);

    return this.api.postRequest(reqUrl, body);
  }

  public getGroupDetails(groupId){
    let reqUrl = API_URL+END_POINT.WK_GROUP_APPS;  
    let reqUrl2 = API_URL+END_POINT.WK_GROUP_INFO;  

    let getWorkGroupApps = this.api.getRequest(reqUrl + groupId,null)
    let getWorkGroupData = this.api.getRequest(reqUrl2 + groupId,null);

    return forkJoin([getWorkGroupApps, getWorkGroupData]);
  }
  
  public getWorkGroupApps(groupId){

    let reqUrl = API_URL+END_POINT.WK_GROUP_APPS;
    return this.api.getRequest(reqUrl + groupId,null);
  }

  public getWorkGroupData(groupId){
    let reqUrl = API_URL+END_POINT.WK_GROUP_INFO;
    return this.api.getRequest(reqUrl + groupId,null);
  }

  public getGroupActivities( params ){

    let reqUrl = API_URL+END_POINT.GROUP_ACTIVITIES;

    let body = new URLSearchParams();
    body.append('DisplayFeedCnt', params.displayFeedCount);
    body.append('userid', params.userId);
    body.append('authAccess', params.authAccess);
    body.append('timezone', params.timeZone);
    body.append('viewgroup', params.viewGroup);
    // body.append('forWorkGroup', params.forWorkGroup);
    body.append('ActivityDate_Start', params.activityDateStart);
 
    
    return this.api.postRequest(reqUrl, body);
  }

  

  public getGroupMeetings(params){
    let reqUrl = API_URL+END_POINT.GROUP_MEETINGS;
    let body = new URLSearchParams();
    body.append('groupID', params.groupId); //"coreUserID": "65" required in params etc
    return this.api.postRequest(reqUrl, body);
  }

  public getGroupUpdates(groupId){
    let reqUrl = API_URL+END_POINT.GROUP_NEWS;
    return this.api.getRequest(reqUrl + groupId,null);
  }

  public getGroupAlbums(params){

    let reqUrl = API_URL+END_POINT.ALBUM_LIST;
    let body = new URLSearchParams();
    body.append('viewgroup', params.viewGroupId);
    body.append('userid', params.userId);
    body.append('photoType', params.photoType);
   
    return this.api.postRequest(reqUrl, body);
  }

  public getPhotosList(params){

    let reqUrl = API_URL+END_POINT.PHOTO_LIST;
    let body = new URLSearchParams();
    body.append('photoUUID', params.photoUUID);
   
    return this.api.postRequest(reqUrl, body);
  }



  public getGroupVideos(params){

    let reqUrl = API_URL+END_POINT.GROUP_VIDEOS;
    let body = new URLSearchParams();
    body.append('viewgroupAll', params.viewGroupId);
   
    return this.api.postRequest(reqUrl, body);
  }



  public getGroupPolls(params){

    let reqUrl = API_URL+END_POINT.GROUP_POLLS;
    let body = new URLSearchParams();
    body.append('groupID', params.groupId);
    body.append('getAll', 'true');
   
    return this.api.postRequest(reqUrl, body);
  } 

  public getPollData(params){
    let reqUrl = API_URL+END_POINT.POLL_DETAILS;
    let body = new URLSearchParams();
    body.append('pollID', params.pollId);
   
    return this.api.postRequest(reqUrl, body);
  }

  public insertPollResults(params){
    let reqUrl = API_URL+END_POINT.SAVE_POLL;
    let body = new URLSearchParams();
    body.append('poll_id', params.pollId);
    body.append('userid', params.userId);
    body.append('item', params.item);
   
    return this.api.postRequest(reqUrl, body);
  }


  public getWorkGroupInfo(groupId){
   let reqUrl = API_URL+END_POINT.WK_GROUP_INFO;
   return this.api.getRequest(reqUrl+groupId, null);
  }

  public getDocsCalls( userFileParam, subFoldersParam){
    let reqUrl = API_URL+END_POINT.VCF_USER_FILES;
    let userFileBody = new URLSearchParams();
    userFileBody.append('dir', userFileParam.dir);
    userFileBody.append('userid', userFileParam.userId);
    userFileBody.append('authAccess', userFileParam.authAccess);

    let reqUrl2 = API_URL+END_POINT.VCF_WG_SUBFOLDERS;
    let subFolderBody = new URLSearchParams();
    subFolderBody.append('dir', subFoldersParam.dir);
    subFolderBody.append('viewgroup', subFoldersParam.viewGroupId);


    let userFileCall = this.api.postRequest(reqUrl, userFileBody);;
    let subFolderCall= this.api.postRequest(reqUrl2, subFolderBody);;
   
    return forkJoin([ userFileCall, subFolderCall]);
  }


  public getGroupPosts( params){
    let reqUrl = API_URL+END_POINT.GROUP_POSTS;
    let body = new URLSearchParams();
    body.append('viewgroup', params.viewGroupId);
    body.append('userid', params.userId);
   
    return this.api.postRequest(reqUrl, body);
  }

  public doLikeComment(params){
    let reqUrl = API_URL+END_POINT.POST_LIKE;
    let body = new URLSearchParams();
    body.append('messageID', params.messageId);
    body.append('userUUID', params.userUID);   
    return this.api.postRequest(reqUrl, body);
  }


  public addPost(params){
    let reqUrl = API_URL+END_POINT.ADD_POST;
    let body = new URLSearchParams();
    body.append('viewgroupid', params.viewGroupId);
    body.append('authUid', params.authUID);
    body.append('txt_comments', params.postText);
   
    return this.api.postRequest(reqUrl, body);
  }

  public getPendingGroups(params){
    let reqUrl = API_URL+END_POINT.GROUP_MEMBERS_FULL;
    let body = new URLSearchParams();
    body.append('userId', params.userid);
    body.append('accepted', 'false');
    body.append('httpHost', 'www.foodshield.org');
   
    return this.api.postRequest(reqUrl, body);
  }

  public getCommentsByDiscussion(params){
    let reqUrl = API_URL+END_POINT.POST_COMMENTS;
    let body = new URLSearchParams();
    body.append('messageID', params.messageId);
   
    return this.api.postRequest(reqUrl, body);
  }
  public postCommentByDiscussion(params){
    let reqUrl = API_URL+END_POINT.POST_ADD_COMMENT;
    let body = new URLSearchParams();
    body.append('commentID', params.commentId);
    body.append('authUid', params.authUID);
    body.append('comment', params.comment);
    body.append('viewgroup', params.viewGroupId);
   
    return this.api.postRequest(reqUrl, body);
  }
  public getUserLikes(params){
    let reqUrl = API_URL+END_POINT.USER_LIKE_LIST;
    let body = new URLSearchParams();
    body.append('messageID', params.messageId);
   
    return this.api.postRequest(reqUrl, body);
  }

  public createGroupNews(params){
    let reqUrl = API_URL+END_POINT.CREATE_GROUP_NEWS;
    let body = new URLSearchParams();
    body.append('userId', params.userId);
    body.append('newsbody', params.newsBody);
    body.append('headline', params.headline);
    body.append('viewgroup', params.viewGroupId);
   
    return this.api.postRequest(reqUrl, body);
  }
  
}
