import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {
  nextPageToken = null
  emails = []
  applications = []
  constructor() { }
}
