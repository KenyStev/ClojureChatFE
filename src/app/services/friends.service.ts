import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {EventsEmitter} from './event-emitter.service';
import {Friend, User, Friendship} from '../structures/structures';

@Injectable()
export class FriendsService{
	private port = 8000;
	private url = "http://localhost";
	
	constructor (private _http: Http, private _emitter : EventsEmitter){
		this.url = this.url + ":"+this.port+"/friends";
	}

	getAll(email: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.url + "/from/" + email, {headers: headers})
  			.map(res => {return res.json()})
	}

	create(relation: Friendship){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(relation);
		return this._http.post(this.url, params, {headers: headers})
			.map(res => {this.emitEvent("create");return res.json()});
	}

	private emitEvent(evento: string){
		this._emitter.createFriendEvent(evento);
	}

	delete(id: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + "/" + id, {headers: headers})
			.map(res => {this.emitEvent("delete");return res.json()});
	}
}