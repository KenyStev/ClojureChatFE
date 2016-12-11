import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';


import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'chatroom',  component: ChatroomComponent },
  { path: '**', redirectTo: 'home'}
];
