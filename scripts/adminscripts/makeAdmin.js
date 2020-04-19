import {db} from '../../services/firebase';

function makeAdmin(uid,searchCommittee){
    db.ref('/Admins/').push(uid).set({
            uid: uid,
            SearchComittee: searchCommittee
        });
    }
    
export default makeAdmin;