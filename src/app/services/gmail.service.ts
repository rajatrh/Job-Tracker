import { Injectable } from '@angular/core';
import { ApplicationDataService } from './application-data.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})

export class GmailService {

  constructor(private applicationDataService: ApplicationDataService) {
  }

  async displayInbox() {

    var options = {
      'userId': 'me',
      'labelIds': 'INBOX',
      'maxResults': 12
    }
    if (this.applicationDataService.nextPageToken) {
      options['pageToken'] = this.applicationDataService.nextPageToken;
    }
    let messageIds = []
    let result = await gapi.client.gmail.users.messages.list(options)
    result.result.messages.forEach(m => {
      messageIds.push(m.id)
    })
    if (result.result.nextPageToken) {
      this.applicationDataService.nextPageToken = result.result.nextPageToken; // Get the next page next time
    } else {
      console.log('No more pages left!');
    }
    await this.getMessages(messageIds)
  }

  async getMessages(messageIds) {
    for (let id of messageIds) {
      let mail = await gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': id,
        'format': 'full'
      })
      this.processEmail(mail)
    }
  }

  processEmail(email) {
    try {
      let processedEmail = {
        from: this.getValueFromHeader(email['result']['payload']['headers'], 'From'),
        subject: this.getValueFromHeader(email['result']['payload']['headers'], 'Subject'),
        snippet: email['result']['snippet']
      }
  
      processedEmail['fromDomain'] = processedEmail.from.split('@')[1].split('.')[0]
      console.log(processedEmail)
      this.applicationDataService.applications.push(processedEmail)
    } catch(x) {
      return
    }
  }


  getValueFromHeader(headers, key) {
    console.log(headers)
    return headers.filter(header => {
      return header['name'] == key
    })[0]?.value
  }
}
