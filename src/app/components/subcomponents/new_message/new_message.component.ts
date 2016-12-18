import { Component, OnInit, Input } from '@angular/core';
import {Message, User} from '../../../structures/structures';
import {MessagesService} from '../../../services/messages.service';
import {SessionService} from '../../../services/session.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {Observable} from 'rxjs/Observable';
import {EventsEmitter} from '../../../services/event-emitter.service';
import 'rxjs/Rx';

@Component({
    selector: 'new-msg-cmp',
    templateUrl: './new_message.html'
})
export class NewMessagesComponent implements OnInit {
    @Input() to : string = "";

    public model : Message;
    public session : User;

    constructor(private _messages: MessagesService, private _session: SessionService, private _toaster: ToasterService, private _emitter: EventsEmitter) {
        this.model = new Message('','','','', new Date(), "user");
    }

    ngOnInit() {
        this.session = this._session.getSession();
        this.model.from_who = this.session.email;
        this.model.to_who = this.to;
        this._emitter.getToEvent().subscribe(
            change => {
                this.to = change; 
                document.getElementById('showModal').click();
            }
        );
    }

    sendMessage(){
        this.model.sent = new Date();
        this.model.to_who = this.to;
        this.model.from_who = this._session.getSession().email;
        this._messages.create(this.model).subscribe(
            res => {this.messageSent()},
            err => {this._toaster.pop("error", "", err);}
            );
        this.model.message = "";
    }

    messageSent(){
        this._toaster.pop("success", "", "Message sent");
        document.getElementById("closeModal").click();
    }

}
