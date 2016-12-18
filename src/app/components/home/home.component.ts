import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
	public hasSession : boolean = false;
  constructor(private _session: SessionService) { }

  ngOnInit() {
  	this.hasSession = this._session.hasSession();
  }

}
