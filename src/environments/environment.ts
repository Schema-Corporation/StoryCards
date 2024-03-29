// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: "https://pharmaapp-services-be.com",
  apiUrl: "http://storycards-backend.us-west-2.elasticbeanstalk.com",
  wsServer: "ws://storycards-backend.us-west-2.elasticbeanstalk.com",
  //wsServer: "ws://story-cards-be-dev.us-west-2.elasticbeanstalk.com",
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
