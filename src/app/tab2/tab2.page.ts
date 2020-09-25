import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { GmailService } from '../services/gmail.service';
import { ApplicationDataService } from '../services/application-data.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

declare var gapi: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  loading = true
  user = new Observable<any[]>();
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  showSignIn = true
  constructor(private authService: AuthService,
    private firestore: AngularFirestore,
    public applicationDataService: ApplicationDataService,
    private gmailService: GmailService) {
    this.showSignIn = !authService.isLoggedIn

    this.user = firestore.collection('student', ref => ref.where('email', '==', 'rajat.hande@stonybrook.edu')).valueChanges();

    this.user.subscribe(d => {
      console.log(d);
    })
  }

  ngOnInit(): void {
    
  }

  async process_signin() {
    await this.authService.loginWithGoogle()
    this.showSignIn = false
  }

  async loadGmailApi() {
    await this.gmailService.displayInbox()
    console.log(this.applicationDataService.applications.length)
    this.loading = false
  }

   async doInfinite(event) {
     await this.gmailService.displayInbox()
     console.log(this.applicationDataService.applications.length)
     event.target.complete();
     if (this.applicationDataService.applications.length > 40) {
      event.target.disabled = true;
    }
  }
}
