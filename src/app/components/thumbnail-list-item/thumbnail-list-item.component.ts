import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-thumbnail-list-item',
  templateUrl: './thumbnail-list-item.component.html',
  styleUrls: ['./thumbnail-list-item.component.scss']
})
export class ThumbnailListItemComponent implements OnInit {
  	_pageName:string;
  	_iconName:string;
  	_title: string;
  	_subTitle: string=null;
  	_btnText:string=null;
  	_btnIcon:boolean=false;
  	_detailIcon:boolean=false;
    _thumbnailImage:boolean=false;
    _subTitleDate:any;
  	_item:any;

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
  	set subTitle(subTitle: string) { this._subTitle = subTitle; }
  	get subTitle(): string { return this._subTitle; }

  	@Input()
  	set btnText(btnText: string) { this._btnText = btnText; }
  	get btnText(): string { return this._btnText; }
  	
  	@Input()
  	set btnIcon(btnIcon: boolean) { this._btnIcon = btnIcon; }
  	get btnIcon(): boolean { return this._btnIcon; }

  	@Input()
  	set detailIcon(detailIcon: boolean) { this._detailIcon = detailIcon; }
  	get detailIcon(): boolean { return this._detailIcon; }

    @Input()
    set thumbnailImage(thumbnailImage: boolean) { this._thumbnailImage = thumbnailImage; }
    get thumbnailImage(): boolean { return this._thumbnailImage; }

    @Input()
    set subTitleDate(subTitleDate: any) { this._subTitleDate = subTitleDate; }
    get subTitleDate(): any { return this._subTitleDate; }
  	@Output() itemTap = new EventEmitter();


  	ItemClicked(_pageName, _item) {
        this.itemTap.emit({pageName:_pageName, item:_item});
    }

}
