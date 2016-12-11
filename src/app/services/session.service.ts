import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Session} from '../structures/structures';

@Injectable()
export class SessionService{

	session: Session = new Session('','','', new Date());
	
	constructor(){
		var session = JSON.parse(sessionStorage.getItem('token'));
		if(session)
			this.session = session;
	}

	setSession(session: Session){
		this.session = session;
		sessionStorage.setItem('token', JSON.stringify(session));
	}

	getSession(){
		var session = JSON.parse(sessionStorage.getItem('token'));
		if(session)
			this.session = session;
		else
			this.session = new Session('','','',new Date());
		return this.session;
	}

	deleteSession(){
		sessionStorage.removeItem('token');
		this.session = new Session('','','',new Date());
	}
}