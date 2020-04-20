import React from 'react';
import { db , auth} from '../services/firebase';
import store from '../services/redux/store';
import { Form, Input, Button, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import { signInEmail, signInPhotoUrl, signInUid, signInUsername } from '../services/redux/actions/authActions';
import Link from 'next/link';

function Login() {
  const router=useRouter();
  auth.onAuthStateChanged(function(user) {
    if (user!=undefined) {
      // User is signed in.
          store.dispatch(signInEmail(user.email));
          store.dispatch(signInPhotoUrl(user.photourl));
          store.dispatch(signInUid(user.uid));
          store.dispatch(signInUsername(user.displayName));
          db.ref('/Admins/'.concat(user.uid)).once("value", function(snapshot){
              if(snapshot.val()!==null){
                  router.push("/admin_console");
              }
              else
                router.push("/home");
            })
      
    }
  });
  const onFinish = (values) => {
    console.log('Finish:', values);
    auth.signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
    console.log(error.code);
    console.log(error.message);
    // ...
  });
  };

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
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="" style={{marginLeft: '40%'}}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link href="/signup">
          <a>register now!</a>
        </Link>
      </Form.Item>
    </Form>
  );
};


export default Login;