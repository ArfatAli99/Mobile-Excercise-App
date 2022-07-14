import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailReplyPage } from './mail-reply.page';

describe('MailReplyPage', () => {
  let component: MailReplyPage;
  let fixture: ComponentFixture<MailReplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailReplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailReplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
