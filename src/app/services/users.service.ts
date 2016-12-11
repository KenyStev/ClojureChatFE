import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {User} from '../structures/structures';
import {SessionService} from './session.service';

@Injectable()
export class UsersService{
	private port = 8000;
	private url = "http://localhost";
	private session: SessionService;
	
	constructor (private _http: Http){
		this.url = this.url + ":"+this.port+"/users";
		this.session = new SessionService();
	}

	login(user: User){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(user);
		return this._http.post(this.url + "/login", params, {
		headers: headers
		})
			.map(res => {this.session.setSession(res.json());});
	}
    
}