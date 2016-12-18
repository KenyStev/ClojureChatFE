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

	getAll(){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.url, {headers: headers})
  			.map(res => {return res.json()})
	}

	getUser(email: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.url + "/" + email, {headers: headers})
  			.map(res => {return res.json()})
	}

	login(user: User){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(user);
		return this._http.post(this.url + "/login", params, {headers: headers})
			.map(res => {this.session.setSession(res.json());return res.json()});
	}

	create(user: User){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(user);
		return this._http.post(this.url, params, {headers: headers})
			.map(res => {return res.json()});
	}

	update(id: string, user: User){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(user);
		return this._http.put(this.url + "/" + id, params, {headers: headers})
			.map(res => {return res.json()});
	}

	delete(id: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + "/" + id, {headers: headers})
			.map(res => {return res.json()});
	}
    
    getMyChats(email: string){
    	let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get('http://localhost:8000/chats/' + email, {headers: headers})
  			.map(res => {return res.json()})
    }

    updateProfileImage(email: string, img: File){
    	return Observable.fromPromise(
    		new Promise((resolve, reject) => {

    			let xhr = new XMLHttpRequest();
		    	let params = new FormData();
				params.append('email', email);
				params.append('profileImage', img, img.name);

				xhr.onreadystatechange = function () {
		            if (xhr.readyState === 4) {
		                if (xhr.status === 200) {
		                    resolve(xhr.response)
		                } else {
		                    reject(xhr.response)
		                }
		            }
		        }

				xhr.open("POST", 'http://localhost:8000/user/update-picture', true);
				xhr.send(params);

    		})
    		).map(res => {return res});
    }
}