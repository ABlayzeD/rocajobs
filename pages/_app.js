import React from 'react';
import App from 'next/app';
import {withRouter} from 'next/router';
import Login from './login';
import SignUp from './signup';
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import store from '../services/redux/store';
import { auth } from 'firebase';
import ReactDOM from 'react-dom';

class Rocajobs extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps: pageProps};
  }
  render() {
    const {Component, pageProps, store } = this.props;
    /**if(auth.currentUser===undefined && Component!==<SignUp/>){
      return(
        <Provider store={store}>
            <Login {...pageProps} />
        </Provider>
      );
    }
    **/
        return (
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>

        );


    }
}
const makeStore = () => store;

export default withRedux(makeStore)(Rocajobs);