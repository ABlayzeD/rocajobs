import React, {Component} from 'react';
import Footer from '../components/layout/user/Footer';
import Container from '../components/layout/Container';
import AdminHeader from '../components/layout/admin/AdminHeader';
import AdminJobListingsBody from '../components/layout/admin/AdminJobListingsBody';
import {auth, db} from '../services/firebase';

class AdminJobListings extends Component{
    constructor(props){
        super(props);
        this.state={
          loading: true
      }
    }
    async componentDidMount(){
      let adminauth=await this.checkAuth();
      this.setState({loading: adminauth});
      console.log(adminauth);
      return adminauth;
    }
    async checkAuth(){
      if(auth.currentUser!=null){
        return db.ref("/Admins/".concat(auth.currentUser.uid)).once("value").then((snapshot)=>{
          if(snapshot.val().uid!=null) return false;
          else return true;
            
        })
      }
      else{
        return true;
      }
        
    }
    render(){
        
        return this.state.loading ? (
                <div>
                    Loading...
                </div>
        ) : (
        <Container>
            <AdminHeader />
            <AdminJobListingsBody />
            <Footer />
        </Container>
    );
    }
}

export default AdminJobListings;