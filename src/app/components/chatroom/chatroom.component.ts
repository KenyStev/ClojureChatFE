import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'chatroom-cmp',
	templateUrl: './chatroom.html'
})
export class ChatroomComponent implements OnInit {
	public users = [];

	constructor() { }

	ngOnInit() {
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
		this.users.push("Nexer");
	}

}
