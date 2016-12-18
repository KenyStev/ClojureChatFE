import { Component, OnInit, Input } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Message, Friendship} from '../../../structures/structures';
import {MessagesService} from '../../../services/messages.service';
import {SessionService} from '../../../services/session.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {EventsEmitter} from '../../../services/event-emitter.service';
import {FriendsService} from '../../../services/friends.service';
import {User} from '../../../structures/structures';

@Component({
	selector: 'u-search-cmp',
	templateUrl: './users-search.html'
})
export class UsersSearchComponent implements OnInit {
	public users = []
	public model : Message;
	@Input() searched : string = "";
	public session : User;

	constructor(private _users: UsersService, private _emitter: EventsEmitter, private _friends : FriendsService, private _session: SessionService, private _toaster : ToasterService) { 
		this.model = new Message('','','','', new Date(), "user");
	}

	ngOnInit() {
		this._users.getAll().subscribe(
			res => {this.users = res},
		);
		if(this._session.hasSession())
			this.session = this._session.getSession();
	}

	newMessage(email: string){
		this._emitter.createToEvent(email);
	}

	addFriend(email: string){
		if(email == this._session.getSession().email) return;
		let relation = new Friendship("",this._session.getSession().email, email, new Date());
		this._friends.create(relation).subscribe(
			res => {this._toaster.pop("success", "", "Friend added")},
			err => {this._toaster.pop("error", "", "Error adding friend")}
		);
	}

}
