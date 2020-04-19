import React, {Component} from 'react';
import { db } from '../../../../services/firebase';
import { Form, Input, Button,  notification } from 'antd';
import adminSideJobReindexFirebaseToAlgolia from '../../../../scripts/adminscripts/indexingalgoliascripts/adminSideJobReindexFirebaseToAlgolia'
import clientSideJobReindexFirebaseToAlgolia from '../../../../scripts/adminscripts/indexingalgoliascripts/clientSideJobReindexFirebaseToAlgolia'


const openNotification = (error) => {
    notification.open({
      message: 'Alert:',
      description: error,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
async function addJobToDB(title, desc, loc, salary, leveleducation, date, searchcommittee, company){
    return db.ref("/Associations/Companies/JobOpenings/SearchCommittees/").child(searchcommittee)
    .once('value').then((function(snapshot) {
        if(!snapshot.exists()){
            openNotification("Unknown search committee.");
        }
        else{
            return db.ref("/Associations/Companies")
            .once('value').then((function(snapshot){
                var error=true;
                console.log(searchcommittee);
                var numberOfCompanies=snapshot.length;
                var itemsProcessed=0;
                snapshot.forEach((function(comp){
                    var error=true;
                    if(company==comp.val().Name){
                        db.ref("/Associations/Companies/JobOpenings").push().set({
                            Title: title,
                            Description: desc,
                            State: loc,
                            LevelEducation: leveleducation,
                            Salary: salary,
                            Date: date,
                            Company_ID_FK: comp.key,
                            SearchCommittee_ID_FK: searchcommittee
                        })
                        error=false;
                        openNotification("Job Added!");
                        return;
                    }
                }).bind({
                searchcommittee: searchcommittee}));
            }).bind({searchcommittee: searchcommittee}));
        }
    }).bind({searchcommittee: searchcommittee}));
}
async function onFinish(values) {
    console.log('Finish:', values);
    await addJobToDB(values.title, values.desc, values.state, values.salary,
        values.levelofeducation, values.date, values.searchcommittee, values.company)
        .then(function(){
            adminSideJobReindexFirebaseToAlgolia(values.searchcommittee);
            clientSideJobReindexFirebaseToAlgolia();
        });
}

class AdminAddJobBody extends Component {
  render(){
    const { TextArea } = Input;
    return (
        <Form
        initialValues={{
            salary: "$",
            remember: false,
        }}
        onFinish={onFinish}
        style={{
            width: '50%',
            marginLeft: '25%',
            marginTop: '5%'
        }}
        >
        <Form.Item
            name="title"
            rules={[
            {
                required: true,
                message: 'Please input the position title.',
            },
            ]}
        >
            <Input placeholder="Title of position" />
        </Form.Item>
        <Form.Item
            name="desc"
            rules={[
            {
                required: true,
                message: 'Please input a description.',
            },
            ]}
        >
            <TextArea
            placeholder="Description"
            rows={2}
            autoSize />
        </Form.Item>
        <Form.Item
            name="state"
            rules={[
            {
                required: true,
                message: 'Please input which state the position is in.',
            },
            ]}
        >
            <Input placeholder="Location (State) of position" />   
        </Form.Item>
        <Form.Item
            name="salary"
            rules={[
            {
                required: true,
                message: 'Please input an expected salary.',
            },
            ]}
        >
            <Input placeholder="Salary" />
        </Form.Item>
        <Form.Item
            name="levelofeducation"
            rules={[
            {
                required: true,
                message: 'Please input the desired level of education for this position.',
            },
            ]}
        >
            <Input placeholder="Level of Education" />
        </Form.Item>
        <Form.Item
            name="date"
            rules={[
            {
                required: true,
                message: "Please input today's date",
            },
            ]}
        >
            <Input placeholder="Today's date (##/##/####)" />
        </Form.Item>
        <Form.Item
            name="searchcommittee"
            rules={[
            {
                required: true,
                message: "Please input your search committee.",
            },
            ]}
        >
            <Input placeholder="SearchCommittee ID" />
        </Form.Item>
        <Form.Item
            name="company"
            rules={[
            {
                required: true,
                message: "Please input the hiring company's name",
            },
            ]}
        >
            <Input placeholder="Company name" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Add Job
            </Button>
        </Form.Item>
        </Form>
        
    );
    };
}

export default AdminAddJobBody;