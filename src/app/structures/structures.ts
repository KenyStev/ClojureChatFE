export class User{
	constructor(
		public id: string,
		public email: string,
		public username: string,
		public password: string,
		public realname: string
		){
	}
}

export class Session{
	constructor(
		public id: string,
		public username: string,
		public email: string,
		public password: string,
		public realname: string
	){}
}