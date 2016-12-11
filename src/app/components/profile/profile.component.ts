import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {User} from '../../structures/structures';

@Component({
	selector: 'profile-cmp',
	templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
	public model : User;
	public session : User;

	constructor(private _users: UsersService, private _session: SessionService) { 
		this.model = new User('','','','');
	}

	ngOnInit() {
		this._users.getUser(this._session.getSession().email).subscribe(
			res => {this.model = res}
		);

		this.session = this._session.getSession();
	}

}
