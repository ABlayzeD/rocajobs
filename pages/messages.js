import Link from 'next/link';
import React, { useContext } from 'react';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import Chat from '../components/Chat';



export default function Messages() {
    return (
      <Container>
        <Header />
          <Chat />
        <Footer />
      </Container>
    );
  }