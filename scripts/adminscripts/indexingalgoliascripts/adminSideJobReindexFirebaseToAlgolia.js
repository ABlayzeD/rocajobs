import {db} from '../../../services/firebase';
const algoliasearch = require('algoliasearch');

function adminSideJobReindexFirebaseToAlgolia(searchCommittee_ID){
    const algolia = algoliasearch(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_API_KEY
      );
    const index = algolia.initIndex("SearchCommittee".concat(searchCommittee_ID).concat(" Jobs"));
  // Get all contacts from Firebase
    db.ref('/Associations/Companies/JobOpenings').once('value', jobOpenings => {
        // Build an array of all records to push to Algolia
        const records = [];
        jobOpenings.forEach(jobopening => {
        
        if(jobopening.val().SearchCommittee_ID_FK==searchCommittee_ID){
            // get the key and data from the snapshot
            var childKey = jobopening.key;
            var childData = jobopening.val();
            if(childData.status!="Closed" && childKey!="SearchCommittees" && childKey!="Applicants"
            && !Array.isArray(childData)) {
                // We set the Algolia objectID as the Firebase .key
                childData.objectID = childKey;
                // Add object for indexing
                records.push(childData);
              }
            //delete previous data
            childKey= null;
            childData=null;
        }
    });

        // Add or update new objects
        index
        .replaceAllObjects(records)
        
        .then(() => {
            console.log('(Admin) Job openings imported into Algolia');
        })
        .catch(error => {
            console.log('Error when importing job openings into Algolia', error);
        });
        index.setSettings({
            attributesForFaceting: ['Salary', 'LevelEducation', 'State']
        })
    });
}
export default adminSideJobReindexFirebaseToAlgolia;