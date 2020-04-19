import {db} from '../../services/firebase';

function deleteAdmin(uid){
    db.ref('/Admins/'.concat(uid)).remove();
    console.log('/admins/'.concat(uid));
}
    
export default deleteAdmin;