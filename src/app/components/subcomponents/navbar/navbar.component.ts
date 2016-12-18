import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {EventsEmitter} from '../../../services/event-emitter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'nav-cmp',
  templateUrl: './navbar.html'
})
export class NavBarComponent implements OnInit {
  public hasSession : boolean;
  public searched : string = "";
  public user_email : string = "";

  constructor(private _session: SessionService, private _router: Router, private _emitter : EventsEmitter) { 
    this.hasSession = false;
  }

  ngOnInit() {
  	//$('.dropdown-toggle').dropdown()
    this.hasSession = this._session.hasSession();
    if(this.hasSession)
      this.user_email = this._session.getSession().email;
    this._emitter.getSessionEvents().subscribe(
      change => {
        this.hasSession = this._session.hasSession();
        if(this.hasSession)
          this.user_email = this._session.getSession().email;
      }
      );
  }

  salir(){
    let timeoutId = setTimeout(() => {  
      this.searched = "";
    }, 200);
    //this.searched = "";
  }

  logout(){
    this._session.deleteSession();
    this._router.navigate(['/home']);
    this.hasSession = this._session.hasSession();
    window.location.reload();
  }

}
