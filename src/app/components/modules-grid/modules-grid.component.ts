import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-modules-grid',
	templateUrl: './modules-grid.component.html',
	styleUrls: ['./modules-grid.component.scss']
})
export class ModulesGridComponent implements OnInit {
	_pageName:string;
    _size: string;
    _gridItems: any[];
	constructor() { }


	ngOnInit() {
	}
	@Input()
  	set gridItems(gridItems: any[]) { this._gridItems = gridItems; }
  	get gridItems(): any[] { return this._gridItems; }

  	@Input()
  	set pageName(pageName: string) { this._pageName = pageName; }
  	get pageName(): string { return this._pageName; }

  	@Input()
  	set size(size: string) { this._size = size; }
  	get size(): string { return this._size; }


  	@Output() itemTap = new EventEmitter();
  	ItemClicked(_pageName, _module) {
  		console.log('ItemClicked:', _module);
        this.itemTap.emit({
        	pageName:_pageName, 
        	module:_module
        });
    }


}
