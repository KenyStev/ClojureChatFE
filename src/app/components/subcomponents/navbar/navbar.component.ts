import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'nav-cmp',
  templateUrl: './navbar.html'
})
export class NavBarComponent implements OnInit {
  public hasSession : boolean;
  public searched : string = "";

  constructor(private _session: SessionService) { 
    this.hasSession = false;
  }

  ngOnInit() {
  	//$('.dropdown-toggle').dropdown()
    this.hasSession = this._session.hasSession();
  }

}
