import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RoomsComponent} from './components/rooms/rooms.component';
import {EmojisComponent} from './components/emojis/emojis.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'chatroom',  component: ChatroomComponent },
  { path: 'settings',  component: SettingsComponent },
  { path: 'rooms',  component: RoomsComponent },
  { path: 'emojis',  component: EmojisComponent },
  { path: 'profile/:email',  component: ProfileComponent },
  { path: '**', redirectTo: 'home'}
];
