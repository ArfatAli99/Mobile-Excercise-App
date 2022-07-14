import { Component, OnChanges,  Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-core-activity',
  templateUrl: './core-activity.component.html',
  styleUrls: ['./core-activity.component.scss']
})
export class CoreActivityComponent{
  
  private _item:any;

  constructor() { 
  	
  }
 
  @Input()
  set item(item: any) {
    this._item = item;
  }
 
  get item(): any { return this._item; }



}
