let dbPromise = idb.openDB('football-live', 1, {
    upgrade(db) {
        let fixturesObjectStore = db.createObjectStore('fixtures', {
            keyPath: 'id'
        });
        fixturesObjectStore.createIndex('status', 'status', {unique: false});
    }
});