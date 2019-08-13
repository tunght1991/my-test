import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  messagesCollection: AngularFirestoreCollection<ChatMessage>;
  messages: Observable<ChatMessage[]>;
  userName: Observable<string>;

  constructor(
    private adb: AngularFireDatabase,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.messagesCollection = this.db.collection<ChatMessage>('chatMessage', ref => ref.orderBy('timeSent'));
    this.messages = this.messagesCollection.valueChanges();
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  getUser() {
    return;
  }

  getUsers() {
    const path = '/users';
    return this.adb.list(path);
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(message: string) {
    const chatMessage: ChatMessage = {
      message,
      email: this.user.email,
      timeSent: new Date(),
      userName: this.user.providerData[0].uid
    };
    this.messagesCollection.add(chatMessage);
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                  (now.getUTCMonth() + 1) + '/' +
                  now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                now.getUTCMinutes() + ':' +
                now.getUTCSeconds();
    return (date + ' ' + time);
  }
}
