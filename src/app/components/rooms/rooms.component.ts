import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {RoomsService} from '../../services/rooms.service';
import {FriendsService} from '../../services/friends.service';
import {User, Room, newRoom, MemberRoom} from '../../structures/structures';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'rooms-cmp',
	templateUrl: './rooms.html'
})
export class RoomsComponent implements OnInit {
	public myRooms = [];
	public myCreatedRooms = [];
	public model : newRoom;
	public friends = [];
	public members = [];

	public currentModel : MemberRoom;

	constructor(private _users: UsersService, private _session: SessionService, private _toaster : ToasterService, 
		private _router: Router, private _rooms: RoomsService, private _friends: FriendsService) { 
		this.currentModel = new MemberRoom("","");
	}

	ngOnInit() {
		this.model = new newRoom('',new Room(""));
		this._rooms.getAllMyCreatedRooms(this._session.getSession().email).subscribe(
			res => {this.myCreatedRooms = res;}
		);
		this._rooms.getAllMyRooms(this._session.getSession().email).subscribe(
			res => {this.myRooms = res;}
		);
		this._friends.getAll(this._session.getSession().email).subscribe(
			res => {this.friends = res}
			);
	}

	createRoom(){
		this.model.admin = this._session.getSession().email;
		this._rooms.create(this.model).subscribe(
			res => {this._toaster.pop("success", "", "Room created"); this.ngOnInit()},
			err => {this._toaster.pop("error", "", "Error creating room")}
		);
	}

	showRoom(room: string){
		this.currentModel.room_id = room;
		this._rooms.getMembers(room).subscribe(
			res => {this.members = res}
			);
		document.getElementById('showRoomModal').click();
	}

	addMember(user_id: string){
		this.currentModel.user_id = user_id;
		this._rooms.addMember(this.currentModel).subscribe(
			res => {
				this._toaster.pop("success", "", "Member added");
				this._rooms.getMembers(this.currentModel.room_id).subscribe(
					res => {this.members = res}
					);
			},
			err => {this._toaster.pop("error", "", "Error adding member");}
			);
	}

	notMember(realname: string){
		for (var i = 0; i < this.members.length; i++) {
			if(realname == this.members[i].realname)
				return false;
		}
		return true;
	}

	deleteMember(user_id: string, id: string){
		if (user_id == this._session.getSession().email) return;
		if(!confirm("Delete member with email " + user_id + "?")) return;
		this._rooms.deleteMember(id).subscribe(
			res => {
				this._toaster.pop("success", "", "Member deleted");
				this._rooms.getMembers(this.currentModel.room_id).subscribe(
					res => {this.members = res}
					);
		},
			err => {this._toaster.pop("error", "", "Error deleting member");}
		);
	}

}
