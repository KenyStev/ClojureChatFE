import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../structures/structures';

@Injectable()
export class SessionService{

	session: User = new User('','','','');
	
	constructor(){
		var session = JSON.parse(sessionStorage.getItem('token'));
		if(session)
			this.session = session;
	}

	setSession(session: User){
		this.session = session;
		sessionStorage.setItem('token', JSON.stringify(session));
	}

	getSession(){
		var session = JSON.parse(sessionStorage.getItem('token'));
		if(session)
			this.session = session;
		else
			this.session = new User('','','','');
		return this.session;
	}

	deleteSession(){
		sessionStorage.removeItem('token');
		this.session = new User('','','','');
	}

	hasSession(){
		return this.getSession().email != "";
	}
}