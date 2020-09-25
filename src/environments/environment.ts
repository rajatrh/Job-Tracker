// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA4VbLlcO8Xex6KnvSXmz8sfGGu5Vydv3g",
    authDomain: "job-tracker-ideasmic.firebaseapp.com",
    databaseURL: "https://job-tracker-ideasmic.firebaseio.com",
    projectId: "job-tracker-ideasmic",
    storageBucket: "job-tracker-ideasmic.appspot.com",
    messagingSenderId: "428286572426",
    appId: "1:428286572426:web:18802f858f1168002cfa73",
    measurementId: "G-GT6FSK99KL",
    clientId: "428286572426-m7ea51l8bm68uom1habl16025djosn4e.apps.googleusercontent.com",
    scopes:
      "https://www.googleapis.com/auth/gmail.readonly",
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest' 
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
