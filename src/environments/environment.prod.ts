export const environment = {
  production: true,
  apiUrl: "https://pharmaapp-services-be.com",
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
