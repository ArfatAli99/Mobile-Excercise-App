import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilsService,
         UserService,
         MailService,
         StorageService } from '../../../services/services.module';



@Component({
  selector: 'app-mail-reply',
  templateUrl: './mail-reply.page.html',
  styleUrls: ['./mail-reply.page.scss'],
})
export class MailReplyPage implements OnInit {

  @ViewChild('content') content: ElementRef;
  userId: number;
  item: any;
  type: any;
  list: any[];
  list1: any[];
  ccEnable: boolean = false;
  session: { auth: { DEFAULTEMAIL: string } } = { auth: { DEFAULTEMAIL: "" } };

  mail = {
    from: '',
    to: '',
    cc: '',
    subject: '',
    content: ''
  };
  constructor(
  	  public router: Router,
  	  public route: ActivatedRoute,
      public _utils: UtilsService,
      public userService: UserService,
      public mailService: MailService,
      public _storage: StorageService
      ) { 
  	this.type = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {
  	let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    let selectedMail = this._storage.getObject('selectedMail');
    Promise.all([userId, session, selectedMail]).then(value => {
      console.log("value1", value);
      this.userId = value[0];
      this.session = value[1];
      this.item = value[2];
      //this.getData();
      this.mail = {
        from: this.item.from_email,
        to: "",
        cc: "",
        subject: "",
        content: "<br/><br/><p>----------------<br/><br/></p>" + this.item.mailtext + ""
      };

      if (this.type == "Reply All") {
        this.mail.subject = "RE: " + this.item.mailsubject + "";
        this.mail.to = "" + this.session.auth.DEFAULTEMAIL + "," + this.item.from_email + "";
        this.ccEnable = true;
      } else if (this.type == "Forward") {
        this.mail.subject = "FW: " + this.item.mailsubject + "";
        this.mail.to = "";
        this.ccEnable = true;
      } else {
        this.mail.subject = "RE: " + this.item.mailsubject + "";
        this.mail.to = this.item.from_email;
      }

    });
  }

  sendEmailData(){
  	this.mail.content = this.content.nativeElement.innerHTML;

    let body = 'defaultemail=' + this.session.auth.DEFAULTEMAIL + '&to=' + this.mail.to + '&cc= ' + this.mail.cc + '&subject=' + this.mail.subject + '&body=' + this.mail.content.toString() + '';

    let params = {
      defaultEmail: this.session.auth.DEFAULTEMAIL,
      to: this.mail.to,
      cc: this.mail.cc,
      subject: this.mail.subject,
      body: this.mail.content
    };

    this.mailService.sendReply(params).subscribe((resp) => {
      let list = resp.data.DATA;
      this.list = list;

      console.log("this.list", this.list);
      this.router.navigate(['/mail'],{ replaceUrl: true });
      
    },(error) => {
        console.log("error", error);
    });

  }
  send(mail) {
    this.sendEmailData();
  }




}
