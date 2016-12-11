import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../structures/structures';
import {UsersService} from '../../services/users.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'register-cmp',
	templateUrl: './register.html'
})
export class RegisterComponent implements OnInit {
	public user = new User('','','','');

	constructor(private _user: UsersService, private toasterService: ToasterService, private _router : Router ) { }

	ngOnInit() {
	}

	submit(){
		this._user.create(this.user).subscribe(
			res => {this.toasterService.pop("success", "", "User Created"); this._router.navigate(['/login'])},
			err => {this.toasterService.pop("error", "", "Error Creating User");}
		);
	}

}
