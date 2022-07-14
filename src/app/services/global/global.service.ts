import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  _selectedNewsFeed:any;

  constructor() { }
  
  get selectedNewsFeed(){
  	return this._selectedNewsFeed;
  }
  set selectedNewsFeed(feed){
  	this._selectedNewsFeed =feed;
  }

}
