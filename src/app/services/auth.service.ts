import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  token

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      console.log('In auth State change')
      if (user) {
        this.user = user;
        console.log('Loading client again')
        gapi.load('client', () => {
          gapi.client.init({
            apiKey: environment.firebase.apiKey,
            clientId: environment.firebase.clientId,
            discoveryDocs: environment.firebase.discoveryDocs,
            scope: environment.firebase.scopes
          }).then(() => {
            gapi.client.load('gmail', 'v1').then(() => {
              console.log('Gmail Client Loaded')
            })
          })
        });
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async logout() {
    console.log('Logging out')
    this.afAuth.signOut().then(res => {
      console.log('Logged Out')
      localStorage.removeItem('user');
    })

  }

  get isLoggedIn(): boolean {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user !== null;
  }

  async loginWithGoogle() {
    gapi.load('auth2', async () => {
      gapi.auth2.init({ client_id: environment.firebase.clientId });
      const googleAuth = gapi.auth2.getAuthInstance()
      const googleUser = await googleAuth.signIn();
      const token = googleUser.getAuthResponse().id_token;
      const credential = firebase.auth.GoogleAuthProvider.credential(token);
      let response = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
      this.user = response.user
    })
  }
}
