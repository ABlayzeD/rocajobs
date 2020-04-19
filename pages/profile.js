import React, {Component} from 'react';
import Footer from '../components/layout/user/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/user/Header';
import {auth, db} from '../services/firebase';
import UploadAvatar from '../components/UploadAvatar';
import { BlockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import UploadResume from '../components/UploadResume';
import UploadDocuments from '../components/UploadDocuments';

async function onFinish(values){
  if(values.displayname!=null){
    await auth.currentUser.updateProfile({
      displayName: values.displayname
    }).then(console.log("Display Name updated in Firebase auth."));
    var applicantRef=db.ref("Associations/Companies/JobOpenings/Applicants/"
    .concat(auth.currentUser.uid));
    applicantRef.update({
      Name: values.displayname
    }).then(console.log("Name as applicant successfully updated"));
    applicantRef.once("value").then((function(snapshot){
      if(snapshot.val().IsEmployee==true){
        db.ref("Associations/Companies/Employees/"
          .concat(auth.currentUser.uid)).update({
            Name: auth.currentUser.displayName
          });
          console.log("Name as employee successfully updated")
          console.log(snapshot.val().Name);
      }
    }));
    }
  if(values.areasofinterest!=null){
      db.ref("/Associations/Companies/JobOpenings/Applicants/"
      .concat(auth.currentUser.uid)).update({
        AreasOfInterest: values.areasofinterest
      });
    }
  }

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
  }
}
async componentDidMount(){
  let auth = await this.checkAuth();
  return auth;
}
async checkAuth(){
    if(auth.currentUser!=null) this.setState({loading: false})
}

render(){
    const {TextArea} = Input;
    return this.state.loading ? (
            <div>
                Loading...
            </div>
    ) : (
      <Container>
        <Header />
        <div style={{marginTop: '1%', textAlign: 'center'}}>
          <p>Logged in as: {auth.currentUser.email}</p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          style={{
            width: '50%',
            marginLeft: '25%',
            marginTop: '1%'
          }}
        >
          <label>Name:</label>
          <Form.Item
          name="displayname">
            <Input
              placeholder={auth.currentUser.displayName}
            />
          </Form.Item>
          <Form.Item
            name="areasofinterest">
            <TextArea
              placeholder="(Area of Interest), (Area of Interest), (Area of Interest),..."
              rows={2}
              autoSize />
          </Form.Item>
          <Form.Item>
            <Button  type="primary" htmlType="submit" className="login-form-button">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
        <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>
          <UploadAvatar />    
        </div>
        <div style={{marginTop: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'}}>
          <UploadResume />    
        </div>
        <div style={{marginTop: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'}}>
          <p>Warning: Can't delete secondary documents.</p>
          <UploadDocuments />    
        </div>
        <Footer />
      </Container>
    );
  }
}