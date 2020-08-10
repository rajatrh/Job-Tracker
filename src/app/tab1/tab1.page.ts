import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { GmailService } from '../services/gmail.service';
import { ApplicationDataService } from '../services/application-data.service';

declare var gapi: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  loading = true
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  showSignIn = true

  constructor(private authService: AuthService,
    public applicationDataService: ApplicationDataService,
    private gmailService: GmailService) {
    this.showSignIn = !authService.isLoggedIn
  }

  ngOnInit(): void {
    // Wait till all the API libs load

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
