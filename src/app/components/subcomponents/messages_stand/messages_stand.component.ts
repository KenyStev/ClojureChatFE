import { Component, OnInit, Input } from '@angular/core';
import {Message, MessageImage} from '../../../structures/structures';
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
    @Input() type: string = "user";

    public model : Message;
    public messages = [];
    public now : Date;
    public modelImage : MessageImage;

    constructor(private _messages: MessagesService, private _session: SessionService, private _toaster: ToasterService) {
        this.model = new Message('','','','', new Date(), this.type);
    }

    setScroll(){
        {alert("Friend Change"); 
        document.getElementById('lastMessage').scrollHeight;}
    }

    ngOnInit() {
        this.now = new Date();
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
    .switchMap(r => this.type == "user" ? this._messages.getMessagesBetween(this.user, this.friend) : this._messages.getRoomsMessages(this.friend))
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
        this.model.type = this.type;
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

    sendImage(img: File){
        alert("Send image: " + img.name);
        this.modelImage = new MessageImage(img, this.user, this.friend, new Date(), this.type);
        this._messages.sendImage(this.modelImage).subscribe(
            res => {this._toaster.pop("success", "", "Image sent")},
            err => {this._toaster.pop("error", "", "Error sending image")}
            );
    }

    isImage(message: string){
        if (message[0] == '/' && message[1] == ':')
            return true;
        return false;
    }

    messageToImage(message: string){
        return 'http://localhost:8000/messages/with-image/' + message.replace('/:', '').replace(':/', '');
    }

    isEmoji(message : string){
        if (message.includes('('))
            return true;
        return false;
    }

    messageToEmoji(message: string){
        return 'http://localhost:8000/emojis/image/' + message.replace('(', '').replace(')', '');
    }

    messageToEmojiWithMsg(message : string){
        //let regex = /.*\(.*\).*/i;
        let ret = message;
        ret = message.replace(/\(/g, `<img class="tiny" src='http://localhost:8000/emojis/image/`);
        ret = ret.replace(/\)/g, "'>");
        //console.log(ret);
        return ret;
    }

}
