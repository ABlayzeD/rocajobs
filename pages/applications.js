import React, {PureComponent} from 'react';
import Footer from '../components/layout/user/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/user/Header';
import { List } from 'antd';
import {auth, db} from '../services/firebase';

export default class Applications extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      loading: true,
      applications: null
    }
  }
  async componentDidMount(){
    let auth = await this.checkAuth();
    let applications = await this.getUserApplicationsAsArray();
    await new Promise(resolve =>{setTimeout(resolve, 100);})
    this.setState({loading: !auth, applications: applications});
  }
  async checkAuth(){
      var user = auth.currentUser;
      if(user!=null){
        return true;
      }
      else{
        return false
      }
  }
  async getUserApplicationsAsArray(){
    return db.ref("/Associations/Companies/JobOpenings/Applicants/".concat(auth.currentUser.uid))
      .once("value").then(function(snapshot){
        if(snapshot.val()===null) return [];
        var userApplicationsList=snapshot.val().Applications;
        if(userApplicationsList===""){
          return [];
        }
        var userAppsArray=userApplicationsList.split(',');
        userAppsArray.pop();
        var data=Array();
        var index=0;
        userAppsArray.forEach(JobID => {
          var jobApplicationsListRef=db.ref("/Associations/Companies/JobOpenings/".concat(JobID));
          jobApplicationsListRef.once("value", function(snapshot){
            var job=snapshot.key;
            var jobTitle=snapshot.val().title;
            var jobDesc=snapshot.val().Description;
            if(job!="SearchCommittees" && job!="Applicants" && snapshot.val()!=null)
              data.push({title: jobTitle, desc: jobDesc});
              index++;
          });
      });
      return data;
    });
  }
  render(){
    const applicationsloading=(this.state.applications==null);
    console.log(applicationsloading);
    if(!auth){
      return (
        <div>
            Loading...
        </div>
        )
    }
    if(applicationsloading){
      return (
        <Container>
          <Header />
            <List
            header="Applications"
            itemLayout="horizontal"
            loading={true}
            />
          <Footer />
        </Container>
      );
    }
    if(auth && !applicationsloading){
      console.log("HUH");
      const applications=Array.from(this.state.applications);
      if(applications!=null){
        applications.forEach((item) =>{
          console.log(item.title);
        })
      }
      return(
        <Container>
          <Header /> 
              <List
                  header="Applications"
                  dataSource={applications}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <List.Item>
                      <a></a>
                      <List.Item.Meta
                      title={item.title}
                      description={item.desc}
                      />
                    </List.Item>
                  )}
                  /> 
            <Footer />
          </Container>
        );
    }
  }
}