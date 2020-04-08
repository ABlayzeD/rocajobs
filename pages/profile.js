import React from 'react';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import {auth} from '../services/firebase';
import avatarUpload from '../components/avatarUpload';
auth.currentUser.updateProfile({
  displayName: values.name
  })
export default function Profile() {
    return (
      <Container>
        <Header />
        <div>
        <p>Logged in as: {auth.currentUser.email}</p>
        </div>
        <avatarUpload />
        <div>
        <p>Name: {auth.currentUser.displayName}</p>
        </div>
        <Footer />
      </Container>
    );
  }
  