import React, {Component} from 'react';
import { db } from '../../../../services/firebase';
import { Form, Input, Button, Checkbox, notification } from 'antd';
const openNotification = (error) => {
    notification.open({
      message: 'Error:',
      description: error,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

const onFinish = (values) => {
    console.log('Finish:', values);
    db.ref("/Associations/Companies/Employees").once('value', snapshot =>{
        var error = "Employee not found.";
        snapshot.forEach(employee => {
            if(employee.val().Name==values.name){
                // get the key and data from the snapshot
                childKey = employee.key;
                childData = employee.val();
                db.ref("/Admins/").child(childKey)
                .once('value').then((function(snapshot){
                    if(snapshot.exists()){
                        openNotification("User is already an admin!");
                    }
                    else{
                        db.ref("/Admins").child(this.childKey).set({
                            uid: this.childKey,
                            Name: this.childData.Name,
                            SearchCommittee_ID_FK: values.SearchCommittee_ID_FK
                        })
                        openNotification("Admin added!");
                    }
                }).bind({childKey: childKey, childData: childData, error: error}))
                error=null;
            }
            var childKey= null;
            var childData=null;
        })
        if(error) openNotification(error);
    })

  }

class AdminAddAdminBody extends Component {
  render(){
    return (
        
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
            marginTop: '5%'
        }}
        >
        <Form.Item
            name="name"
            rules={[
            {
                required: true,
                message: 'Please input admin name! An admin must be an employee.',
            },
            ]}
        >
            <Input placeholder="Name Lastname" />
        </Form.Item>
        <Form.Item
            name="SearchCommittee_ID_FK"
            rules={[
            {
                required: true,
                message: 'Please input admin name! An admin must be an employee.',
            },
            ]}
        >
            <Input placeholder="SearchCommittee" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Add Admin
            </Button>
        </Form.Item>
        </Form>
        
    );
    };
}

export default AdminAddAdminBody;