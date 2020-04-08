import {auth, db} from '../services/firebase';

function applyToJob(JobID, currentEmployeeFlag){
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

    userApplicationsListRef.once("value", function(snapshot){
        if(snapshot.val()===null) return;
        var userApplicationsList=snapshot.val().Applications;
        var userApplicationsListAsArray=userApplicationsList.split(',');
        if(userApplicationsListAsArray.includes(JobID)){
            return "You already applied!"
        }
        else if(userApplicationsListAsArray.length>20){
            return "You've reached your maximum number of pending applications!"
        }
        else{
            userApplicationsListRef.update({
                "Applications": userApplicationsList.concat(JobID).concat(",")
            })
            userApplicationsListRef.once("value", function(snapshot){
                console.log(snapshot.val());
            })
            return "You applied!";
        }
    });
    
    jobApplicationsListRef.once("value", function(snapshot){
        if(snapshot.val()===null) return;
        var jobApplicationsList=snapshot.val().Applications;
        var jobApplicationsListAsArray=jobApplicationsList.split(',');
        if(jobApplicationsListAsArray.includes(auth.currentUser.uid)){
            return "You already applied!"
        }
        else if(jobApplicationsListAsArray.length > 100){
            return "This job has too many applications!"
        }
        else{
            jobApplicationsListRef.update({
                "Applications": jobApplicationsList.concat(auth.currentUser.uid).concat(",")
            })
            jobApplicationsListRef.once("value", function(snapshot){
                console.log(snapshot.val());
            })
            return "You applied!";
        }
    });

        
    
}
export default applyToJob;