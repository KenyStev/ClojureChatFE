import {Injectable, EventEmitter} from "@angular/core";
import {Component} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventsEmitter{
	private sessionChange: Subject<string> = new Subject<string>();
	private toChange: Subject<string> = new Subject<string>();

	private friendsChange: Subject<string> = new Subject<string>();
	
	constructor(){

	}

	createSessionEvent(name: string){
		this.sessionChange.next(name);
	}

	getSessionEvents() : Observable<string>{
		return this.sessionChange.asObservable();
	}

	createToEvent(name: string){
		this.toChange.next(name);
	}

	getToEvent(){
		return this.toChange.asObservable();
	}

	createFriendEvent(name: string){
		this.friendsChange.next(name);
	}

	getFriendsEvents(){
		return this.friendsChange.asObservable();
	}
}