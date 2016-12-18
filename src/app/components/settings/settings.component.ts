import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {User} from '../../structures/structures';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'settings-cmp',
	templateUrl: './settings.html'
})
export class SettingsComponent implements OnInit {
	public model : User;
	public img = "";
	public originalEmail = "";
	public imgUrl = "";
	public newImg : File;

	constructor(private _users: UsersService, private _session: SessionService, private _toaster : ToasterService, private _router: Router) { 
		this.model = new User('','','','');
	}

	ngOnInit() {
		this._users.getUser(this._session.getSession().email).subscribe(
			res => {this.model = res; this.originalEmail = this.model.email;this.imgUrl = "http://localhost:8000/profile-picture/" + this.originalEmail;}
		);
	}

	updateProfile(){
		this._users.update(this.originalEmail, this.model).subscribe(
			res => {
				this.originalEmail = this.model.email; 
				this._toaster.pop("success", "", "Profile Updated")
			},
			err => {this._toaster.pop("error", "", "Error updating profile")}
		);
	}

	updateProfilePicture(){
		//alert(this.newImg);
		this._users.updateProfileImage(this.originalEmail, this.newImg).subscribe(
			res => {window.location.reload()},
			err => {alert(err)}
		);
	}

}
