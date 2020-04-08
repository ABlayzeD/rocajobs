import React from 'react';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import HomeBody from '../components/layout/HomeBody';
import {connect} from 'react-redux';
import { render } from 'react-dom';


class Home extends React.Component{
  static getInitialProps({store}){

  }

  constructor(props){
    super(props);
  }

  render(){
    return(
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