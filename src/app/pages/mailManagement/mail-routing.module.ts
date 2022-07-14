import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailPopoverPageModule } from './mail-popover/mail-popover.module';

const routes: Routes = [
  { path: 'mail', loadChildren: './mail/mail.module#MailPageModule' },
  { path: 'mail-content', loadChildren: './mail-content/mail-content.module#MailContentPageModule' },
  { path: 'mail-content/:type', loadChildren: './mail-reply/mail-reply.module#MailReplyPageModule' }
];


@NgModule({
  imports: [
  	MailPopoverPageModule,
  	RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MailRoutingModule { }
