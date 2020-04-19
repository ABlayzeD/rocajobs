import {db} from '../../services/firebase';

function approveApplication(JobID, uid){
    var job=db.ref('/Associations/Companies/JobOpenings.'.concat(JobID));
    var applicant=db.ref
    }
    
export default removeJobFromDB;