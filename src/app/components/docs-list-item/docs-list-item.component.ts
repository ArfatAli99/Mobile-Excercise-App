import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-docs-list-item',
  templateUrl: './docs-list-item.component.html',
  styleUrls: ['./docs-list-item.component.scss']
})
export class DocsListItemComponent implements OnInit {
  _pageName:string;
  _iconName:string;
  _title: string;
  _thumbnailImage:boolean=false;
  _thumbnailImageSrc: string;
  _detailIcon:boolean=false;
  _item: any;
  _dirId:string=null;
  _groupId:string=null;
  constructor() { }

  ngOnInit() {
  }

  @Input()
  	set item(item: any) { this._item = item; }
  	get item(): any { return this._item; }

  	@Input()
  	set pageName(pageName: string) { this._pageName = pageName; }
  	get pageName(): string { return this._pageName; }

  	@Input()
  	set iconName(iconName: string) { this._iconName = iconName; }
  	get iconName(): string { return this._iconName; }

  	@Input()
  	set title(title: string) { this._title = title; }
  	get title(): string { return this._title; }

  	@Input()
  	set dirId(dirId: string) { this._dirId = dirId; }
  	get dirId(): string { return this._dirId; }

  	@Input()
  	set groupId(groupId: string) { this._groupId = groupId; }
  	get groupId(): string { return this._groupId; }


  	@Input()
  	set detailIcon(detailIcon: boolean) { this._detailIcon = detailIcon; }
  	get detailIcon(): boolean { return this._detailIcon; }

    @Input()
    set thumbnailImage(thumbnailImage: boolean) { this._thumbnailImage = thumbnailImage; }
    get thumbnailImage(): boolean { return this._thumbnailImage; }

    @Input()
    set thumbnailImageSrc(thumbnailImageSrc: string) { this._thumbnailImageSrc = thumbnailImageSrc; }
    get thumbnailImageSrc(): string { return this._thumbnailImageSrc; }

  	@Output() itemTap = new EventEmitter();
  	ItemClicked(_pageName, _item) {
        this.itemTap.emit({
        	pageName:_pageName, 
        	item:_item, 
        	groupId:this.groupId, 
        	dirId:this.dirId
        });
    }

}
