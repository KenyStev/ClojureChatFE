import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'nav-cmp',
  templateUrl: './navbar.html'
})
export class NavBarComponent implements OnInit {
  public hasSession : boolean;
  public searched : string = "";
  public user_email : string = "";

  constructor(private _session: SessionService) { 
    this.hasSession = false;
  }

  ngOnInit() {
  	//$('.dropdown-toggle').dropdown()
    this.hasSession = this._session.hasSession();
    if(this.hasSession)
      this.user_email = this._session.getSession().email;
  }

  salir(){
    let timeoutId = setTimeout(() => {  
      this.searched = "";
    }, 200);
    //this.searched = "";
  }

}
