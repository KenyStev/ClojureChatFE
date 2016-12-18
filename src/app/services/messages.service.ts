import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Message, MessageImage} from '../structures/structures';

@Injectable()
export class MessagesService{
	private port = 8000;
	private url = "http://localhost";
	
	constructor (private _http: Http){
		this.url = this.url + ":"+this.port+"/messages";
	}

    getMessagesBetween(user1: string, user2: string){
    	if(user2 == "none")
    		return Observable.of(null);
        let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
        return this._http.get(this.url + "/between/" + user1 + "/" + user2, {headers: headers})
            .map(res => {return res.json()});
    }

    getRoomsMessages(room: string){
    	let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
        return this._http.get(this.url + "/from/room/" + room , {headers: headers})
            .map(res => {return res.json()});
    }

	create(message: Message){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(message);
		console.log(params);
		return this._http.post(this.url, params, {headers: headers})
			.map(res => {return res});
	}

	update(id: string, message: Message){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var params = JSON.stringify(message);
		return this._http.put(this.url + "/" + id, params, {headers: headers})
			.map(res => {return res});
	}

	delete(id: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + "/" + id, {headers: headers})
			.map(res => {return res});
	}

	sendImage(msg : MessageImage){
		return Observable.fromPromise(
    		new Promise((resolve, reject) => {

    			let xhr = new XMLHttpRequest();
		    	let params = new FormData();
				params.append('from_who', msg.from_who);
				params.append('to_who', msg.to_who);
				params.append('imageMsg', msg.img, msg.img.name);
				params.append('sent', msg.sent.toISOString());
				params.append('type', msg.type);

				xhr.onreadystatechange = function () {
		            if (xhr.readyState === 4) {
		                if (xhr.status === 200) {
		                    resolve(xhr.response)
		                } else {
		                    reject(xhr.response)
		                }
		            }
		        }

				xhr.open("POST", this.url + '/with-image', true);
				xhr.send(params);

    		})
    	).map(res => {return res});
	}
    
}