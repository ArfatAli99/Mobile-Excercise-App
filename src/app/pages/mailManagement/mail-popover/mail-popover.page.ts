import { Component, OnInit } from '@angular/core';
import {PopoverController}  from '@ionic/angular';

@Component({
  selector: 'app-mail-popover',
  templateUrl: './mail-popover.page.html',
  styleUrls: ['./mail-popover.page.scss'],
})
export class MailPopoverPage implements OnInit {

  constructor(public popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  selectValue(value){
	this.popoverCtrl.dismiss({type:value}, 'success');  
  }

}
