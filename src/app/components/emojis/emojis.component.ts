import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {EmojisService} from '../../services/emojis.service';
import {Emoji} from '../../structures/structures';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'emojis-cmp',
	templateUrl: './emojis.html'
})
export class EmojisComponent implements OnInit {
	public img : string = "";
	public model : Emoji;
	public emojis = [];

	constructor(private _session: SessionService, private _toaster : ToasterService, 
		private _router: Router, private _emojis : EmojisService) { 
		this.model = new Emoji("", null);
	}

	ngOnInit() {
		this._emojis.getAll().subscribe(
			res => {this.emojis = res}
		);
	}

	setImage(img){
		this.model.img = img;
		this.img = img.name;
	}

	createEmoji(){
		if(this.model.img == null) return;
		this._emojis.create(this.model).subscribe(
			res => {
				this._toaster.pop("success","","Emoji created");
				this.ngOnInit();
				this.model = new Emoji("", null);
			},
			err => {this._toaster.pop("error","","Error creating Emoji")}
		);
	}
}
