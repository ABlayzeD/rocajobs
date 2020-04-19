import {auth, db, storage} from '../services/firebase'

const anyFileParser=require('anyfileparser');

async function getKeywords(){
    storageRef=storage.ref(auth.currentUser.uid.concat("/resume/resume"))
    let applicantRef = await db.ref("Associations/Companies/JobOpenings/Applicants/"
    .concat(auth.currentUser.uid)).once('value')
    .then(function(snapshot){
        allKeywords="";
        resume=snapshot.val().ResumeKeywords.split(",");
        interests=snapshot.val().AreasOfInterest.split(",");
        if(resume!=null){
          resume.forEach(function(keyword){
            allKeywords.concat(keyword).concat(" ");
          })
        }
        if(interests!=null){
          interests.forEach(function(keyword){
            allKeywords.concat(keyword).concat(" ");
          })
        }
    });
    applicantRef.set({
      AllKeywords: allKeywords
    })
  }
  export default getKeywords;