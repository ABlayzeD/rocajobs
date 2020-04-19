import {db} from '../../../services/firebase';
const algoliasearch = require('algoliasearch');

// configure algolia
const algolia = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
const index = algolia.initIndex("ADMINS");

function reindexAdminsFirebaseToAlgolia(){
  // Get all contacts from Firebase
  db.ref('/Admins').once('value', admins => {
      // Build an array of all records to push to Algolia
      const records = [];
      admins.forEach(admin => {
        // get the key and data from the snapshot
        const childKey = admin.key;
        const childData = admin.val();
        // We set the Algolia objectID as the Firebase .key
        childData.objectID = childKey;
        // Add object for indexing
        records.push(childData);
      });
    
      // Add or update new objects
      index
        .replaceAllObjects(records)
        .then(() => {
          console.log('Admins imported into Algolia');
        })
        .catch(error => {
          console.error('Error when importing admins into Algolia', error);
          process.exit(1);
        });
    });
}
export default reindexAdminsFirebaseToAlgolia;