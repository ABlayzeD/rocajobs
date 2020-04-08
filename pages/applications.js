import React from 'react';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { List } from 'antd';
import {auth, db} from '../services/firebase';

function getUserApplicationsAsArray(currentEmployeeFlag){
  var typeOfApplicant="Applicant"
  if(currentEmployeeFlag===1){
      typeOfApplicants="Employee"
  }
  var userApplicationsListRef=db.ref("/Associations/Companies/".concat(typeOfApplicant)
      .concat("s/").concat(auth.currentUser.uid));

  return userApplicationsListRef.once("value", function(snapshot){
      if(snapshot.val()===null) return;
      var userApplicationsList=snapshot.val().Applications;
      if(userApplicationsList===""){
        return;
      }
      var userAppsArray=userApplicationsList.split(',');
      var data={};
      userAppsArray.forEach(JobID => {
        var jobApplicationsListRef=db.ref("/Associations/Companies/JobOpenings/".concat(JobID));
        jobApplicationsListRef.once("value", function(snapshot){
          if(snapshot.val()===null) return;
          var job=snapshot.key;
          var jobTitle=snapshot.val().title;
          var jobDesc=snapshot.val().Description;
          console.log(job)
          if(job=="JobOpenings") return;
          data[job]={title: jobTitle, desc: jobDesc}
          console.log(data);
        });
    });
  });
}


export default function Applications() {
    const data=getUserApplicationsAsArray(0);
    return (
      <Container>
        <Header />
          <List
          dataSource={data}
          itemLayout="horizontal"
          className="my-list"
          renderItem={item => (
            <List.Item 
              title={item.title}
              description={item.desc}>
            </List.Item>
          )}
          />
        <Footer />
      </Container>
    );
  }