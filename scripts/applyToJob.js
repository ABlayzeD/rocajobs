import {auth, db} from '../services/firebase';

function applyToJob(JobID, currentEmployeeFlag){
    var error;
    if(auth.currentUser===null){
        return;
    }
    var typeOfApplicant="Applicant"
    if(currentEmployeeFlag===1){
        typeOfApplicants="Employee"
    }
    var userApplicationsListRef=db.ref("/Associations/Companies/".concat(typeOfApplicant)
        .concat("s/").concat(auth.currentUser.uid));
    var jobApplicationsListRef=db.ref("/Associations/Companies/JobOpenings/".concat(JobID));

    error=userApplicationsListRef.once("value", function(snapshot){
        console.log(snapshot.val());
        if(snapshot.val()===null) return;
        var userApplicationsList=snapshot.val().Applications;
        var userApplicationsListAsArray=userApplicationsList.split(',');
        console.log(userApplicationsListAsArray);
        if(userApplicationsListAsArray.includes(auth.currentUser.uid)){
            return "You already applied!"
        }
        else if(userApplicationsListAsArray.length>20){
            return "You've reached your maximum number of pending applications!"
        }
        else{
            userApplicationsListRef.update({
                "Applications": userApplicationsList.concat(JobID).concat(",")
            })
            return "You applied!";
        }
    });
    
    error=jobApplicationsListRef.once("value", function(snapshot){
        console.log(snapshot.val());
        if(snapshot.val()===null) return;
        var jobApplicationsList=snapshot.val().Applications;
        var jobApplicationsListAsArray=jobApplicationsList.split(',');
        if(jobApplicationsListAsArray.includes(JobID)){
            return "You already applied!"
        }
        else if(jobApplicationsListAsArray.length > 99){
            return "This job has too many applications!"
        }
        else{
            jobApplicationsListRef.update({
                "Applications": jobApplicationsList.concat(auth.currentUser.uid).concat(",")
            })
            return "You applied!";
        }
    });
    return error;
        
        
    
}
export default applyToJob;