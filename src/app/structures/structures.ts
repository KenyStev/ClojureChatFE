export class User{
	constructor(
		public email: string,
		public username: string,
		public password: string,
		public realname: string
		){
	}
}

export class Message{
	constructor(
		public id: string,
		public from_who: string,
		public to_who: string,
		public message: string,
		public sent: Date,
		public type: string
	){}
}

export class Friend{
	constructor(
		public id: string,
		public user: User,
		public since: Date
		){}
}

export class Friendship{
	constructor(
		public id: string,
		public user_id1: string,
		public user_id2: string,
		public since: Date
		){}
}

export class Room{
	constructor(
		public name : string
		){}
}

export class newRoom{
	constructor(
		public admin: string,
		public room: Room
		){}
}

export class MemberRoom{
	constructor(
		public room_id: string,
		public user_id: string,
		public is_admin = false
		){}
}

export class MessageImage{
	constructor(
		public img: File,
		public from_who : string,
		public to_who : string,
		public sent : Date,
		public type : string
		){}
}

export class Emoji{
	constructor(
		public name : string,
		public img : File
		){}
}