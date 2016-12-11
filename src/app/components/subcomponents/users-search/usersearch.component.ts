import { Component, OnInit, Input } from '@angular/core';
import {UsersService} from '../../../services/users.service';

@Component({
	selector: 'u-search-cmp',
	templateUrl: './users-search.html'
})
export class UsersSearchComponent implements OnInit {
	public users = []
	@Input() searched : string = "";

	constructor(private _users: UsersService) { 
	}

	ngOnInit() {
		this._users.getAll().subscribe(
			res => {this.users = res},
		);
	}

}
