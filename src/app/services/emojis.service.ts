import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Emoji} from '../structures/structures';

@Injectable()
export class EmojisService{
	private port = 8000;
	private url = "http://localhost";
	
	constructor (private _http: Http){
		this.url = this.url + ":"+this.port+"/emojis";
	}

	getAll(){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
  		return this._http.get(this.url, {headers: headers})
  			.map(res => {return res.json()})
	}

	create(emoji : Emoji){
		return Observable.fromPromise(
    		new Promise((resolve, reject) => {

    			let xhr = new XMLHttpRequest();
		    	let params = new FormData();
				params.append('name', emoji.name);
				params.append('image', emoji.img, emoji.img.name);

				xhr.onreadystatechange = function () {
		            if (xhr.readyState === 4) {
		                if (xhr.status === 200) {
		                    resolve(xhr.response)
		                } else {
		                    reject(xhr.response)
		                }
		            }
		        }

				xhr.open("POST", this.url + '/upload', true);
				xhr.send(params);

    		})
    	).map(res => {return res});
	}

	delete(name: string){

	}
}