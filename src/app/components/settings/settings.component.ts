import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {User} from '../../structures/structures';

@Component({
	selector: 'settings-cmp',
	templateUrl: './settings.html'
})
export class SettingsComponent implements OnInit {
	public model : User;
	public img = "";

	constructor(private _users: UsersService, private _session: SessionService) { 
		this.model = new User('','','','');
	}

	ngOnInit() {
		this._users.getUser(this._session.getSession().email).subscribe(
			res => {this.model = res}
		);
	}

	doSomething(){
		alert("click");
	}

}
