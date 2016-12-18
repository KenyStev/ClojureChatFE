import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';

@Component({
	selector: 'chatroom-cmp',
	templateUrl: './chatroom.html'
})
export class ChatroomComponent implements OnInit {
	public messages_with = [];
	public me: string = "";
	public selected: string = "none";
	public type : string = "user";

	constructor(private _users: UsersService, private _session: SessionService) { }

	ngOnInit() {
		this.me = this._session.getSession().email;
		this._users.getMyChats(this.me).subscribe(
			res => {this.messages_with = res}
		);
	}

}
