import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HomeComponent } from './components/home/home.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import {NavBarComponent} from './components/subcomponents/navbar/navbar.component';
import {MessagesStandComponent} from './components/subcomponents/messages_stand/messages_stand.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UsersSearchComponent} from './components/subcomponents/users-search/usersearch.component';
import {NewMessagesComponent} from './components/subcomponents/new_message/new_message.component';
import {RoomsComponent} from './components/rooms/rooms.component';
import {EmojisComponent} from './components/emojis/emojis.component';
//import {} from './components/.component';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import {EventsEmitter} from './services/event-emitter.service';
import {UsersService} from './services/users.service';
import {SessionService} from './services/session.service';
import {MessagesService} from './services/messages.service';
import {FriendsService} from './services/friends.service';
import {RoomsService} from './services/rooms.service';
import {EmojisService} from './services/emojis.service';

//import {} from './services/.service';

import {FilterArrayPipeExactly} from './pipes/filter/filter.component';
import {OrderBy} from './pipes/sortby/orderby.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ChatroomComponent,
    LoginComponent,
    RegisterComponent,
    MessagesStandComponent,
    FilterArrayPipeExactly,
    ProfileComponent,
    SettingsComponent,
    UsersSearchComponent,
    NewMessagesComponent,
    RoomsComponent,
    EmojisComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    EventsEmitter,
    ToasterService,
    SessionService,
    UsersService,
    MessagesService,
    FriendsService,
    RoomsService,
    EmojisService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}

}

