import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
	selector: 'chatroom-cmp',
	templateUrl: './chatroom.html'
})
export class ChatroomComponent implements OnInit {
	public messages_with = [];
	public me: string = "";
	public selected: string = "none";
	public type : string = "user";
	public filt : string = "";

	constructor(private _users: UsersService, private _session: SessionService) { }

	ngOnInit() {
		this.me = this._session.getSession().email;
		this.getConversations$.subscribe(t => {
                this.messages_with = t;
            });
	}

	refreshConversations(){
        return Observable.timer(1000);
    }

    getConversations$ = Observable.of(null).switchMap(e=>this.refreshConversations())
    .switchMap(r => this._users.getMyChats(this.me))
    .repeat();

}
