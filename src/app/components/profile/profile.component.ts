import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {FriendsService} from '../../services/friends.service';
import {User, Friend, Friendship} from '../../structures/structures';
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'profile-cmp',
	templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
	public model : User;
	public session : User;
	public friends = [];
	public email : string;

	constructor(private _users: UsersService, private _session: SessionService, private _params: ActivatedRoute, private _friends: FriendsService, private _toaster : ToasterService) { 
		this.model = new User('','','','');
	}

	ngOnInit() {
		this._params.params.subscribe(
            params => this.email = params['email']
        );
		this._users.getUser(this.email).subscribe(
			res => {this.model = res}
		);
		this.session = this._session.getSession();
		this._friends.getAll(this.email).subscribe(
			res => {this.friends = res}
		);
	}

	addFriend(){
		if(this.model.email == this.session.email) return;
		let relation = new Friendship("",this.session.email, this.model.email, new Date());
		this._friends.create(relation).subscribe(
			res => {this._toaster.pop("success", "", "Friend added")},
			err => {this._toaster.pop("error", "", "Error adding friend")}
		);
	}

	addNewFriend(email: string){
		if(email == this.session.email) return;
		let relation = new Friendship("",email, this.model.email, new Date());
		this._friends.create(relation).subscribe(
			res => {this._toaster.pop("success", "", "Friend added")},
			err => {this._toaster.pop("error", "", "Error adding friend")}
		);
	}

}
