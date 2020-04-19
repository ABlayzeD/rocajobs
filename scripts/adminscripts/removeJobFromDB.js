import {db} from '../../services/firebase';

function removeJobFromDB(JobID){
    db.ref('/Associations/Companies/JobOpenings.'.concat(JobID)).remove();
    }
    
export default removeJobFromDB;