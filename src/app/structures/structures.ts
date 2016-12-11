export class Idea{

	constructor(
		public _id: string,
		public problem: string,
		public solution: string,
		public existingSolution: string,
		public owner: string,
		public date_created: Date
	){}
}

export class Person{
	constructor(
		public _id: string,
		public email: string,
		public name: string,
		public phone: string,
		public faculty: string,
		public date_created: Date
	){}
}

export class User{
	constructor(
		public _id: string,
		public email: string,
		public firstname: string,
		public lastname: string,
		public password: string,
		public tipo: string
	){}
}

export class Folders{
	constructor(
		public _id: string,
		public name: string
	){}
}

export class Carousel{
	constructor(
		public _id: string,
		public imgurl: string,
		public description: string,
		public name: string,
	){}
}

export class Resources{
	constructor(
		public _id: string,
		public image: string,
		public url: string,
		public description: string,
		public name: string,
		public folder: Folders
	){}
}

export class Session{
	constructor(
		public _id: string,
		public token: string,
		public user: string,
		public date_created: Date
	){}
}