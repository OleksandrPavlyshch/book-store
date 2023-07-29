import React, { useContext } from 'react';
import { BookProvider } from '../context/context';
import BookList from '@/components/BookList';
import Header from '@/components/Header';
import CreateUpdateBookModal from '@/components/CreateUpdateBookModal';
import { Container } from '@mui/material';
import { BookContext } from '@/context/context';

const Home: React.FC = () => {
  return (
    <BookProvider>
      <Container maxWidth="lg">
        <Header/>
        <CreateUpdateBookModal />
        <BookList />
      </Container>
    </BookProvider>
  );
};

export default Home;
