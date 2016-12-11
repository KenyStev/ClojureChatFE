import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  template: `<h1>Hello Clojure Chat</h1>
  			 <i class="fa fa-address-book" aria-hidden="true"></i>
  			`
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
