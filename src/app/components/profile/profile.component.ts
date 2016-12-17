import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {User} from '../../structures/structures';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'profile-cmp',
	templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
	public model : User;
	public session : User;

	constructor(private _users: UsersService, private _session: SessionService, private _params: ActivatedRoute) { 
		this.model = new User('','','','');
	}

	ngOnInit() {
		var email = "";
		this._params.params.subscribe(
            params => email = params['email']
        );
		this._users.getUser(email).subscribe(
			res => {this.model = res}
		);

		this.session = this._session.getSession();
	}

}
