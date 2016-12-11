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
		public sent: Date
	){}
}