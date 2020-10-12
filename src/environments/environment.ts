// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FIREBASE_CONFIG: {
    apiKey: 'AIzaSyAP32bCH4N4MK_au7FJiyEJ2NKGb3UwdKU',
    authDomain: 'storycards-7c5ee.firebaseapp.com',
    databaseURL: 'https://storycards-7c5ee.firebaseio.com',
    projectId: 'storycards-7c5ee',
    storageBucket: 'storycards-7c5ee.appspot.com',
    messagingSenderId: '290448383604',
    appId: '1:290448383604:web:36e8c288797679d1a7bb21',
    measurementId: 'G-8QLQDBF1C1'
  },
  INDEXEDDB_CONFIG: {
    name: 'StorycardsDb',
    version: 1,
    objectStoresMeta: [{
      store: 'variables',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'value', keypath: 'value', options: { unique: false } }
      ]
    }]
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
