import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Room, newRoom, MemberRoom} from '../structures/structures';

@Injectable()
export class RoomsService{
	private port = 8000;
	private url = "http://localhost";
	private baseurl = this.url + ":" + this.port;
	
	constructor (private _http: Http){
		this.url = this.url + ":"+this.port+"/rooms";
	}

	getAllMyCreatedRooms(email: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.baseurl + "/users/" + email + "/my-rooms", {headers: headers})
  			.map(res => {return res.json()})
	}

	getAllMyRooms(email: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.baseurl + "/users/" + email + "/rooms", {headers: headers})
  			.map(res => {return res.json()})
	}

	create(room: newRoom){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(room);
		console.log(params);
		return this._http.post(this.url + "/new", params, {headers: headers})
			.map(res => {return res.json()});
	}

	delete(id: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + "/" + id, {headers: headers})
			.map(res => {return res.json()});
	}

	addMember(MemberRoom){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		let params = JSON.stringify(MemberRoom);
  		console.log(params);
  		return this._http.post(this.url + "-users", params, {headers: headers})
			.map(res => {return res.json()});
	}

	getMembers(room: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.url + "/" + room + "/all-users", {headers: headers})
  			.map(res => {return res.json()})
	}


	deleteMember(id: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + "-users/" + id, {headers: headers})
			.map(res => {return res.json()});
	}

}