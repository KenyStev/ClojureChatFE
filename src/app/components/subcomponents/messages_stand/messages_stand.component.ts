import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../../../structures/structures';
import {MessagesService} from '../../../services/messages.service';
import {SessionService} from '../../../services/session.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    selector: 'msg-stand-cmp',
    templateUrl: './messages_stand.html'
})
export class MessagesStandComponent implements OnInit {
    @Input() user : string = "";
    @Input() friend : string = "";

    public model : Message;
    public messages = [];

    constructor(private _messages: MessagesService, private _session: SessionService, private _toaster: ToasterService) {
        this.model = new Message('','','','', new Date());
    }

    setScroll(){
        {alert("Friend Change"); 
        document.getElementById('lastMessage').scrollHeight;}
    }

    ngOnInit() {
        this.model.from_who = this.user;
            this.getMessages$.subscribe(t => {
                this.messages = t;
            });
        
        //alert(new Date().toDateString());
    }

    refreshMessages(){
        return Observable.timer(500);
    }

    getMessages$ = Observable.of(null).switchMap(e=>this.refreshMessages())
    .switchMap(r => this._messages.getMessagesBetween(this.user, this.friend))
    .repeat();

    sendNewMessage(){
        this.model.sent = new Date();
        this._messages.create(this.model).subscribe(
            res => {this.messageSent()},
            err => {this._toaster.pop("error", "", err);}
            );
    }

    ngOnChange(changes: any){
        alert("algo cambio");
    }

    sendMessage(){
        if (this.friend == "")
            return;
        this.model.sent = new Date();
        this.model.to_who = this.friend;
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
