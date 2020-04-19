import {db} from '../../../services/firebase';
const algoliasearch = require('algoliasearch');

// configure algolia
const algolia = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
  const index = algolia.initIndex(process.env.ALGOLIA_JOB_OPENINGS);

function clientSideJobReindexFirebaseToAlgolia(){
  // Get all contacts from Firebase
  db.ref('/Associations/Companies/JobOpenings').once('value', jobOpenings => {
      // Build an array of all records to push to Algolia
      const records = [];
      jobOpenings.forEach(jobopening => {
        // get the key and data from the snapshot
        var childKey = jobopening.key;
        var childData = jobopening.val();
        console.log(childKey);
        if(childData.status!="Closed" && childKey!="SearchCommittees" && childKey!="Applicants"
        && !Array.isArray(childData)){
          // We set the Algolia objectID as the Firebase .key
          childData.objectID = childKey;
          // Add object for indexing
          records.push(childData);
        }
        childKey= null;
        childData=null;
      });
    
      // Add or update new objects
      index
        .replaceAllObjects(records)
        .then(() => {
          console.log('(Client) Job openings imported into Algolia');
        })
        .catch(error => {
          console.error('Error when importing job openings into Algolia', error);
        });
        index.setSettings({
          attributesForFaceting: ['Salary', 'LevelEducation', 'State']
        })
    });
}
export default clientSideJobReindexFirebaseToAlgolia;