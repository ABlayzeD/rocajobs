import {db} from '../../services/firebase';
const algoliasearch = require('algoliasearch');

// configure algolia
const algolia = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
  const index = algolia.initIndex(process.env.ALGOLIA_JOB_OPENINGS);

function reindexFirebaseToAlgolia(){
  // Get all contacts from Firebase
  console.log("Made it...");
  db.ref('/Associations/Companies/JobOpenings').once('value', jobOpenings => {
      // Build an array of all records to push to Algolia
      const records = [];
      jobOpenings.forEach(jobopening => {
        // get the key and data from the snapshot
        const childKey = jobopening.key;
        console.log(jobopening.key);
        const childData = jobopening.val();
        // We set the Algolia objectID as the Firebase .key
        childData.objectID = childKey;
        // Add object for indexing
        records.push(childData);
      });
    
      // Add or update new objects
      index
        .saveObjects(records)
        .then(() => {
          console.log('Job openings imported into Algolia');
        })
        .catch(error => {
          console.error('Error when importing job openings into Algolia', error);
          process.exit(1);
        });
    });
}
export default reindexFirebaseToAlgolia;