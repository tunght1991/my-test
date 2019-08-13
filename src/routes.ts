import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { ChatRoomComponent } from './app/chat-room/chat-room.component';
import { MailBoxComponent } from './app/mail-box/mail-box.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'chat', component: ChatRoomComponent },
    { path: 'mailbox', component: MailBoxComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];