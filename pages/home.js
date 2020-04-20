import React from 'react';
import Footer from '../components/layout/user/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/user/Header';
import HomeBody from '../components/layout/user/HomeBody';
import {connect} from 'react-redux';
import {auth} from '../services/firebase';


class Home extends React.Component{
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
    
    return this.state.loading ? (
            <div>
                Loading...
            </div>
    ) : (
      <Container>
        <Header />
        <HomeBody />
        <Footer />
      </Container>
      );
    }
}
  

  const mapStateToProps = state => ({
    email: state.emailReducer,
    photourl: state.photourlReducer,
    uid: state.uidReducer,
    username: state.usernameReducer
  })
  export default connect(mapStateToProps)(Home);