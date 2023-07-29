import React, { useContext } from 'react';
import { BookContext } from '@/context/context';
import { Add } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';

const Header: React.FC = () => {
  const { dispatch } = useContext(BookContext);

  const handleBookAddClick = () => {
    dispatch({ type: 'CREATE_MODAL' });
  };

  return (
    <>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Book store
        </Typography>
      </Box>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          onClick={() => handleBookAddClick()}
          variant="contained"
          endIcon={<Add />}
        >
          Add Book
        </Button>
      </Box>
    </>
  );
};

export default Header;
