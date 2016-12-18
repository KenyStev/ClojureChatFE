import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../structures/structures';
import {UsersService} from '../../services/users.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {SessionService} from '../../services/session.service';
import {EventsEmitter} from '../../services/event-emitter.service';

@Component({
	selector: 'login-cmp',
	templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
	public user = new User('','','','');

	constructor(private _user: UsersService, private toasterService: ToasterService, private _session: SessionService, 
		private _router : Router, private _emitter: EventsEmitter ) { }

	ngOnInit() {
	}

	login(){
		this._user.login(this.user).subscribe(
			res => {this.toasterService.pop("success", "", "Session Created"); this._router.navigate(['/home']); this._emitter.createSessionEvent('login')},
			err => {this.toasterService.pop("error", "", "Error Signing In");}
		);
	}

}
