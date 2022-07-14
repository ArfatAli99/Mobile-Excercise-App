import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";

import { ApiService } from '../api/api.service';
import { API_URL, END_POINT } from '../../config/config.module';



@Injectable({
    providedIn: 'root'
})
export class MailService {

    constructor(public api: ApiService) { }

    public getUserMails(params) {
        let reqUrl = API_URL + END_POINT.USER_MAILS;
        let body = new URLSearchParams();
        body.append('userId', params.userId);
        return this.api.postRequest(reqUrl, body);
    }

    public getUnreadEmails(params) {
        let reqUrl = API_URL+END_POINT.MAIL_UNREAD;
        let body = new URLSearchParams();
        body.append('userId', params.userId);
        return this.api.postRequest(reqUrl, body);

    }

    public updateMailStatus(params) {

        let reqUrl = API_URL+END_POINT.MAIL_UPDATE;
        let body = new URLSearchParams();
        body.append('userId', params.userId);
        body.append('mailID', params.mailId);
        return this.api.postRequest(reqUrl, body);

    }

    public sendReply(params) {

        let reqUrl = API_URL+END_POINT.MAIL_REPLY;
        let body = new URLSearchParams();
        body.append('defaultemail', params.defaultemail);
        body.append('to', params.to);
        body.append('cc', params.cc);
        body.append('subject', params.subject);
        body.append('body', params.body);

        return this.api.postRequest(reqUrl, body);

    }

}
